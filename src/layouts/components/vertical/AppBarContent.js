// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

// ** Axios import
import axios from 'axios'
import configData from '../../../config.json'
import { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'

//** Pusher Imports */

import Pusher from 'pusher-js'
import Echo from 'laravel-echo'

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const [notifications, setNotifications] = useState()
  const { user } = useAuth()

  const getNotifications = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/unreadNotifications`, {
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    
    //console.log(response)
    setNotifications(response)
  }

  useEffect(() => {
    getNotifications()
    window.Pusher = Pusher
    
    const options = {

      broadcaster: 'pusher',
      key: 'b38307615be0ea31be83',
      cluster: 'ap2',
      forceTLs: true,
      authEndpoint: `${configData.SERVER_URL}/api/broadcasting/auth`,
      auth: {
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    }
    const echo = new Echo(options)
    echo.private(`notification_${user.id}`).listen("Notify", (e) => {
      //console.log("Listening for new notification")
      getNotifications()
    })

    return (() => {
      echo.private(`notification_${user.id}`).stopListening("Notify", (e) => {
        //console.log("Stopping Listening")
      })
    })
  }, [])

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon fontSize='1.5rem' icon='tabler:menu-2' />
          </IconButton>
        ) : null}

        <ModeToggler settings={settings} saveSettings={saveSettings} />
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        { notifications?.data?.message != "No New Notifications" ? (
          <NotificationDropdown settings={settings} notifications={notifications} />
        ) : null
        }
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
