import { BadRequestException, HttpStatus } from '@nestjs/common';

export const classValidatorException = (errors) => {
  const error = errors[0].constraints[Object.keys(errors[0].constraints)[0]];
  const result = {
    status: HttpStatus.BAD_REQUEST,
    message: error,
  };

  return new BadRequestException(result);
};
