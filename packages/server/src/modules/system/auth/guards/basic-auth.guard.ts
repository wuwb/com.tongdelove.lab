import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { PUBLIC_KEY_METADATA } from "@/common/constants/decorator.constant";

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
            PUBLIC_KEY_METADATA,
            context.getHandler()
        );

        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }
}
