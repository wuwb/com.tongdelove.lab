import { registerAs } from '@nestjs/config';

export interface GraphqlConfig {
  autoSchemaFile: string;
  sortSchema: boolean;
  installSubscriptionHandlers: boolean;
  debug: boolean;
  playground: boolean;
}

export default registerAs('graphql', (): GraphqlConfig => {
  return {
    autoSchemaFile: './src/schema.gql',
    sortSchema: true,
    installSubscriptionHandlers: true,
    debug: true,
    playground: true,
  };
});
