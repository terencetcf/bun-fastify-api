import type { FastifyReply, FastifyRequest } from 'fastify';
import { ERRORS } from '../helpers/errors.helper';
import type {
  UserCreateRequestDto,
  UserListQueryStringDto,
} from '../schemas/User';
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

export const userList = async (
  request: FastifyRequest<{
    Querystring: UserListQueryStringDto;
  }>,
  reply: FastifyReply,
) => {
  const page = Number(request.query.page ?? 1);
  const limit = Number(request.query.limit ?? 10);
  const skip = (page - 1) * limit;

  const total = await prisma.user.count();
  const users = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: {
      id: 'desc',
    },
  });

  return reply.code(200).send({
    users: users.map(toUserResponseDto),
    pagination: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
    },
  });
};
