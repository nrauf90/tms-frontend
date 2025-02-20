// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TableContainer from '@mui/material/TableContainer'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const connectedAccounts = [
  {
    checked: true,
    title: 'Google',
    logo: '/images/logos/google.png',
    subtitle: 'Calendar and Contacts'
  },
  {
    checked: false,
    title: 'Slack',
    logo: '/images/logos/slack.png',
    subtitle: 'Communications'
  },
  {
    checked: true,
    title: 'Github',
    logo: '/images/logos/github.png',
    subtitle: 'Project Management'
  },
  {
    checked: true,
    title: 'Mailchimp',
    logo: '/images/logos/mail-chimp.png',
    subtitle: 'Email Marketing'
  }
]

const socialAccounts = [
  {
    title: 'Facebook',
    logo: '/images/logos/facebook.png',
    username: '@johnDoe',
    connected: true
  },
  {
    title: 'Twitter',
    logo: '/images/logos/twitter.png',
    username: '@johnDoe',
    connected: false
  },
  {
    title: 'LinkedIn',
    logo: '/images/logos/linkedin.png',
    username: '@johnDoe',
    connected: true
  },
  {
    title: 'Dribbble',
    logo: '/images/logos/dribbble.png',
    username: '@johnDoe',
    connected: false
  }
]

const UserViewConnection = () => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false)
  const [openUnlink, setOpenUnlink] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)

  const handleEditClickOpen = account => {
    setSelectedAccount(account)
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setSelectedAccount(null)
    setOpenEdit(false)
  }

  const handleUnlinkClickOpen = account => {
    setSelectedAccount(account)
    setOpenUnlink(true)
  }

  const handleUnlinkClose = () => {
    setSelectedAccount(null)
    setOpenUnlink(false)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Connected Accounts' />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Display content from your connected accounts on your site
            </Typography>

            {connectedAccounts.map(account => (
              <Box
                key={account.title}
                sx={{
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:not(:last-of-type)': { mb: 4 }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 4, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
                    <img src={account.logo} alt={account.title} height='30' />
                  </Box>
                  <div>
                    <Typography sx={{ fontWeight: 500 }}>{account.title}</Typography>
                    <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                      {account.subtitle}
                    </Typography>
                  </div>
                </Box>
                <Button
                  variant='outlined'
                  sx={{ p: 2 }}
                  color={account.checked ? 'error' : 'secondary'}
                  onClick={() => (account.checked ? handleUnlinkClickOpen(account) : handleEditClickOpen(account))}
                >
                  {account.checked ? 'Unlink' : 'Connect'}
                </Button>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Social Accounts' />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Share posts with your connected social accounts
            </Typography>

            {socialAccounts.map(account => (
              <Box
                key={account.title}
                sx={{
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:not(:last-of-type)': { mb: 4 }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 4, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
                    <img src={account.logo} alt={account.title} height='30' />
                  </Box>
                  <div>
                    <Typography sx={{ fontWeight: 500 }}>{account.title}</Typography>
                    <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                      {account.connected ? account.username : 'Not Connected'}
                    </Typography>
                  </div>
                </Box>
                <Button
                  variant='outlined'
                  sx={{ p: 2 }}
                  color={account.connected ? 'error' : 'secondary'}
                  onClick={() => (account.connected ? handleUnlinkClickOpen(account) : handleEditClickOpen(account))}
                >
                  {account.connected ? 'Unlink' : 'Connect'}
                </Button>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='user-view-edit'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
        aria-describedby='user-view-edit-description'
      >
        <DialogTitle id='user-view-edit'>Connect Account</DialogTitle>
        <DialogContent>
          <DialogContentText id='user-view-edit-description' sx={{ mb: 4 }}>
            Connect your account to {selectedAccount?.title}
          </DialogContentText>
          <form>
            <TextField
              fullWidth
              label='Username'
              sx={{ mb: 4 }}
              placeholder={`${selectedAccount?.title.toLowerCase()}Username`}
            />
            <TextField fullWidth label='Password' type='password' placeholder='············' />
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' sx={{ mr: 1 }} onClick={handleEditClose}>
            Connect
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleEditClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUnlink}
        onClose={handleUnlinkClose}
        aria-labelledby='user-view-unlink'
        aria-describedby='user-view-unlink-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
      >
        <DialogTitle id='user-view-unlink'>Unlink Account</DialogTitle>
        <DialogContent>
          <DialogContentText id='user-view-unlink-description'>
            Are you sure you want to unlink your {selectedAccount?.title} account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' sx={{ mr: 1 }} onClick={handleUnlinkClose}>
            Unlink
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleUnlinkClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default UserViewConnection
