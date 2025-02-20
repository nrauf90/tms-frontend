// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import permissions from 'src/store/apps/permissions'
import user from 'src/store/apps/user'
import languages from 'src/store/apps/languages'
import currency from 'src/store/apps/currency'
import payment from 'src/store/apps/payment'
import packages from 'src/store/apps/packages'
import companies from 'src/store/apps/companies'
import group from 'src/store/apps/group'
import companyUsers from 'src/store/apps/companyuser'

export const store = configureStore({
  reducer: {
    permissions,
    user,
    languages,
    currency,
    payment,
    packages,
    companies,
    group,
    companyUsers
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})