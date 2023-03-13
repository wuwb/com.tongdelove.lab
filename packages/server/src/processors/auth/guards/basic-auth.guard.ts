import { IS_PUBLIC_KEY } from "@/common/decorators/public.decorator";
import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { JwtAuthGuard } from "./jwt-auth.guard";

export class BasicAuthGuard extends JwtAuthGuard {
    constructor(
        readonly reflector: Reflector
    ) {
        super(reflector);
    }

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<any> {
        const isPublic = this.reflector.get<boolean>(
            IS_PUBLIC_KEY,
            context.getHandler()
        );

        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }
}
