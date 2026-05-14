import { toUserResponseDto } from './users.mapper';
import * as usersRepository from './users.repository';
import type {
  UserCreateRequestDto,
  UserListQueryStringDto,
} from './users.schema';
import type { UserListResult } from './users.types';
import { userErrors } from './users.errors';

export const createUserService = async (data: UserCreateRequestDto) => {
  const existingUser = await usersRepository.findUserByEmail(data.email);
  if (existingUser) {
    throw userErrors.userExists;
  }

  const createdUser = await usersRepository.createUser(data);

  return toUserResponseDto(createdUser);
};

export const listUsersService = async (
  query: UserListQueryStringDto,
): Promise<UserListResult> => {
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 10);
  const skip = (page - 1) * limit;

  const total = await usersRepository.countUsers();
  const users = await usersRepository.findUsers({ skip, limit });

  return {
    users: users.map(toUserResponseDto),
    pagination: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
    },
  };
};
