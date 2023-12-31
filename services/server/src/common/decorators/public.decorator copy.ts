import { applyDecorators, SetMetadata } from "@nestjs/common";
import { PUBLIC_KEY_METADATA } from "../constants/decorator.constant";

const PublicAuthMiddleware = SetMetadata(PUBLIC_KEY_METADATA, true);
const PublicAuthSwagger = SetMetadata("swagger/apiSecurity", ["isPublic"]);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Public = () =>
    applyDecorators(PublicAuthMiddleware, PublicAuthSwagger);
