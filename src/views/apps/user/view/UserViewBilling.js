// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const data = [
  {
    id: 1,
    date: '27 Sep 2021',
    status: 'Paid',
    amount: '$24.99',
    service: 'Subscription Plan'
  },
  {
    id: 2,
    date: '27 Aug 2021',
    status: 'Paid',
    amount: '$24.99',
    service: 'Subscription Plan'
  },
  {
    id: 3,
    date: '27 Jul 2021',
    status: 'Paid',
    amount: '$24.99',
    service: 'Subscription Plan'
  }
]

const UserViewBilling = () => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false)
  const [openUpgrade, setOpenUpgrade] = useState(false)

  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const handleUpgradeClickOpen = () => setOpenUpgrade(true)
  const handleUpgradeClose = () => setOpenUpgrade(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Current Plan' />
          <CardContent>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h5'>Basic Plan</Typography>
                <Box>
                  <Button variant='contained' sx={{ mr: 3 }} onClick={handleUpgradeClickOpen}>
                    Upgrade Plan
                  </Button>
                  <Button variant='outlined' color='secondary' onClick={handleEditClickOpen}>
                    Cancel Subscription
                  </Button>
                </Box>
              </Box>
              <Typography sx={{ color: 'text.secondary' }}>A simple start for everyone with Basic features</Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ mb: 2, fontWeight: 500 }}>Active until Dec 09, 2021</Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                We will send you a notification upon Subscription expiration
              </Typography>
            </Box>
            <div>
              <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 600 }}>$24.99 Per Month</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Monthly Plan</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 600 }}>Storage</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Basic Storage (1 GB)</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 600 }}>Users</Typography>
                <Typography sx={{ color: 'text.secondary' }}>5 Users</Typography>
              </Box>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Payment Methods' />
          <CardContent>
            <Typography sx={{ mb: 4 }}>You can update your payment methods in Billing & Payments settings</Typography>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon icon='tabler:credit-card' fontSize={24} />
                <Box sx={{ ml: 3 }}>
                  <Typography sx={{ fontWeight: 600 }}>Visa card</Typography>
                  <Typography variant='body2'>Ending with 4242</Typography>
                </Box>
              </Box>
              <Box>
                <Button variant='outlined' sx={{ mr: 3 }}>
                  Edit
                </Button>
                <Button variant='outlined' color='secondary'>
                  Delete
                </Button>
              </Box>
            </Box>
            <Button variant='contained'>Add Payment Method</Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Billing History' />
          <CardContent>
            <TableContainer>
              <Table>
                <TableBody>
                  {data.map(item => (
                    <TableRow key={item.id} sx={{ '&:last-of-type td': { border: 0 } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Icon icon='tabler:file-text' fontSize={24} />
                          <Box sx={{ ml: 3 }}>
                            <Typography sx={{ fontWeight: 600 }}>{item.service}</Typography>
                            <Typography variant='body2'>{item.date}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600 }}>{item.amount}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <Typography
                            sx={{
                              mr: 3,
                              fontWeight: 600,
                              color: item.status === 'Paid' ? 'success.main' : 'error.main'
                            }}
                          >
                            {item.status}
                          </Typography>
                          <Button variant='outlined' size='small'>
                            View
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='user-view-billing-edit'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
      >
        <DialogTitle id='user-view-billing-edit'>Cancel Subscription</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 4 }}>
            Are you sure you would like to cancel your subscription? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' sx={{ mr: 1 }} onClick={handleEditClose}>
            Cancel Subscription
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleEditClose}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpgrade}
        onClose={handleUpgradeClose}
        aria-labelledby='user-view-billing-upgrade'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
      >
        <DialogTitle id='user-view-billing-upgrade'>Upgrade Plan</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 4 }}>
            Choose from our available plans to better suit your needs.
          </DialogContentText>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='user-view-billing-upgrade-plan'>Choose Plan</InputLabel>
                <Select
                  label='Choose Plan'
                  defaultValue='standard'
                  id='user-view-billing-upgrade-plan'
                  labelId='user-view-billing-upgrade-plan'
                >
                  <MenuItem value='basic'>Basic - $24.99/month</MenuItem>
                  <MenuItem value='standard'>Standard - $49.99/month</MenuItem>
                  <MenuItem value='enterprise'>Enterprise - $99.99/month</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' sx={{ mr: 1 }} onClick={handleUpgradeClose}>
            Upgrade
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleUpgradeClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default UserViewBilling
