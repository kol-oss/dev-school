import { Request, Response } from 'express';
import { Prisma } from "@prisma/client";

import { generateError } from "../utils";

import OrderService from '../services/OrderService';

class OrderController {
    async create(req: Request, res: Response) {
        try {
            const { employeeId, customerId, orderAddress, deliveryCost, orderDate } = req.body;

            const newOrder = await OrderService.create(
                employeeId,
                customerId,
                orderAddress,
                Number(deliveryCost),
                new Date(orderDate)
            );

            if (!newOrder) {
                return generateError(
                    res,
                    403,
                    new Error("Order not created")
                );
            }

            res
                .status(201)
                .json(newOrder);
        } catch (error) {
            generateError(res, 500, error);
        }
    }
    async get(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const order = await OrderService.get(id);

            if (!order) {
                return generateError(
                    res,
                    404,
                    new Error("Order not found")
                );
            }

            return res
                .status(200)
                .json(order);
        } catch (error) {
            generateError(res, 500, error);
        }
    }
    async getAll(req: Request, res: Response) {
        try {
            const orders = await OrderService.getAll();
            res
                .status(200)
                .json(orders);
        } catch (error) {
            generateError(res, 500, error);
        }
    }
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                orderAddress: reqOrderAddress,
                deliveryCost: reqDeliveryCost,
                orderDate: reqOrderDate,
            } = req.body;

            const order = await OrderService.get(id);
            if (!order) {
                return generateError(
                    res,
                    404,
                    new Error("Order not found")
                );
            }

            const data: Prisma.OrderUncheckedUpdateInput = {
                orderAddress: reqOrderAddress ? reqOrderAddress : order!.orderAddress,
                deliveryCost: reqDeliveryCost ? reqDeliveryCost : order!.deliveryCost,
                orderDate: reqOrderDate ? reqOrderDate : order!.orderDate,
            }

            const updatedOrder = await OrderService.update(
                id,
                data
            );

            res
                .status(200)
                .json(updatedOrder);
        } catch (error) {
            generateError(res, 500, error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const order = await OrderService.get(id);
            if (!order) {
                return generateError(
                    res,
                    404,
                    new Error("Order not found")
                );
            }

            await OrderService.delete(id);

            res
                .status(200)
                .json(order)

        } catch (error) {
            generateError(res, 500, error);
        }
    }
}

export default new OrderController();
