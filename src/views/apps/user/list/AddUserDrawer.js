// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addUser } from 'src/store/apps/user'

// ** SERVER LINK & Axios IMPORT
import axios from 'axios'
import configData from '../../../../config.json'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  password: yup.string()
  .typeError('Password is Required')
  .min(6, obj => showErrors('Password', obj.value.length, obj.min))
  .required('Password Field is Required'),
  lastName: yup
  .string()
  .min(3, obj => showErrors('Last Name', obj.value.length, obj.min))
  .required(),
  email: yup.string().email().required('Email field is required'),
  confirmPassword: yup.string()
    .typeError('Confirm Password is Required')
    .min(6, obj => showErrors('Confirm Password', obj.value.length, obj.min))
    .required(),
  firstName: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  selectRole: yup.string()
  .required('Role field is required')

})

const defaultValues = {
  email: '',
  lastName: '',
  firstName: '',
  confirmPassword: '',
  selectRole: ''
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [role, setRole] = useState('')

  // ** This State is used to fetch data from API response,,,,,

  const [roles, setRoles] = useState('')

  // ** Function to get roles in the system
  const getRoles = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/user/role`, {
      headers : {
        'Authorization' : `${localStorage.getItem("accessToken")}`
      }
    })

    //console.log(response)

    setRoles(response?.data)
  }

  useEffect(() => {
    if(open == true){
    getRoles()

    //console.log(":::: ROLES ::::::", roles)
    
    }
  }, [open])

  useEffect(() => {
    setValue('selectRole', role)
  }, [role])

  // ** Hooks
  const dispatch = useDispatch()

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    dispatch(addUser({ ...data, role}))
    toggle()
    reset()
    setRole('')
  }

  const handleClose = () => {
    setRole('')
    setValue('contact', Number(''))
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add User</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{ borderRadius: 1, color: 'text.primary', backgroundColor: 'action.selected' }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='firstName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='First Name'
                  onChange={onChange}
                  placeholder='John'
                  error={Boolean(errors.firstName)}
                />
              )}
            />
            {errors.firstName && <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='lastName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Last Name'
                  onChange={onChange}
                  placeholder='Harry'
                  error={Boolean(errors.lastName)}
                />
              )}
            />
            {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
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
                  placeholder='johndoe@email.com'
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='password'
                  value={value}
                  label='Password'
                  onChange={onChange}
                  
                  //placeholder='johndoe@email.com'
                  error={Boolean(errors.password)}
                />
              )}
            />
            {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='confirmPassword'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='password'
                  value={value}
                  label='Confirm Password'
                  onChange={onChange}
                  error={Boolean(errors.confirmPassword)}
                />
              )}
            />
            {errors.confirmPassword && <FormHelperText sx={{ color: 'error.main' }}>{errors.confirmPassword.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel
                  label='Select Role'
                  error={Boolean(errors.selectRole)}
                >
                  Role
                </InputLabel>
                <Controller
                  name='selectRole'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={role}
                      label='Role'
                      onChange={(e) => { 
                        setRole(e.target.value)
                      }
                    }
                      error={Boolean(errors.selectRole)}
                    >
                      {roles?.data?.map((role, index) => {
                        return (
                          <MenuItem value={role.id} key={index}>{role.name}</MenuItem>
                        )
                        })
                      }
                    </Select>
                  )}
                />
                {errors.selectRole && <FormHelperText sx={{ color: 'error.main' }}>{errors.selectRole.message}</FormHelperText>}
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
