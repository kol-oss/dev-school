import PrismaService from '../PrismaService';
import { Prisma } from "@prisma/client";

export class OrderRepository {
    readonly prisma: typeof PrismaService;

    constructor() {
        this.prisma = PrismaService;
    }

    private include = {
        employee: true,
        customer: true
    };

    async create(data: Prisma.OrderCreateInput) {
        return this.prisma.order.create({
            data,
            include: this.include
        });
    }

    async findById(id: string) {
        return this.prisma.order.findUnique({
            where: {
                id: id,
            },
            include: this.include
        });
    }

    async updateById(where: Prisma.OrderWhereUniqueInput, data: Prisma.OrderUpdateInput) {
        return this.prisma.order.update({
            where,
            data,
            include: this.include
        });
    }

    async findMany(data: Prisma.OrderFindManyArgs) {
        return this.prisma.order.findMany({
            include: this.include,
            ...data,
        });
    }

    async count (data: Prisma.OrderCountArgs) {
        return this.prisma.order.count(
            data,
        );
    }

    async deleteById (id: string) {
        return this.prisma.order.delete({
            where: {
                id: id
            },
            include: this.include,
        });
    }
}

export default new OrderRepository();