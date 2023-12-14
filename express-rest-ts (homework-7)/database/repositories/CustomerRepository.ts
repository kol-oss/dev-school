import PrismaService from '../PrismaService';
import { Prisma } from "@prisma/client";

class CustomerRepository {
    readonly prisma: typeof PrismaService;

    constructor() {
        this.prisma = PrismaService;
    }

    private include = {
        orders: true,
    };

    async create(data: Prisma.CustomerCreateInput) {
        return this.prisma.customer.create({
            data,
            include: this.include
        });
    }

    async findById(id: string) {
        return this.prisma.customer.findUnique({
            where: {
                id: id,
            },
            include: this.include
        });
    }

    async updateById(where: Prisma.CustomerWhereUniqueInput, data: Prisma.CustomerUpdateInput) {
        return this.prisma.customer.update({
            where,
            data,
            include: this.include
        });
    }

    async findMany(data: Prisma.CustomerFindManyArgs) {
        return this.prisma.customer.findMany({
            include: this.include,
            ...data,
        });
    }

    async count (data: Prisma.CustomerCountArgs) {
        return this.prisma.customer.count(
            data,
        );
    }

    async deleteById (id: string) {
        return this.prisma.customer.delete({
            where: {
                id: id
            },
            include: this.include,
        });
    }
}

export default new CustomerRepository();