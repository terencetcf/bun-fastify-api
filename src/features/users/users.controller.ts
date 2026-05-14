import type { FastifyReply, FastifyRequest } from 'fastify';
import type {
  UserCreateRequestDto,
  UserListQueryStringDto,
} from './users.schema';
import { createUserService, listUsersService } from './users.service';

export const createUser = async (
  request: FastifyRequest<{
    Body: UserCreateRequestDto;
  }>,
  reply: FastifyReply,
) => {
  const responseDto = await createUserService(request.body);

  return reply.code(201).send({
    user: responseDto,
  });
};

export const listUsers = async (
  request: FastifyRequest<{
    Querystring: UserListQueryStringDto;
  }>,
  reply: FastifyReply,
) => {
  const result = await listUsersService(request.query);

  return reply.code(200).send({
    users: result.users,
    pagination: result.pagination,
  });
};
