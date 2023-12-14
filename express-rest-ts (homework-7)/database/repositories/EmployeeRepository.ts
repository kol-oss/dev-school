import PrismaService from '../PrismaService';
import { Prisma } from "@prisma/client";

class EmployeeRepository {
    readonly prisma: typeof PrismaService;

    constructor() {
        this.prisma = PrismaService;
    }

    private include = {};

    async create(data: Prisma.EmployeeCreateInput) {
        return this.prisma.employee.create({
            data,
            include: this.include
        });
    }

    async findById(id: string) {
        return this.prisma.employee.findUnique({
            where: {
                id: id,
            },
            include: this.include
        });
    }

    async updateById(where: Prisma.EmployeeWhereUniqueInput, data: Prisma.EmployeeUncheckedUpdateInput) {
        return this.prisma.employee.update({
            where,
            data,
            include: this.include
        });
    }

    async findMany(data: Prisma.EmployeeFindManyArgs) {
        return this.prisma.employee.findMany({
            include: this.include,
            ...data,
        });
    }

    async count (data: Prisma.EmployeeCountArgs) {
        return this.prisma.employee.count(
            data,
        );
    }

    async deleteById (id: string) {
        return this.prisma.employee.delete({
            where: {
                id: id
            },
            include: this.include,
        });
    }
}

export default new EmployeeRepository();