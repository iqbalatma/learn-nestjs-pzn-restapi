import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { ZodError } from "zod";

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const response = host.switchToHttp().getResponse();
    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        errors: exception.getResponse()
      });
    } else if (exception instanceof ZodError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        errors: "Validation error"
      });
    }else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errors: exception.message
      });
    }
  }
}