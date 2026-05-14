import type { FastifyInstance } from 'fastify';
import * as controllers from '../controllers';
import {
  UserCreateRequestSchema,
  type UserCreateRequestDto,
} from '../schemas/User';

async function userRouter(fastify: FastifyInstance) {
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
