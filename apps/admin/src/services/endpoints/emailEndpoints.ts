import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { VerifyTokenInput } from '@rns/dtos';
import { BaseOutput } from '../../types/BaseOutput';

export const emailEndpoints = (builder: EndpointBuilder<ReturnType<any>, string, 'api'>) => ({
  verifyEmail: builder.mutation<BaseOutput<string>, VerifyTokenInput>({
    query: (body) => ({
      url: '/email/verify-token',
      method: 'POST',
      body,
    }),
  }),
  resendVerification: builder.mutation<BaseOutput<string>, null>({
    query: () => ({
      url: '/email/resend-verification',
      method: 'POST',
    }),
  }),
});
