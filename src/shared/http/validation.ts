import type { FastifyRequest, FastifyReply } from 'fastify';

type RequestBodyValidator = {
  validate: (body: unknown) => {
    error?: Error;
  };
};

export const preValidation = (schema: RequestBodyValidator) => {
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
