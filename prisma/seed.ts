import { PrismaClient, Task, TaskTiming, TaskType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const defaultTasks: Array<Task> = [
  {
    id: '1',
    title: 'Achieving Financial Goals Monthly',
    description: 'Task 1 description',
    points: 10,
    requiredAmount: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: TaskType.ACHIEVING_FINANCIAL_GOALS,
    timing: TaskTiming.MONTHLY,
  },
  {
    id: '2',
    title: 'Reading Articles Weekly',
    description: 'Task 2 description',
    requiredAmount: 3,
    points: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: TaskType.READING_ARTICLES,
    timing: TaskTiming.WEEKLY,
  },
  {
    id: '3',
    title: 'Saving Money Daily',
    description: 'Task 3 description',
    requiredAmount: 5,
    points: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: TaskType.SAVING_MONEY,
    timing: TaskTiming.DAILY,
  },
];

const clearCompletedTasks = async () => {
  await prisma.userCompletedTask.deleteMany({});
};

const seedTasks = async () => {
  await prisma.task.deleteMany({});
  await prisma.task.createMany({
    data: defaultTasks,
  });
};

const seedVouchers = async () => {
  await prisma.voucher.deleteMany({});
  await prisma.voucher.createMany({
    data: [
      {
        id: '1',
        name: 'Voucher 1',
        terms: 'Voucher 1 description',
        levelRequired: 1,
        code: 'VOUCHER1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Voucher 2',
        terms: 'Voucher 2 description',
        levelRequired: 2,
        code: 'VOUCHER2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        name: 'Voucher 3',
        terms: 'Voucher 3 description',
        levelRequired: 3,
        code: 'VOUCHER3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });
};

const deleteAdminAccounts = async () => {
  await prisma.user.deleteMany({
    where: {
      account_type: 'ADMIN',
    },
  });
};

const seedAdminAccount = async () => {
  await prisma.user.create({
    data: {
      id: 'admin',
      email: 'test@admin.com',
      username: 'admin',
      phone: '1234567890',
      birth_year: 1990,
      password_hash: await bcrypt.hash('admin123', 10),
      level: 1,
      experience: 0,
      account_type: 'ADMIN',
      wallet: {
        create: {},
      },
    },
  });
};

const main = async () => {
  await clearCompletedTasks();
  await seedTasks();
  await seedVouchers();
  await deleteAdminAccounts();
  await seedAdminAccount();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
