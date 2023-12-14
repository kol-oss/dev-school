import { Prisma, Category } from "@prisma/client";
import EmployeeRepository from "../../database/repositories/EmployeeRepository";
import CustomerRepository from "../../database/repositories/CustomerRepository";
import OrderRepository from "../../database/repositories/OrderRepository";

class OrderService {
    private orderRepository: typeof OrderRepository;
    private employeeRepository: typeof EmployeeRepository;
    private customerRepository: typeof CustomerRepository;

    constructor() {
        this.orderRepository = OrderRepository;
        this.employeeRepository = EmployeeRepository;
        this.customerRepository = CustomerRepository;
    }

    async create(employeeId: string, customerId: string, orderAddress: string, deliveryCost: number, orderDate: Date) {
        const data: Prisma.OrderCreateInput = {
            employee: {
                connect: {
                    id: employeeId
                }
            },
            customer: {
                connect: {
                    id: customerId
                }
            },
            orderAddress,
            deliveryCost,
            orderDate
        };

        return this.orderRepository.create(data);
    }
    async get(id: string) {
        return this.orderRepository.findById(id);
    }
    async getAll() {
        const data: Prisma.OrderFindManyArgs = {};

        return this.orderRepository.findMany(data);
    }
    async update(id: string, body: Prisma.OrderUncheckedUpdateInput) {
        const where: Prisma.OrderWhereUniqueInput = {
            id
        };

        return this.orderRepository.updateById(where, body);
    }

    async delete(id: string) {
        return this.orderRepository.deleteById(id);
    }
}

export default new OrderService();