import type { FastifyInstance } from 'fastify';
import * as controllers from './users.controller';
import {
  UserCreateRequestSchema,
  type UserCreateRequestDto,
  UserListQueryStringSchema,
  type UserListQueryStringDto,
} from './users.schema';

async function usersRoutes(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: UserListQueryStringDto;
  }>(
    '/',
    {
      schema: {
        querystring: UserListQueryStringSchema,
      },
      config: {
        description: 'Get list of users endpoint',
      },
    },
    controllers.listUsers,
  );

  fastify.post<{
    Body: UserCreateRequestDto;
  }>(
    '/new',
    {
      schema: {
        body: UserCreateRequestSchema,
      },
      config: {
        description: 'Create a new user endpoint',
      },
    },
    controllers.createUser,
  );
}

export default usersRoutes;
