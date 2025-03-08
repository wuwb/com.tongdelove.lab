import { createMigrate } from 'redux-persist'

import { RootState } from '.'

const migrateConfig = {
  '2': (state: RootState) => {
    return {
      ...state,
    }
  },
}

const migrate = createMigrate(migrateConfig as any)

export default migrate
