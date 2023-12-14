import { Prisma, Category } from "@prisma/client";
import CustomerRepository from "../../database/repositories/CustomerRepository";

class CustomerService {
    private customerRepository: typeof CustomerRepository;

    constructor() {
        this.customerRepository = CustomerRepository;
    }

    async create(firstName: string, lastName: string, middleName: string, email: string, birthDate: Date) {
        const data: Prisma.CustomerCreateInput = {
            firstName,
            lastName,
            middleName,
            email,
            birthDate
        };

        return this.customerRepository.create(data);
    }
    async get(id: string) {
        return this.customerRepository.findById(id);
    }
    async getAll() {
        const data: Prisma.CustomerFindManyArgs = {};

        return this.customerRepository.findMany(data);
    }
    async update(id: string, body: Prisma.CustomerUncheckedUpdateInput) {
        const where: Prisma.CustomerWhereUniqueInput = {
            id
        };

        return this.customerRepository.updateById(where, body);
    }

    async delete(id: string) {
        return this.customerRepository.deleteById(id);
    }
}

export default new CustomerService();