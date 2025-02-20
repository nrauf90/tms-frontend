// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import Icon from 'src/@core/components/icon'
import configData from '../../config.json'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Icon Imports

const defaultValues = {
  roleName: ''
}

const RoleForm = () => {
  // ** States
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)
  const [groupedPermissions, setGroupedPermissions] = useState()
  const [rolePermissions, setRolePermissions] = useState()
  const [showContent, setShowContent] = useState()

  const router = useRouter()
  const { id } = router.query

  const togglePermission = id => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  const handleAddSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      groupedPermissions?.forEach(row => {
        //const id = row.toLowerCase().split(' ').join('-')
        row.grouped_permissions.map(i => {
          togglePermission(i.permissions.id)
        })
      })
    }
  }

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < groupedPermissions?.length * 4) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox, groupedPermissions?.length])

  const loadGroupedPermissions = async () => {
    const groupedPermissions = await axios.get(`${configData.SERVER_URL}/api/getGroupedPermissions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    setGroupedPermissions(groupedPermissions.data.data)
    if (Object.keys(router.query).length === 0) {
      setShowContent(1)
    }
  }

  const loadRoleDetails = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/showRole/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    setValue('roleName', response?.data?.data?.name)
  }

  const loadRolePermissions = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/role/${id}/permissions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    setRolePermissions(response.data.data[0].role_has_permissions)
    setShowContent(1)
  }

  useEffect(() => {
    loadGroupedPermissions()
    if (Object.keys(router.query).length !== 0) {
      loadRoleDetails()
      loadRolePermissions()
    }
  }, [])

  useEffect(() => {
    if (rolePermissions != null) {
      rolePermissions?.map(rolePermission => {
        setSelectedCheckbox(prevCheck => [...prevCheck, rolePermission.permission_id])
      })
    }
  }, [rolePermissions])

  // ** Hooks
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const handleBackClick = () => {
    router.back()
  }

  const onSubmit = async data => {
    if (Object.keys(router.query).length === 0) {
      const response = await axios
        .post(
          `${configData.SERVER_URL}/api/role/${data.roleName}`,
          {
            permissions: selectedCheckbox
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          }
        )
        .catch(function (error) {
          toast.error('Unable to add role')
        })
      if (response?.data?.success == true) {
        toast.success('Role Created Successfully')
      }
      router.back()
    } else {
      const response = await axios
        .post(
          `${configData.SERVER_URL}/api/user/role/${id}/edit`,
          {
            permissions: selectedCheckbox,
            roleName: data.roleName
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          }
        )
        .catch(function (error) {
          toast.error('Cannot Edit Role')
        })

      if (response?.data?.success == true) {
        toast.success('Role Edited Successfully')
      }
      router.back()
    }
  }

  return (
    <Card>
      {Object.keys(router.query).length !== 0 ? <CardHeader title='Edit Role' /> : <CardHeader title='Add Role' />}
      {showContent !== undefined ? (
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='roleName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Role Name'
                        onChange={onChange}
                        error={Boolean(errors.roleName)}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                  {errors.roleName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='h6'>Role Permissions</Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ pl: '0 !important' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              fontSize: '0.875rem',
                              whiteSpace: 'nowrap',
                              alignItems: 'center',
                              textTransform: 'capitalize',
                              '& svg': { ml: 1, cursor: 'pointer' }
                            }}
                          >
                            Administrator Access
                            <Tooltip placement='top' title='Allows a full access to the system'>
                              <Box sx={{ display: 'flex' }}>
                                <Icon icon='tabler:info-circle' fontSize='1.25rem' />
                              </Box>
                            </Tooltip>
                          </Box>
                        </TableCell>
                        <TableCell colSpan={3}>
                          <FormControlLabel
                            label='Select All'
                            sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                            control={
                              <Checkbox
                                size='small'
                                onChange={handleAddSelectAllCheckbox}
                                indeterminate={isIndeterminateCheckbox}
                                checked={selectedCheckbox.length === groupedPermissions?.length * 4}
                              />
                            }
                          />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groupedPermissions?.map((i, index) => {
                        return (
                          <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                            <TableCell
                              sx={{
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                color: theme => `${theme.palette.text.primary} !important`
                              }}
                            >
                              {i.group_name}
                            </TableCell>
                            {i.grouped_permissions.map((j, index) => {
                              return (
                                <TableCell key={index}>
                                  <FormControlLabel
                                    key={j.permissions.id}
                                    label={j.permissions.name.split('-', 1)}
                                    control={
                                      <Checkbox
                                        size='small'
                                        id={j.permissions.name}
                                        onChange={() => togglePermission(j.permissions.id)}
                                        checked={selectedCheckbox.includes(j.permissions.id)}
                                      />
                                    }
                                  />
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: '2%' }}>
              <Grid item>
                <Button variant='contained' color='primary' type='submit'>
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' color='secondary' onClick={handleBackClick}>
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      ) : (
        <Box
          sx={{
            height: '50vh',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <CircularProgress disableShrink sx={{ mt: 6 }} />
        </Box>
      )}
    </Card>
  )
}

RoleForm.acl = {
  action: 'create',
  subject: 'role'
}

export default RoleForm
