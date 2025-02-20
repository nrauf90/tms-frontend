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
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const UserViewAccount = ({ userData }) => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false)

  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Typography variant='h6' sx={{ mb: 2 }}>
                {userData?.fname} {userData?.lname}
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                {userData?.role}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ mr: 6, display: 'flex', alignItems: 'center' }}>
                <Icon icon='tabler:check' fontSize={20} />
                <Typography sx={{ ml: 1, color: 'text.secondary' }}>
                  Status: {userData?.status ? 'Active' : 'Inactive'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon icon='tabler:clock' fontSize={20} />
                <Typography sx={{ ml: 1, color: 'text.secondary' }}>
                  Joined: {new Date(userData?.created_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </CardContent>

          <CardContent>
            <Box sx={{ pt: 2 }}>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                  First Name:
                </Typography>
                <Typography variant='body2'>{userData?.fname}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                  Last Name:
                </Typography>
                <Typography variant='body2'>{userData?.lname}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                  Email:
                </Typography>
                <Typography variant='body2'>{userData?.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                  Role:
                </Typography>
                <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                  {userData?.role}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                  Status:
                </Typography>
                <Typography variant='body2'>{userData?.status ? 'Active' : 'Inactive'}</Typography>
              </Box>
            </Box>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
              Edit
            </Button>
            <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
              Suspend
            </Button>
          </CardActions>

          <Dialog
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby='user-view-edit'
            aria-describedby='user-view-edit-description'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
          >
            <DialogTitle
              id='user-view-edit'
              sx={{
                textAlign: 'center',
                fontSize: '1.5rem !important',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              Edit User Information
            </DialogTitle>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(8)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
              }}
            >
              <form>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='First Name' defaultValue={userData?.fname} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Last Name' defaultValue={userData?.lname} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth type='email' label='Email' defaultValue={userData?.email} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='user-view-status-label'>Status</InputLabel>
                      <Select
                        label='Status'
                        defaultValue={userData?.status ? '1' : '0'}
                        id='user-view-status'
                        labelId='user-view-status-label'
                      >
                        <MenuItem value='1'>Active</MenuItem>
                        <MenuItem value='0'>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
                Submit
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={suspendDialogOpen}
            onClose={() => setSuspendDialogOpen(false)}
            aria-labelledby='user-view-suspend'
            aria-describedby='user-view-suspend-description'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
          >
            <DialogTitle id='user-view-suspend'>Suspend User</DialogTitle>
            <DialogContent>
              <DialogContentText id='user-view-suspend-description'>
                Are you sure you want to suspend this user? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSuspendDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setSuspendDialogOpen(false)} color='error'>
                Suspend
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserViewAccount
