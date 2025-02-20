// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const UserViewSecurity = () => {
  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='user-view-security-current-password'>Current Password</InputLabel>
                    <TextField
                      value={values.currentPassword}
                      label='Current Password'
                      id='user-view-security-current-password'
                      type={values.showCurrentPassword ? 'text' : 'password'}
                      onChange={handleCurrentPasswordChange('currentPassword')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowCurrentPassword}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <Icon icon={values.showCurrentPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={6} sx={{ mt: 0 }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='user-view-security-new-password'>New Password</InputLabel>
                    <TextField
                      value={values.newPassword}
                      label='New Password'
                      id='user-view-security-new-password'
                      type={values.showNewPassword ? 'text' : 'password'}
                      onChange={handleNewPasswordChange('newPassword')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowNewPassword}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <Icon icon={values.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Confirm New Password</InputLabel>
                    <TextField
                      value={values.confirmNewPassword}
                      label='Confirm New Password'
                      id='user-view-security-confirm-new-password'
                      type={values.showConfirmNewPassword ? 'text' : 'password'}
                      onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowConfirmNewPassword}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <Icon icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ mb: 2, color: 'text.secondary' }}>Password Requirements:</Typography>
                  <Box
                    component='ul'
                    sx={{
                      pl: 6,
                      mb: 0,
                      '& li': { mb: 1, color: 'text.secondary' }
                    }}
                  >
                    <li>Minimum 8 characters long - the more, the better</li>
                    <li>At least one lowercase & one uppercase character</li>
                    <li>At least one number, symbol, or whitespace character</li>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' sx={{ mr: 3 }}>
                    Save Changes
                  </Button>
                  <Button
                    type='reset'
                    variant='outlined'
                    color='secondary'
                    onClick={() =>
                      setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })
                    }
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant='h5'>Two-factor authentication</Typography>
                  <Typography variant='body2'>Keep your account secure with authentication step.</Typography>
                </Box>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Two factor authentication is not enabled yet.
                  </Typography>
                  <Button variant='contained'>Enable</Button>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Typography variant='h5' sx={{ mb: 3 }}>
                  Recent devices
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  We keep track of your login sessions to ensure the security of your account. If you see any suspicious
                  activity, please contact our support team immediately.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserViewSecurity
