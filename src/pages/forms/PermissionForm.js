// ** React & Next Imports
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useDispatch } from 'react-redux'
import { addPermission, editPermission } from 'src/store/apps/permissions'
import configData from '../../config.json'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Icon Imports

const defaultValues = {
  permissionName: '',
  slug: '',
  groupName: ''
}

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  slug: yup.string().required('Slug is Required'),
  groupName: yup.string().required('Group Name is Required'),
  permissionName: yup.string().required('Permission Name is required')
})

const PermissionForm = () => {
  // ** States

  const [groups, setGroups] = useState()
  const [genericPermissions, setGenericPermissions] = useState()
  const [showContent, setShowContent] = useState()

  const dispatch = useDispatch()
  const router = useRouter()

  const { id } = router.query

  const getAllgroups = async () => {
    const groupData = await axios.get(`${configData.SERVER_URL}/api/getAllGroups`)
    setGroups(groupData.data.data)
  }

  const getGenericPermissions = async () => {
    const genericPermissionsData = await axios.get(`${configData.SERVER_URL}/api/getGenericPermissions`)
    setGenericPermissions(genericPermissionsData.data.data)
    if (Object.keys(router.query).length === 0) {
      setShowContent(1)
    }
  }

  useEffect(() => {
    getAllgroups()
    getGenericPermissions()
  }, [])

  const getPermissionDetail = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/getPermission/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    const str = response?.data?.data[0]?.name.split('-')
    setValue('permissionName', str[0])
    setValue('slug', str[1])
    setValue('groupName', response?.data?.data[0]?.groups[0]?.permission_group?.group_name)
    setShowContent(1)
  }

  const handleBackClick = () => {
    router.back()
  }

  // ** Hooks
  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    if (Object.keys(router.query).length === 0) {
      dispatch(addPermission({ ...data }))
      router.back()
    } else {
      dispatch(editPermission({ ...data, id }))
      router.back()
    }
  }

  useEffect(() => {
    if (Object.keys(router.query).length !== 0) {
      getPermissionDetail()
    }
  }, [])

  return (
    <Card>
      {Object.keys(router.query).length !== 0 ? (
        <CardHeader title='Edit Permission' />
      ) : (
        <CardHeader title='Add Permission' />
      )}
      {showContent !== undefined ? (
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='slug'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Slug'
                        onChange={onChange}
                        error={Boolean(errors.slug)}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                  {errors.slug && <FormHelperText sx={{ color: 'error.main' }}>{errors.slug.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='validation-basic-select'
                    error={Boolean(errors.select)}
                    htmlFor='validation-basic-select'
                  >
                    Group Name
                  </InputLabel>
                  <Controller
                    name='groupName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Group Name'
                        onChange={onChange}
                        error={Boolean(errors.groupName)}
                        labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                      >
                        {groups?.map((group, index) => {
                          return (
                            <MenuItem value={group.group_name} key={index}>
                              {group.group_name}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    )}
                  />
                  {errors.groupName && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.groupName.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='validation-basic-select'
                    error={Boolean(errors.select)}
                    htmlFor='validation-basic-select'
                  >
                    Permission Name
                  </InputLabel>
                  <Controller
                    name='permissionName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Permission Name'
                        onChange={onChange}
                        error={Boolean(errors.permissionName)}
                        labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                      >
                        {genericPermissions?.map((gPermissions, index) => {
                          return (
                            <MenuItem value={gPermissions.name} key={index}>
                              {gPermissions.name}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    )}
                  />
                  {errors.permissionName && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.permissionName.message}</FormHelperText>
                  )}
                </FormControl>
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

PermissionForm.acl = {
  action: 'create',
  subject: 'permission'
}

export default PermissionForm
