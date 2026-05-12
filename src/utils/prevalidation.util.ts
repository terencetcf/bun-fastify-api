import type { FastifyRequest, FastifyReply } from 'fastify';
import type Joi from 'joi';

export const preValidation = (schema: Joi.ObjectSchema) => {
  return (
    request: FastifyRequest,
    reply: FastifyReply,
    done: (err?: Error) => void,
  ) => {
    const { error } = schema.validate(request.body);
    if (error) {
      return done(error);
    }
    done();
  };
};
