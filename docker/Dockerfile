ARG NODE_VERSION=18.17.1
ARG ALPINE_VERSION=3.18

#############################################################
# Stage 1 - App extraction / pruning                        #
#############################################################

FROM node:${NODE_VERSION}-alpine AS app-builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat git jq && corepack enable

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY --link package.json turbo.json pnpm-locl.yaml* package-lock.json* pnpm-lock.yaml* ./

# We can't run turbo without yarn install first, let's install locally and make sure
# both local and docker are aligned on the package.json version.
RUN TURBO_VERSION=$(cat package.json | jq '.devDependencies["turbo"]' -r) npm i -g turbo@${TURBO_VERSION}

COPY --link . .

# https://turbo.build/repo/docs/handbook/deploying-with-docker
RUN turbo prune --scope=lab --docker --out-dir=./out/lab/

# RUN \
#   if [ -f pnpm-locl.yaml ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
#   else echo "Lockfile not found." && exit 1; \
#   fi

#############################################################
# Stage 2 - App installation                                #
#############################################################

FROM app-builder as app-installer


# This will disable runtime env validation
# see ./src/config/server-runtime-env.config.mjs
ENV NEXTJS_PRODUCTION_PHASE=build

ENV NEXT_BUILD_ENV_TYPECHECK=false
ENV NEXT_BUILD_ENV_LINT=false
ENV NEXT_BUILD_ENV_OUTPUT=standalone
# ENV NEXT_BUILD_ENV_SENTRY_ENABLED=false
# ENV NEXT_BUILD_ENV_SENTRY_TRACING=false

ENV TZ=Europe/Brussels

# Optimize for YARN installation speed
ENV YARN_ENABLE_GLOBAL_CACHE=false
ENV YARN_ENABLE_MIRROR=false
ENV YARN_NODE_LINKER=node-modules
ENV YARN_NM_MODE=hardlinks-local
# If using different compression level than in local (recommended: prefer to not do this)
#ENV YARN_COMPRESSION_LEVEL 0
#ENV YARN_CHECKSUM_BEHAVIOR ignore

# Disabling some well-known postinstall scripts
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true
ENV HUSKY=0

WORKDIR /app

# First install the dependencies (as they change less often)
COPY --link .gitignore ./
COPY --from=app-builder --link /app/out/lab/json/ .
COPY --from=app-builder --link /app/out/lab/pnpm-locl.yaml ./pnpm-locl.yaml

RUN yarn install --inline-builds

# Alternatively we can use a build cache (buildx)
#RUN --mount=type=cache,target=/root/.yarn3-cache,id=yarn3-cache \
#    YARN_CACHE_FOLDER=/root/.yarn3-cache \
#    yarn install --inline-builds

# Build the project
COPY --from=app-builder /app/out/lab/full/ .
COPY --link .gitignore turbo.json tsconfig.base.json ./

RUN yarn workspace @tongdelove/prisma prisma-generate
RUN yarn turbo run build --filter=lab...

#############################################################
# Stage 3 - App runner                                      #
#############################################################

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as app-runner

# Bort PORT / HOSTNAME envs are respected by nextjs start/dev.
ENV HOSTNAME=0.0.0.0
ENV PORT=${NEXTJS_APP_PORT:-3000}
ENV TZ=Europe/Brussels
ENV NODE_ENV production

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN apk add --no-cache tzdata bash && corepack enable

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

USER nextjs

COPY --from=app-installer --chown=nextjs:nodejs /app/apps/lab/next.config.mjs \
    /app/apps/lab/next-i18next.config.mjs \
    /app/apps/lab/package.json \
    ./

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=app-installer --chown=nextjs:nodejs /app/apps/lab/.next/standalone ./
COPY --from=app-installer --chown=nextjs:nodejs /app/apps/lab/.next/static ./apps/lab/.next/static
COPY --from=app-installer --chown=nextjs:nodejs /app/apps/lab/public ./apps/lab/public

EXPOSE ${PORT}

CMD ["node", "apps/lab/server.js"]
