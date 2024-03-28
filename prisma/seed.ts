import { PrismaClient, Task, TaskTiming, TaskType } from '@prisma/client';

const prisma = new PrismaClient();

const defaultTasks: Array<Task> = [
  {
    id: '1',
    title: 'Achieving Financial Goals Monthly',
    description: 'Task 1 description',
    points: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: TaskType.ACHIEVING_FINANCIAL_GOALS,
    timing: TaskTiming.MONTHLY,
  },
  {
    id: '2',
    title: 'Reading Articles Weekly',
    description: 'Task 2 description',
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
    points: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: TaskType.SAVING_MONEY,
    timing: TaskTiming.DAILY,
  },
];

const initTasks = async () => {
  await prisma.task.deleteMany({});
  await prisma.task.createMany({
    data: defaultTasks,
  });
};

const main = async () => {
  await initTasks();
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
