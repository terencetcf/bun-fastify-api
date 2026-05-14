import type { User } from '../../../generated/prisma/client';
import type { UserCreateResponseDto } from './users.schema';

export const toUserResponseDto = (createdUser: User): UserCreateResponseDto => {
  return {
    email: createdUser.email,
    first_name: createdUser.first_name ?? undefined,
    last_name: createdUser.last_name ?? undefined,
  };
};
