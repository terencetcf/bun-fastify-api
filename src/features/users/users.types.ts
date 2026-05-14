import type { UserCreateResponseDto } from './users.schema';

export type UserListResult = {
  users: UserCreateResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
};
