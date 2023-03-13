import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
    createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
        return {
            autoSchemaFile: 'schema.gql',
            buildSchemaOptions: {},
            // typePaths: ['./**/*.graphql'],
            // installSubscriptionHandlers: true,
            // context: ({ req }) => ({ req }),
            // debug: true,
            // playground: true,

            // typePaths: ['./src/**/*.graphql'],
            // path: '/',
            // resolverValidationOptions: {
            //   requireResolversForResolveType: false,
            // },
            // definitions: {
            //   path: join(process.cwd(), 'src/graphql.schema.d.ts'),
            //   outputAs: 'class',
            // },
        };
    }
}
