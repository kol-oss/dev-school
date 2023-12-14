import { PrismaClient } from '@prisma/client';

class PrismaService extends PrismaClient {
    constructor() {
        super();
        this.$connect();
    }
    async disconnect() {
        await this.$disconnect();
    }
}

export default new PrismaService();