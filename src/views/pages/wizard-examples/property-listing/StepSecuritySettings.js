// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'



// ** Custom Components Imports
import { Typography } from '@mui/material'

const StepSecuritySettings = () => {
  // ** State

  return (
    <Grid container spacing={5}>
    <Grid item xs={12} md={4}>
        <Typography sx={{fontWeight: 'bold', mb: '3%'}}>App Update</Typography>
        <FormControlLabel control={<Switch defaultChecked color='success' />} label='' />
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography sx={{fontWeight: 'bold', mb: '3%'}}>Email Verification</Typography>
        <FormControlLabel control={<Switch defaultChecked color='success' />} label='' />
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography sx={{fontWeight: 'bold', mb: '3%'}}>App Debug</Typography>
        <FormControlLabel control={<Switch defaultChecked color='success' />} label='' />
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography sx={{fontWeight: 'bold', mb: '3%'}}>Enable Google Recaptcha</Typography>
        <FormControlLabel control={<Switch defaultChecked color='success' />} label='' />
      </Grid>
    </Grid>
  )
}

export default StepSecuritySettings
