
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const Token = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (!request.token) {
            throw new InternalServerErrorException('Token is missing (AuthGuard called?)');
        }
        return request.token;
    }
)