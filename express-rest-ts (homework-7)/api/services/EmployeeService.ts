import PrismaService from "../../database/PrismaService";
import { Prisma, Positions } from "@prisma/client";
import EmployeeRepository from "../../database/repositories/EmployeeRepository";

class EmployeeService {
    private employeeRepository: typeof EmployeeRepository;

    constructor() {
        this.employeeRepository = EmployeeRepository;
    }

    async create(firstName: string, lastName: string, middleName: string, position: Positions = Positions.worker) {
        const data: Prisma.EmployeeCreateInput = {
            firstName,
            lastName,
            middleName,
            position
        };

        return this.employeeRepository.create(data);
    }
    async get(id: string) {
        return this.employeeRepository.findById(id);
    }
    async getAll() {
        const data: Prisma.EmployeeFindManyArgs = {};

        return this.employeeRepository.findMany(data);
    }
    async update(id: string, body: Prisma.EmployeeUncheckedUpdateInput) {
        const where: Prisma.EmployeeWhereUniqueInput = {
            id
        };

        return this.employeeRepository.updateById(where, body);
    }

    async delete(id: string) {
        return this.employeeRepository.deleteById(id);
    }
}

export default new EmployeeService();