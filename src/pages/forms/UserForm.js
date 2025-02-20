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
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import configData from '../../config.json'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { addUser, updateUser } from 'src/store/apps/user'

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: ''
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
  password: yup
    .string()
    .typeError('Password is Required')
    .min(6, obj => showErrors('Password', obj.value.length, obj.min))
    .required('Password Field is Required'),
  lastName: yup
    .string()
    .min(3, obj => showErrors('Last Name', obj.value.length, obj.min))
    .required(),
  email: yup.string().email().required('Email field is required'),
  firstName: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  role: yup.string().required('Role field is required')
})

const UserForm = () => {
  // ** States
  const [state, setState] = useState({
    password: '',
    showPassword: false
  })

  const [roles, setRoles] = useState()
  const [userDetails, setUserDetails] = useState()
  const [showContent, setShowContent] = useState()

  const dispatch = useDispatch()
  const router = useRouter()

  const { id } = router.query

  const getRoles = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/user/role`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })

    setRoles(response?.data)
  }

  const getUserDetails = async () => {
    if (Object.keys(router.query).length !== 0) {
      const response = await axios.get(`${configData.SERVER_URL}/api/showUser/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      setUserDetails(response?.data?.data)
      setShowContent(1)
    }
  }

  useEffect(() => {
    getRoles()
    getUserDetails()
    if (Object.keys(router.query).length === 0) {
      setShowContent(1)
    }
  }, [])

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

  useEffect(() => {
    if (Object.keys(router.query).length !== 0) {
      setValue('firstName', userDetails?.fname)
      setValue('lastName', userDetails?.lname)
      setValue('email', userDetails?.email)
      setValue('role', userDetails?.roles[0]?.id)
    }
  }, [router.query, setValue, userDetails])

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const handleBackClick = () => {
    router.back()
  }

  const onSubmit = data => {
    if (Object.keys(router.query).length === 0) {
      dispatch(addUser({ ...data }))
      router.back()
    } else {
      dispatch(updateUser({ ...data, id }))
      router.back()
    }
  }

  return (
    <Card>
      {Object.keys(router.query).length !== 0 ? <CardHeader title='Edit User' /> : <CardHeader title='Add User' />}
      {showContent !== undefined ? (
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='firstName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='First Name'
                        onChange={onChange}
                        error={Boolean(errors.firstName)}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                  {errors.firstName && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='lastName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Last Name'
                        onChange={onChange}
                        error={Boolean(errors.lastName)}
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                  {errors.lastName && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='email'
                        value={value}
                        label='Email'
                        onChange={onChange}
                        error={Boolean(errors.email)}
                        aria-describedby='validation-basic-email'
                      />
                    )}
                  />
                  {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='validation-basic-password' error={Boolean(errors.password)}>
                    Password
                  </InputLabel>
                  <Controller
                    name='password'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <OutlinedInput
                        value={value}
                        label='Password'
                        onChange={onChange}
                        id='validation-basic-password'
                        error={Boolean(errors.password)}
                        type={state.showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                            >
                              <Icon icon={state.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.password && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='validation-basic-select'
                    error={Boolean(errors.role)}
                    htmlFor='validation-basic-select'
                  >
                    Role
                  </InputLabel>
                  <Controller
                    name='role'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Role'
                        onChange={onChange}
                        error={Boolean(errors.role)}
                        labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                      >
                        {roles?.data?.map((role, index) => {
                          return (
                            <MenuItem value={role.id} key={index}>
                              {role.name}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    )}
                  />
                  {errors.role && <FormHelperText sx={{ color: 'error.main' }}>{errors.role.message}</FormHelperText>}
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

UserForm.acl = {
  action: 'create',
  subject: 'user'
}

export default UserForm
