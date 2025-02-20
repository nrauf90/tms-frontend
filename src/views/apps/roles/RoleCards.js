// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// API CALLING IMPORTS
import axios from 'axios'
import configData from '../../../config.json'



const RolesCards = () => {
  // ** States
  const [rolesData, setRolesData] = useState()

  const getAllRoles = async () => { 
    const data = await axios.get(`${configData.SERVER_URL}/api/user/role`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` 
    }
  })
  setRolesData(data.data.data)
}

useEffect(() => {
  getAllRoles()
}, [])

  const renderCards = () => {
    return (
    rolesData?.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>Total {item.model_has_role.length} users</Typography>
              <AvatarGroup
                max={4}
                className='pull-up'
                sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem' } }}
              >
                {item.model_has_role.map((img, index) => (
                  <Avatar key={index} alt={item.title} src={`${configData.SERVER_URL}/${img.role_user?.image}`} />
                ))}
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='h5' sx={{ mb: 1 }}>
                  {item.name}
                </Typography>
                <Typography
                  href={`/forms/RoleForm?id=${item.id}`}
                  component={Link}
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  Edit Role
                </Typography>
              </Box>
              <IconButton size='small' sx={{ color: 'text.disabled' }}>
                <Icon icon='tabler:copy' />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    )
  )
)}

  return (
    <>
    { rolesData === undefined? (
      <Box
        sx={{
          height: '50vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
      <CircularProgress disableShrink sx={{ mt: 6 }} />
      </Box>
    ) : (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={5}>
              <Box
                sx={{
                  height: '100%',
                  minHeight: 140,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}
              >
                <img height={122} alt='add-role' src='/images/pages/add-new-role-illustration.png' />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <CardContent sx={{ pl: 0, height: '100%' }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ mb: 3, whiteSpace: 'nowrap' }}
                    component={Link}
                    href='/forms/RoleForm'
                  >
                    Add New Role
                  </Button>
                  <Typography sx={{ color: 'text.secondary' }}>Add role, if it doesn't exist.</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
    )}
  </>
  )
}

export default RolesCards
