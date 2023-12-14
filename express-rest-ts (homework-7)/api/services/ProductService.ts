import { Prisma, Category } from "@prisma/client";
import ProductRepository from "../../database/repositories/ProductRepository";

class ProductService {
    private productRepository: typeof ProductRepository;

    constructor() {
        this.productRepository = ProductRepository;
    }

    async create(name: string, category: Category, price: number) {
        const data: Prisma.ProductCreateInput = {
            name,
            category,
            price
        };

        return this.productRepository.create(data);
    }
    async get(id: string) {
        return this.productRepository.findById(id);
    }
    async getAll() {
        const data: Prisma.ProductFindManyArgs = {};

        return this.productRepository.findMany(data);
    }

    async getOrders(id: string) {
        const product = await this.productRepository.findById(id);
        if (!product) return;

        console.log(product);
        return product.orders;
    }
    async update(id: string, body: Prisma.ProductUncheckedUpdateInput) {
        const where: Prisma.ProductWhereUniqueInput = {
            id
        };

        return this.productRepository.updateById(where, body);
    }

    async delete(id: string) {
        return this.productRepository.deleteById(id);
    }
}

export default new ProductService();