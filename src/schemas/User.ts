import Joi from 'joi';

export type UserCreateRequestDto = {
  email: string;
  first_name?: string;
  last_name?: string;
};

export type UserCreateResponseDto = UserCreateRequestDto;

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
});
