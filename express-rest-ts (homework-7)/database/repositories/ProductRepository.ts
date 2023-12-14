import PrismaService from '../PrismaService';
import { Prisma } from "@prisma/client";
import exp from "constants";

class ProductRepository {
    readonly prisma: typeof PrismaService;

    constructor() {
        this.prisma = PrismaService;
    }

    private include = {
        orders: true
    };

    async create(data: Prisma.ProductCreateInput) {
        return this.prisma.product.create({
            data,
            include: this.include
        });
    }

    async findById(id: string) {
        return this.prisma.product.findUnique({
            where: {
                id: id,
            },
            include: this.include
        });
    }

    async updateById(where: Prisma.ProductWhereUniqueInput, data: Prisma.ProductUncheckedUpdateInput) {
        return this.prisma.product.update({
            where,
            data,
            include: this.include
        });
    }

    async findMany(data: Prisma.ProductFindManyArgs) {
        return this.prisma.product.findMany({
            include: this.include,
            ...data,
        });
    }

    async count (data: Prisma.ProductCountArgs) {
        return this.prisma.product.count(
            data,
        );
    }

    async deleteById (id: string) {
        return this.prisma.product.delete({
            where: {
                id: id
            },
            include: this.include,
        });
    }
}

export default new ProductRepository();