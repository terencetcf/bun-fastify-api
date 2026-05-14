import { describe, it, expect } from 'vitest';
import { server } from '../../src/index.ts';

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
