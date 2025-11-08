import {
  BadRequestException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';

const extractErrorMessages = (errors: ValidationError[]): string[] => {
  const messages = [];

  errors.forEach((error) => {
    if (error.constraints) {
      messages.push(...Object.values(error.constraints));
    }
    if (error.children && error.children.length > 0) {
      messages.push(...extractErrorMessages(error.children));
    }
  });

  return messages;
};

export const classValidatorException = (errors: ValidationError[]) => {
  const errorMessages = extractErrorMessages(errors);
  const error = errorMessages[0];
  const result = {
    status: HttpStatus.BAD_REQUEST,
    message: error,
  };

  return new BadRequestException(result);
};
