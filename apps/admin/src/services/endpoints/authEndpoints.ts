import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { LoginInput, RegisterInput } from '@rns/dtos';
import { BaseOutput } from '../../types/BaseOutput';

export const authEndpoints = (builder: EndpointBuilder<ReturnType<any>, string, 'api'>) => ({
  login: builder.mutation<BaseOutput<string>, LoginInput>({
    query: (body) => ({
      url: '/auth/login',
      method: 'POST',
      body,
    }),
  }),
  register: builder.mutation<BaseOutput<string>, RegisterInput>({
    query: (body) => ({
      url: '/auth/register',
      method: 'POST',
      body,
    }),
  }),
});
