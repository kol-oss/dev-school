import { Request, Response } from 'express';
import { Prisma } from "@prisma/client";

import { generateError } from "../utils";

import CustomerService from '../services/CustomerService';

class CustomerController {
    async create(req: Request, res: Response) {
        try {
            const { firstName, lastName, middleName, email, birthDate } = req.body;

            const newCustomer = await CustomerService.create(
                firstName,
                lastName,
                middleName,
                email,
                new Date(birthDate)
            );

            if (!newCustomer) {
                return generateError(
                    res,
                    403,
                    new Error("Customer not created")
                );
            }

            res
                .status(201)
                .json(newCustomer);
        } catch (error) {
            generateError(res, 500, error);
        }
    }
    async get(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const customer = await CustomerService.get(id);

            if (!customer) {
                return generateError(
                    res,
                    404,
                    new Error("Employee not found")
                );
            }

            return res
                .status(200)
                .json(customer);
        } catch (error) {
            generateError(res, 500, error);
        }
    }
    async getAll(req: Request, res: Response) {
        try {
            const customers = await CustomerService.getAll();
            res
                .status(200)
                .json(customers);
        } catch (error) {
            generateError(res, 500, error);
        }
    }
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                firstName: reqFirstName,
                lastName: reqLastName,
                middleName: reqMiddleName,
                email: reqEmail,
                birthDate: reqBirthDate
            } = req.body;

            const customer = await CustomerService.get(id);
            if (!customer) {
                return generateError(
                    res,
                    404,
                    new Error("Employee not found")
                );
            }

            const data: Prisma.CustomerUncheckedUpdateInput = {
                firstName: reqFirstName ? reqFirstName : customer!.firstName,
                lastName: reqLastName ? reqLastName : customer!.lastName,
                middleName: reqMiddleName ? reqMiddleName : customer!.middleName,
                email: reqEmail ? reqEmail : customer!.email,
                birthDate: reqBirthDate ? reqBirthDate : customer!.birthDate
            }

            const updatedCustomer = await CustomerService.update(
                id,
                data
            );

            res
                .status(200)
                .json(updatedCustomer);
        } catch (error) {
            generateError(res, 500, error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const customer = await CustomerService.get(id);
            if (!customer) {
                return generateError(
                    res,
                    404,
                    new Error("Customer not found")
                );
            }

            await CustomerService.delete(id);

            res
                .status(200)
                .json(customer)

        } catch (error) {
            generateError(res, 500, error);
        }
    }
}

export default new CustomerController();
