import type { FastifyReply, FastifyRequest } from 'fastify';
import { ERRORS } from '../helpers/errors.helper';
import type { UserCreateRequestDto } from '../schemas/User';
import { prisma } from '../lib/prisma';
import { toUserResponseDto } from '../mappers/user.mapper';

export const userCreate = async (
  request: FastifyRequest<{
    Body: UserCreateRequestDto;
  }>,
  reply: FastifyReply,
) => {
  const { email, first_name, last_name } = request.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    return reply.code(ERRORS.userExists.statusCode).send(ERRORS.userExists);
  }

  const createdUser = await prisma.user.create({
    data: {
      email,
      first_name: first_name?.trim(),
      last_name: last_name?.trim(),
    },
  });

  const responseDto = toUserResponseDto(createdUser);

  return reply.code(201).send({
    user: responseDto,
  });
};
