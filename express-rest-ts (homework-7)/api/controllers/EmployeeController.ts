import { Request, Response } from 'express';
import { Prisma } from "@prisma/client";

import { generateError } from "../utils";

import EmployeeService from '../services/EmployeeService';

class EmployeeController {
    async create(req: Request, res: Response) {
        try {
            const { firstName, lastName, middleName, position } = req.body;

            const newEmployee = await EmployeeService.create(
                firstName,
                lastName,
                middleName,
                position
            );

            if (!newEmployee) {
                return generateError(
                    res,
                    403,
                    new Error("Employee not created")
                );
            }

            res
                .status(201)
                .json(newEmployee);
        } catch (error) {
            generateError(res, 500, error);
        }
    }
    async get(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const employee = await EmployeeService.get(id);

            if (!employee) {
                return generateError(
                    res,
                    404,
                    new Error("Employee not found")
                );
            }

            return res
                .status(200)
                .json(employee);
        } catch (error) {
            generateError(res, 500, error);
        }
    }
    async getAll(req: Request, res: Response) {
        try {
            const employees = await EmployeeService.getAll();
            res
                .status(200)
                .json(employees);
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
                position: reqPosition
            } = req.body;

            const employee = await EmployeeService.get(id);
            if (!employee) {
                return generateError(
                    res,
                    404,
                    new Error("Employee not found")
                );
            }

            const data: Prisma.EmployeeUncheckedUpdateInput = {
                firstName: reqFirstName ? reqFirstName : employee!.firstName,
                lastName: reqLastName ? reqLastName : employee!.lastName,
                middleName: reqMiddleName ? reqMiddleName : employee!.middleName,
                position: reqPosition ? reqPosition : employee!.position
            }

            const updatedEmployee = await EmployeeService.update(
                id,
                data
            );

            res
                .status(200)
                .json(updatedEmployee);
        } catch (error) {
            generateError(res, 500, error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const employee = await EmployeeService.get(id);
            if (!employee) {
                return generateError(
                    res,
                    404,
                    new Error("Employee not found")
                );
            }

            await EmployeeService.delete(id);

            res
                .status(200)
                .json(employee)

        } catch (error) {
            generateError(res, 500, error);
        }
    }
}

export default new EmployeeController();
