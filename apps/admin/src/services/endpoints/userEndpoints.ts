import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { User } from '@rns/prisma'
import { BaseOutput } from '../../types/BaseOutput'

export const userEndpoints = (
  builder: EndpointBuilder<ReturnType<any>, string, 'api'>,
) => ({
  getMe: builder.query<BaseOutput<User>, null>({
    query: () => ({
      url: '/user/me',
      method: 'GET',
    }),
  }),
})
