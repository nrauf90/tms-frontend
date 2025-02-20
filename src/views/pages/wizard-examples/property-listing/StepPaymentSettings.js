// ** React Imports
import { useState, useEffect, useCallback, lazy, Suspense } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import PaypalSettingsTab from '../property-listing/PaypalSettingsTab'
import StripeSettingsTab from '../property-listing/StripeSettingsTab'
import Spinner from 'src/@core/components/simple-spinner'
import { Pagination } from '@mui/material'
import Select from '@mui/material/Select'

const DataGrids = lazy(() => import('src/core/DataGrid/DataGrids'))

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/payment/list/TableHeader'

// ** Actions Imports
import {fetchData, addMethod, deleteMethod, updateMethod} from 'src/store/apps/payment'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

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
  methodName: yup.string().matches(/^[A-Za-z\s]+$/, 'Name must contain only letters and spaces')
  .typeError('Method Name is required')
  .min(4, obj => showErrors('Name', obj.value.length, obj.min))
  .required('Method Name is required'),
  methodDescription: yup
  .string().matches(/^[A-Za-z\s]+$/, 'Discription must contain only letters and spaces')
  .required('Method Description is required'),
  methodStatus: yup.string().matches(/^[A-Za-z\s]+$/, 'Discription must contain only letters and spaces')
  .required('Method Status is required'),
})

const defaultValues = {
  methodName : '',
  methodDescription: '',
  methodStatus: ''
  }

const RowOptions = ({ id, name, description, status }) => {

    // ** Hooks
  
    const dispatch = useDispatch()
  
    // ** State
    const [anchorEl, setAnchorEl] = useState(null)
    const [addOfflineMethodOpen, setAddOfflineMethodOpen] = useState(false)
    const rowOptionsOpen = Boolean(anchorEl)
  
    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }
  
    const handleDelete = () => {
      dispatch(deleteMethod(id))
      handleRowOptionsClose()
    }

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
  
    const toggleAddOfflineMethod = () =>{ 
      setValue('methodName', name)
      setValue('methodDescription', description)
      setValue('methodStatus', status)
      setAddOfflineMethodOpen(!addOfflineMethodOpen)
      handleRowOptionsClose()

    }

    const handleClose = () => {
      setAddOfflineMethodOpen(false)
      reset()
    }
  
    const onSubmit = data => {
      dispatch(updateMethod({...data, id}))
      setAddOfflineMethodOpen(false)
      reset()
    }
  
    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='tabler:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          
          <MenuItem onClick={toggleAddOfflineMethod} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:edit' fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:trash' fontSize={20} />
            Delete
          </MenuItem>
        </Menu>
        <Dialog
              open={addOfflineMethodOpen}
              onClose={handleClose}
              aria-labelledby='user-view-edit'
              aria-describedby='user-view-edit-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
              <DialogTitle
                id='user-view-edit'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                Edit Offline Payment Method
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                {/* <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText> */}
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='methodName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                      <TextField 
                      fullWidth 
                      error={Boolean(errors.methodName)}
                      label='Method Name' 
                      value={value}
                      onChange={onChange}
                      />
                      )}
                      />
                      {errors.methodName && <FormHelperText sx={{ color: 'error.main' }}>{errors.methodName.message}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='methodDescription'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.methodDescription)}
                        label='Method Description'
                      />
                      )}
                      />
                      {errors.methodDescription && <FormHelperText sx={{ color: 'error.main' }}>{errors.methodDescription.message}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='methodStatus'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                    <TextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.methodStatus)}
                        label='Method Status'
                      />
                    )}
                    />
                    {errors.methodStatus && <FormHelperText sx={{ color: 'error.main' }}>{errors.methodStatus.message}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
                >
                <Button type='submit' variant='contained' sx={{ mr: 2 }}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActions>
                </form>
            </Dialog>
      </>
    )
  }
  
  const columns = [
    {
      flex: 0,
      minWidth: 150,
      field: 'paymentMethod',
      headerName: 'Method',
      renderCell: ({ row }) => {
        const { fullName, email } = row
  
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                }}
              >
                {row.method_name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      field: 'methodDescription',
      minWidth: 200,
      headerName: 'Description',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                }}
              >
                {row.description}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0,
      minWidth: 90,
      field: 'methodStatus',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                }}
              >
                {row.status ==1? 'Active' : 'Inactive'}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row.id} name={row.method_name}  description={row.description} status={row.status}/>
    }
  ]

const StepPaymentSettings = () => {
    const [value, setvalue] = useState('1')
    const [searchValue, setSearchValue] = useState('')
    const [addOfflineMethodOpen, setAddOfflineMethodOpen] = useState(false)
    const [onlineMethodTab, setOnlineMethodTab] = useState('1')
    const [methodName, setMethodName] = useState()
    const [methodDescription, setMethodDescription] = useState()
    const [methodStatus, setMethodStatus] = useState()
    const [page, setPage] = useState(1)
    const [length, setLength] = useState(10)

  const handleChange = (event, newValue) => {
    setvalue(newValue)
  }

  const handleOnlineMethodTabChange = (event, newValue) => {
    setOnlineMethodTab(newValue)
  }

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

  const dispatch = useDispatch()
  const store = useSelector(state => state.payment)
  useEffect(() => {
    dispatch(
      fetchData({
        //filters
        methodName : searchValue,
        length
      })
    )
  }, [dispatch, searchValue, length])

  const handleFilter = useCallback(val => {
    setSearchValue(val)
  }, [])

  const toggleAddOfflineMethod = () => setAddOfflineMethodOpen(!addOfflineMethodOpen)
  
  const handleClose = () => {
    setAddOfflineMethodOpen(false)
    reset()
  }

  const onSubmit = data => {
    dispatch(addMethod({...data}))
    setAddOfflineMethodOpen(false)
    reset()
  }

  return (
    <TabContext value={value}>
      <TabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
        <Tab value='1' label='Offline Payment Methods' />
        <Tab value='2' label='Online Payment Methods' />
      </TabList>
      <TabPanel value='1' sx={{ p: 0 }}>
      <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card sx={{ boxShadow: 0 }}>
          <TableHeader value={searchValue} handleFilter={handleFilter} toggle={toggleAddOfflineMethod}/>
          <Suspense fallback={<Spinner />}>
            <DataGrids
            store={store}
            columns={columns}
            lastCount = {store.last_page}
            page={page}
            setPage={setPage}
            length={length}
            setLength={setLength}
            />
          </Suspense>
        </Card>
      </Grid>
      <Dialog
              open={addOfflineMethodOpen}
              onClose={handleClose}
              aria-labelledby='user-view-edit'
              aria-describedby='user-view-edit-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
              <DialogTitle
                id='user-view-edit'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                Add Offline Payment Method
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                {/* <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText> */}
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='methodName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                      <TextField 
                      fullWidth 
                      error={Boolean(errors.methodName)}
                      label='Method Name' 
                      value={value}
                      onChange={onChange}
                      />
                      )}
                      />
                      {errors.methodName && <FormHelperText sx={{ color: 'error.main' }}>{errors.methodName.message}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='methodDescription'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        error={Boolean(errors.methodDescription)}
                        label='Method Description'
                        value={value}
                        onChange={onChange}
                      />
                      )}
                      />
                      {errors.methodDescription && <FormHelperText sx={{ color: 'error.main' }}>{errors.methodDescription.message}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='methodStatus'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                    <TextField
                        fullWidth
                        error={Boolean(errors.methodStatus)}
                        label='Method Status'
                        value={value}
                        onChange={onChange}
                      />
                    )}
                    />
                    {errors.methodStatus && <FormHelperText sx={{ color: 'error.main' }}>{errors.methodStatus.message}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
                >
                <Button type='submit' variant='contained' sx={{ mr: 2 }}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActions>
                </form>
            </Dialog>
    </Grid>
      </TabPanel>
      <TabPanel value='2'>
      <TabContext value={onlineMethodTab}>
      <TabList centered onChange={handleOnlineMethodTabChange} aria-label='centered tabs example'>
        <Tab value='1' label='Paypal' />
        <Tab value='2' label='Stripe' />
      </TabList>
      <TabPanel value='1'>
        <PaypalSettingsTab />
      </TabPanel>
      <TabPanel value='2'>
          <StripeSettingsTab />
      </TabPanel>
      </TabContext>
      </TabPanel>
    </TabContext>
  )

}


export default StepPaymentSettings