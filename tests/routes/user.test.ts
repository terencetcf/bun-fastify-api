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
});
