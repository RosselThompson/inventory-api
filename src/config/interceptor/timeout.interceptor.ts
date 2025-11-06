import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, timeout } from 'rxjs';

export class TimeOutInterceptor implements NestInterceptor {
  constructor(private limit: number) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(timeout(this.limit));
  }
}
