import type { FastifyInstance } from 'fastify';
import * as controllers from '../controllers';
import { signupSchema, type UserCreateRequestDto } from '../schemas/User';
import { preValidation } from '../utils/prevalidation.util';

async function userRouter(fastify: FastifyInstance) {
  fastify.post<{
    Body: UserCreateRequestDto;
  }>(
    '/signup',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email'],
          properties: {
            email: { type: 'string', format: 'email' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
          },
        },
      },
      config: {
        description: 'User signup endpoint',
      },
      preValidation: preValidation(signupSchema),
    },
    controllers.signUp,
  );
}

export default userRouter;
