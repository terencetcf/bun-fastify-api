import { AppError } from '../../shared/errors/app-error';

export const userErrors = {
  userExists: new AppError('User already exists', 409),
};
