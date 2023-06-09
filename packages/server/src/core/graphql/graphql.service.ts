import { GraphqlConfig } from '@/config/graphql.config';
import { ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { join } from 'path';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
    constructor(private configService: ConfigService) { }

    createGqlOptions(): ApolloDriverConfig {
        const graphqlConfig = this.configService.get('graphql');
        return {
            // include: [],
            installSubscriptionHandlers: graphqlConfig.installSubscriptionHandlers,
            debug: graphqlConfig.debug,
            playground: graphqlConfig.playground,

            driver: ApolloDriver,
            // autoSchemaFile: 'schema.gql',
            // schema options
            autoSchemaFile: join(process.cwd(), graphqlConfig.autoSchemaFile),
            sortSchema: graphqlConfig.sortSchema,
            buildSchemaOptions: {
                numberScalarMode: 'integer',
            },
            // subscription
            formatError: (error: GraphQLError) => {
                return {
                    message: error.message,
                    success: false,
                    status: error.extensions?.code,
                };
            },
            context: ({ req }) => ({ req }),
            typePaths: ['./**/*.graphql'],
        };
    }
}
