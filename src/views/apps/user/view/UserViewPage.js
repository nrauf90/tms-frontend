// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Components Imports
import UserViewAccount from './UserViewAccount'
import UserViewSecurity from './UserViewSecurity'
import UserViewBilling from './UserViewBilling'
import UserViewNotification from './UserViewNotification'
import UserViewConnection from './UserViewConnection'
import configData from '../../../../config.json'
import axios from 'axios'

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const UserViewPage = ({ tab }) => {
  // ** State
  const [activeTab, setActiveTab] = useState(tab)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${configData.SERVER_URL}/api/user/details`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        setUserData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TabContext value={activeTab}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <TabList
                  variant='scrollable'
                  scrollButtons='auto'
                  onChange={handleChange}
                  aria-label='user view tabs'
                  sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
                >
                  <Tab value='account' label='Account' icon={<Icon icon='tabler:user-check' />} />
                  <Tab value='security' label='Security' icon={<Icon icon='tabler:lock' />} />
                  <Tab value='billing-plan' label='Billing & Plan' icon={<Icon icon='tabler:currency-dollar' />} />
                  <Tab value='notification' label='Notification' icon={<Icon icon='tabler:bell' />} />
                  <Tab value='connection' label='Connection' icon={<Icon icon='tabler:link' />} />
                </TabList>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <TabPanel sx={{ p: 0 }} value='account'>
                <UserViewAccount userData={userData} />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='security'>
                <UserViewSecurity />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='billing-plan'>
                <UserViewBilling />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='notification'>
                <UserViewNotification />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value='connection'>
                <UserViewConnection />
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default UserViewPage
