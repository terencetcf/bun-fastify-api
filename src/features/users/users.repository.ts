import { prisma } from '../../shared/db/prisma';
import type { UserCreateRequestDto } from './users.schema';

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = (data: UserCreateRequestDto) => {
  return prisma.user.create({
    data: {
      email: data.email,
      first_name: data.first_name?.trim(),
      last_name: data.last_name?.trim(),
    },
  });
};

export const countUsers = () => {
  return prisma.user.count();
};

export const findUsers = (pagination: { skip: number; limit: number }) => {
  return prisma.user.findMany({
    skip: pagination.skip,
    take: pagination.limit,
    orderBy: {
      id: 'desc',
    },
  });
};
