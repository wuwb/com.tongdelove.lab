import { getPrismaClientDbMain } from './prisma/prisma.config';
export const prismaDbMain = getPrismaClientDbMain();
export {
  corsAllowedOrigins,
  getCorsWhitelistOriginRegexp,
  corsDefaultOptions,
} from './cors.config';
