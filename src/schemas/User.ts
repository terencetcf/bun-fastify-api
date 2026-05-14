import Type from 'typebox';

export const UserCreateRequestSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  first_name: Type.String(),
  last_name: Type.Optional(Type.String()),
});

export type UserCreateRequestDto = Type.Static<typeof UserCreateRequestSchema>;

export type UserCreateResponseDto = UserCreateRequestDto;
