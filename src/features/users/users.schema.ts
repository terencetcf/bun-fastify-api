import Type from 'typebox';

export const UserCreateRequestSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  first_name: Type.String(),
  last_name: Type.Optional(Type.String()),
});

export const UserListQueryStringSchema = Type.Object({
  page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 10 })),
});

export type UserCreateRequestDto = Type.Static<typeof UserCreateRequestSchema>;

export type UserListQueryStringDto = Type.Static<
  typeof UserListQueryStringSchema
>;

export type UserCreateResponseDto = {
  email: string;
  first_name?: string;
  last_name?: string;
};
