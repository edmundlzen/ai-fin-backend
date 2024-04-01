import {
  $Enums,
  PrismaClient,
  Task,
  TaskTiming,
  TaskType,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import * as dayjs from 'dayjs';

function getRandomEnumValue<T>(anEnum: T): T[keyof T] {
  //save enums inside array
  const enumValues = Object.keys(anEnum as object) as Array<keyof T>;

  //Generate a random index (max is array length)
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  // get the random enum value

  const randomEnumKey = enumValues[randomIndex];
  return anEnum[randomEnumKey];
  // if you want to have the key than return randomEnumKey
}

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

const seedUsers = async () => {
  await prisma.user.deleteMany({});
  const fakeUserCount = 30;
  const fakeWalletIds = Array.from({ length: fakeUserCount }).map(() =>
    randomUUID(),
  );
  await prisma.wallet.createMany({
    data: fakeWalletIds.map((id) => ({
      id,
    })),
  });
  const passwordHash = await bcrypt.hash('password', 10);

  const fakeUserIds = Array.from({ length: fakeUserCount }).map(() =>
    randomUUID(),
  );
  await prisma.user.createMany({
    data: Array.from({ length: fakeUserCount }).map((_, i) => ({
      id: fakeUserIds[i],
      email: faker.internet.email(),
      password_hash: passwordHash,
      username: faker.internet.userName(),
      phone: faker.phone.number(),
      birth_year: 1990,
      wallet_id: fakeWalletIds[i],
    })),
  });

  await prisma.userInfo.createMany({
    data: fakeUserIds.map((id) => ({
      userId: id,
      annual_income: getRandomEnumValue($Enums.AnnualIncome),
      estimated_liabilities: getRandomEnumValue($Enums.EstimatedLiabilities),
      estimated_monthly_expenses: getRandomEnumValue(
        $Enums.EstimatedMonthlyExpenses,
      ),
      invested_before: Math.random() < 0.5,
      risk_tolerance: getRandomEnumValue($Enums.RiskTolerance),
      expected_annual_return: getRandomEnumValue($Enums.ExpectedAnnualReturn),
      investment_horizon: getRandomEnumValue($Enums.InvestmentHorizon),
    })),
  });

  const fakeFinancialGoalIds = Array.from({ length: fakeUserCount }).map(() =>
    randomUUID(),
  );

  await prisma.financialGoal.createMany({
    data: fakeUserIds.map((id, i) => ({
      id: fakeFinancialGoalIds[i],
      userId: id,
      emoji: 'curling-stone',
      name: faker.lorem.words(),
      amount: Math.min(1000, Math.floor(Math.random() * 10000)),
      months_to_reach_goal: Math.floor(Math.random() * 12),
    })),
  });

  //Generate fake activity data for last 12 months
  Array.from({ length: 12 }).forEach(async (_, i) => {
    const date = dayjs()
      .subtract(i - 1, 'month')
      .toDate();

    await prisma.transaction.createMany({
      data: fakeUserIds.map((id, i) => ({
        wallet_id: fakeWalletIds[i],
        amount: Math.random() * 1000,
        financial_goal_id: fakeFinancialGoalIds[i],
        createdAt: date,
        updatedAt: date,
      })),
    });

    await prisma.userActiveForMonth.createMany({
      data: fakeUserIds
        .map((id) => {
          if (Math.random() < 0.7) return null;
          return {
            userId: id,
            month: dayjs(date).get('month') + 1,
            year: dayjs(date).get('year'),
          };
        })
        .filter((x) => x) as {
        userId: string;
        month: number;
        year: number;
      }[],
    });
  });
};

const main = async () => {
  console.log('Seeding database...');
  console.log('Clearing completed tasks');
  await clearCompletedTasks();
  console.log('Cleared completed tasks');
  console.log('Seeding tasks');
  await seedTasks();
  console.log('Seeded tasks');
  console.log('Seeding vouchers');
  await seedVouchers();
  console.log('Seeded vouchers');
  console.log('Deleting admin accounts');
  await deleteAdminAccounts();
  console.log('Deleted admin accounts');
  console.log('Seeding admin account');
  await seedAdminAccount();
  console.log('Seeded admin account');
  console.log('Seeding users');
  await seedUsers();
  console.log('Seeded users');

  console.log('Seeding completed');
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
