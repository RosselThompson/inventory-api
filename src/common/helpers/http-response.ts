import { BadRequestException, HttpStatus } from '@nestjs/common';

export const httpBadRequest = (msg: string) =>
  new BadRequestException({
    status: HttpStatus.BAD_REQUEST,
    message: msg,
  });

export const httpOk = (msg: string) => ({
  status: HttpStatus.OK,
  message: msg,
});
