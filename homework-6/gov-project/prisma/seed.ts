import { PrismaClient } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();

async function main () {
    console.log('Start seeding');

    await prisma.user.createMany({
        data: [
            { firstName: 'Mykola', lastName: 'Khozhainov', email: 'kolyakhozhajinov@gmail.com' },
            { firstName: 'Gena', lastName: 'Zidrusni', email: 'genadiy_zidrysni1967@i.ua' }
        ],
    });

    console.log('Finished seeding');
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);

        await prisma.$disconnect();
        process.exit(1);
    });