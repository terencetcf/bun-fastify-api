import type { FastifyInstance } from 'fastify';
import * as controllers from '../controllers';
import {
  UserCreateRequestSchema,
  type UserCreateRequestDto,
  UserListQueryStringSchema,
  type UserListQueryStringDto,
} from '../schemas/User';

async function userRouter(fastify: FastifyInstance) {
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
    controllers.userList,
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
    controllers.userCreate,
  );
}

export default userRouter;
