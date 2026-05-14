import type { FastifyInstance } from 'fastify';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { buildApp } from '../../../src/app.ts';
import type { UserCreateResponseDto } from '../../../src/features/users/users.schema.ts';

let server: FastifyInstance;

beforeAll(async () => {
  server = buildApp();
  await server.ready();
});

afterAll(async () => {
  await server.close();
});

describe('create new user', () => {
  it('should should create a new user', async () => {
    // Arrange
    const payload = {
      email: `test${new Date().getTime()}@example.com`,
      first_name: 'John',
      last_name: 'Doe',
    };

    // Act
    const res = await server.inject({
      method: 'POST',
      url: '/api/user/new',
      payload: payload,
    });

    // Assert
    expect(res.statusCode).toBe(201);
    const data = res.json();
    expect(data).toStrictEqual({
      user: {
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
      },
    });
  });

  it.each([
    {
      title: 'invalid email format',
      email: 'invalid-email',
      first_name: 'John',
      last_name: 'Doe',
      error: 'body/email must match format "email"',
    },
    {
      title: 'missing email field',
      email: undefined,
      first_name: 'John',
      last_name: 'Doe',
      error: "body must have required property 'email'",
    },
    {
      title: 'missing first_name field',
      email: 'valid@example.com',
      first_name: undefined,
      last_name: 'Doe',
      error: "body must have required property 'first_name'",
    },
  ])(
    'should returns 400 if $title',
    async ({ email, first_name, last_name, error }) => {
      // Arrange
      const payload = {
        email,
        first_name,
        last_name,
      };

      // Act
      const res = await server.inject({
        method: 'POST',
        url: '/api/user/new',
        payload,
      });

      // Assert
      expect(res.statusCode).toBe(400);
      const data = res.json();
      expect(data).toMatchObject({
        error,
      });
    },
  );
});

describe('get users', () => {
  it('should return a list of users', async () => {
    // Arrange
    const timestamp = new Date().getTime();
    const users = [
      {
        email: `list-user-1-${timestamp}@example.com`,
        first_name: 'Ada',
        last_name: 'Lovelace',
      },
      {
        email: `list-user-2-${timestamp}@example.com`,
        first_name: 'Grace',
        last_name: 'Hopper',
      },
    ];

    for (const user of users) {
      await server.inject({
        method: 'POST',
        url: '/api/user/new',
        payload: user,
      });
    }

    // Act
    const res = await server.inject({
      method: 'GET',
      url: '/api/user',
    });

    // Assert
    expect(res.statusCode).toBe(200);
    const data = res.json();
    expect(data.users).toEqual(expect.any(Array));
    expect(data.pagination).toMatchObject({
      page: 1,
      limit: 10,
    });
  });

  it('should paginate the list of users', async () => {
    // Arrange
    const timestamp = new Date().getTime();
    const users = [
      {
        email: `paged-user-1-${timestamp}@example.com`,
        first_name: 'Katherine',
        last_name: 'Johnson',
      },
      {
        email: `paged-user-2-${timestamp}@example.com`,
        first_name: 'Mary',
        last_name: 'Jackson',
      },
      {
        email: `paged-user-3-${timestamp}@example.com`,
        first_name: 'Dorothy',
        last_name: 'Vaughan',
      },
    ];

    for (const user of users) {
      await server.inject({
        method: 'POST',
        url: '/api/user/new',
        payload: user,
      });
    }

    // Act
    const res = await server.inject({
      method: 'GET',
      url: '/api/user?page=1&limit=3',
    });

    // Assert
    expect(res.statusCode).toBe(200);
    const data = res.json();
    expect(data.users).toHaveLength(3);
    expect(data.users).toSatisfy((dataUsers: UserCreateResponseDto[]) =>
      dataUsers.every((dataUser) =>
        users.some((user) => user.email === dataUser.email),
      ),
    );
    expect(data.pagination).toMatchObject({
      page: 1,
      limit: 3,
    });
    expect(data.pagination.total).toBeGreaterThanOrEqual(users.length);
    expect(data.pagination.total_pages).toBe(
      Math.ceil(data.pagination.total / 3),
    );
  });
});
