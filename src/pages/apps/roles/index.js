// ** MUI Imports
import Grid from '@mui/material/Grid'
import { lazy } from 'react'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

const RoleCards = lazy(() => import('src/views/apps/roles/RoleCards'));

const RolesComponent = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5' sx={{ mb: 6 }}>
            Roles List
          </Typography>
        }
      />
      <Grid item xs={12}>
        <RoleCards />
      </Grid>
    </Grid>
  )
}

RolesComponent.acl = {
  action: 'read',
  subject: 'role'
}

export default RolesComponent
