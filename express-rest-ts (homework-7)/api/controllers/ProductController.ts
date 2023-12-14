import { Request, Response } from 'express';
import { Prisma, Category } from "@prisma/client";

import { generateError } from "../utils";

import ProductService from '../services/ProductService';

class ProductController {
    async create(req: Request, res: Response) {
        try {
            const { name, category, price } = req.body;

            const newProduct = await ProductService.create(
                name,
                category,
                Number(price)
            );

            if (!newProduct) {
                return generateError(
                    res,
                    403,
                    new Error("Product not created")
                );
            }

            res
                .status(201)
                .json(newProduct);
        } catch (error) {
            generateError(res, 500, error);
        }
    }
    async get(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const product = await ProductService.get(id);

            if (!product) {
                return generateError(
                    res,
                    404,
                    new Error("Product not found")
                );
            }

            return res
                .status(200)
                .json(product);
        } catch (error) {
            generateError(res, 500, error);
        }
    }
    async getAll(req: Request, res: Response) {
        try {
            const users = await ProductService.getAll();
            res
                .status(200)
                .json(users);
        } catch (error) {
            generateError(res, 500, error);
        }
    }

    async getOrders(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const orders = await ProductService.getOrders(id);

            if (!orders) {
                return generateError(
                    res,
                    404,
                    new Error("Product not found")
                );
            }

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
            const { name: reqName, category: reqCategory, price: reqPrice } = req.body;

            const product = await ProductService.get(id);
            if (!product) {
                return generateError(
                    res,
                    404,
                    new Error("Product not found")
                );
            }

            const data: Prisma.ProductUncheckedUpdateInput = {
                name: reqName ? reqName : product!.name,
                category: reqCategory ? reqCategory : product!.category,
                price: reqPrice ? reqPrice : product!.price
            }

            const updatedProduct = await ProductService.update(
                id,
                data
            );

            res
                .status(200)
                .json(updatedProduct);
        } catch (error) {
            generateError(res, 500, error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const product = await ProductService.get(id);
            if (!product) {
                return generateError(
                    res,
                    404,
                    new Error("Product not found")
                );
            }

            await ProductService.delete(id);

            res
                .status(200)
                .json(product)

        } catch (error) {
            generateError(res, 500, error);
        }
    }
}

export default new ProductController();
