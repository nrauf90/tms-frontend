// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'

const UserViewNotification = () => {
  // ** States
  const [emailNotification, setEmailNotification] = useState({
    newLogin: true,
    itemShipped: true,
    passwordChange: true,
    specialOffers: false,
    newsletter: true
  })

  const [pushNotification, setPushNotification] = useState({
    newLogin: true,
    itemShipped: false,
    passwordChange: true,
    specialOffers: true,
    newsletter: false
  })

  const handleEmailChange = prop => event => {
    setEmailNotification({ ...emailNotification, [prop]: event.target.checked })
  }

  const handlePushChange = prop => event => {
    setPushNotification({ ...pushNotification, [prop]: event.target.checked })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h6' sx={{ mb: 4 }}>
                Email Notifications
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Choose what types of email notifications you'd like to receive
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <FormControlLabel
                control={<Switch checked={emailNotification.newLogin} onChange={handleEmailChange('newLogin')} />}
                label='New login to your account'
              />
              <FormControlLabel
                control={<Switch checked={emailNotification.itemShipped} onChange={handleEmailChange('itemShipped')} />}
                label='Account activity'
              />
              <FormControlLabel
                control={
                  <Switch checked={emailNotification.passwordChange} onChange={handleEmailChange('passwordChange')} />
                }
                label='Password changes'
              />
              <FormControlLabel
                control={
                  <Switch checked={emailNotification.specialOffers} onChange={handleEmailChange('specialOffers')} />
                }
                label='Special offers'
              />
              <FormControlLabel
                control={<Switch checked={emailNotification.newsletter} onChange={handleEmailChange('newsletter')} />}
                label='Newsletter'
              />
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant='h6' sx={{ mb: 4 }}>
                Push Notifications
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Choose what types of push notifications you'd like to receive
              </Typography>
            </Box>

            <Box>
              <FormControlLabel
                control={<Switch checked={pushNotification.newLogin} onChange={handlePushChange('newLogin')} />}
                label='New login to your account'
              />
              <FormControlLabel
                control={<Switch checked={pushNotification.itemShipped} onChange={handlePushChange('itemShipped')} />}
                label='Account activity'
              />
              <FormControlLabel
                control={
                  <Switch checked={pushNotification.passwordChange} onChange={handlePushChange('passwordChange')} />
                }
                label='Password changes'
              />
              <FormControlLabel
                control={
                  <Switch checked={pushNotification.specialOffers} onChange={handlePushChange('specialOffers')} />
                }
                label='Special offers'
              />
              <FormControlLabel
                control={<Switch checked={pushNotification.newsletter} onChange={handlePushChange('newsletter')} />}
                label='Newsletter'
              />
            </Box>

            <Box sx={{ mt: 6 }}>
              <Button variant='contained' sx={{ mr: 3 }}>
                Save Changes
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => {
                  setEmailNotification({
                    newLogin: true,
                    itemShipped: true,
                    passwordChange: true,
                    specialOffers: false,
                    newsletter: true
                  })
                  setPushNotification({
                    newLogin: true,
                    itemShipped: false,
                    passwordChange: true,
                    specialOffers: true,
                    newsletter: false
                  })
                }}
              >
                Reset
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserViewNotification
