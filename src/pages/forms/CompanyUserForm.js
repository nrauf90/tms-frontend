// ** React & Next Imports
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
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
import { addCompanyUser, updateCompanyUser } from 'src/store/apps/companyuser'

const defaultValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: ''
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
  lastname: yup
    .string()
    .min(3, obj => showErrors('Last Name', obj.value.length, obj.min))
    .required(),
  email: yup.string().email().required('Email field is required'),
  firstname: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required()
})

const CompanyUserForm = () => {
  // ** States
  const [state, setState] = useState({
    password: '',
    showPassword: false
  })

  const [roles, setRoles] = useState()
  const [userDetails, setUserDetails] = useState()
  const [showContent, setShowContent] = useState()
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  const { id } = router.query

  const getRoles = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/user/role`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })

    setRoles(response?.data?.data)
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
      setValue('firstname', userDetails?.fname)
      setValue('lastname', userDetails?.lname)
      setValue('email', userDetails?.email)
      userDetails?.roles?.forEach(row => {
        toggleRoles(row.id)
      })
    }
  }, [router.query, setValue, userDetails, toggleRoles])

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < roles?.length) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox, roles?.length])

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const handleBackClick = () => {
    router.back()
  }

  const toggleRoles = id => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      roles?.forEach(row => {
        toggleRoles(row.id)
      })
    }
  }

  const onSubmit = data => {
    if (Object.keys(router.query).length === 0) {
      dispatch(addCompanyUser({ ...data, selectedCheckbox }))
      router.back()
    } else {
      dispatch(updateCompanyUser({ ...data, id, selectedCheckbox }))
      router.back()
    }
  }

  return (
    <Card>
      {Object.keys(router.query).length !== 0 ? (
        <CardHeader title='Edit Company User' />
      ) : (
        <CardHeader title='Add Company User' />
      )}
      {showContent !== undefined ? (
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='firstname'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='First Name'
                        onChange={onChange}
                        error={Boolean(errors.firstname)}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                  {errors.firstname && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.firstname.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='lastname'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Last Name'
                        onChange={onChange}
                        error={Boolean(errors.lastname)}
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                  {errors.lastname && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.lastname.message}</FormHelperText>
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

              <Grid item xs={12} sx={{ pt: 0 }}>
                <Typography variant='h6'>Select Roles</Typography>
              </Grid>

              <Grid item xs={12}>
                <TableContainer>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={3}>
                          <FormControlLabel
                            label='Select All'
                            sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                            control={
                              <Checkbox
                                size='small'
                                onChange={handleSelectAllCheckbox}
                                indeterminate={isIndeterminateCheckbox}
                                checked={selectedCheckbox.length === roles?.length}
                              />
                            }
                          />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {roles?.map((i, index) => {
                        return (
                          <TableRow key={index} sx={{ display: 'unset' }}>
                            <TableCell>
                              <FormControlLabel
                                label={i.name}
                                control={
                                  <Checkbox
                                    size='small'
                                    id={`${i.id}-${i.name}`}
                                    onChange={() => toggleRoles(i.id)}
                                    checked={selectedCheckbox.includes(i.id)}
                                  />
                                }
                              />
                            </TableCell>
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

CompanyUserForm.acl = {
  action: 'create',
  subject: 'companyuser'
}

export default CompanyUserForm
