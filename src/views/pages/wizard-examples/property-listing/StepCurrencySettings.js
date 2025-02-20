// ** React Imports
import { useState, useEffect, useCallback, lazy, Suspense} from 'react'


// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Spinner from 'src/@core/components/simple-spinner'


// ** DataGrid lazy loading...

const DataGrids = lazy(() => import('src/core/DataGrid/DataGrids'))

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/currency/list/TableHeader'

// ** Actions Imports
import { fetchData, addCurrency, deleteCurrency, updateCurrency } from 'src/store/apps/currency'

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
  currencyName: yup.string().matches(/^[A-Za-z\s]+$/, 'Currency Name must contain only letters and spaces')
  .typeError('Currency Name is required')
  .min(4, obj => showErrors('Currency', obj.value.length, obj.min))
  .required('Currency Name is required'),
  currencySymbol: yup
  .string()
  .required('Currency Symbol is required'),
  currencyCode: yup.string().matches(/^[A-Za-z\s]+$/, 'Code must contain only letters and spaces')
  .min(2, obj => showErrors('Code', obj.value.length, obj.min ))
  .required('Currency Code is required'),
})

const defaultValues = {
currencyName : '',
currencySymbol: '',
currencyCode: ''
}


const RowOptions = ({ id, name, code, symbol, crypto }) => {
  // ** State
  const [editCurrencyOpen, setEditCurrencyOpen] = useState(false)
  const [cryptoCurrency, setCryptoCurrency] = useState(0)
  const [currencyPosition, setCurrencyPosition] = useState(0)

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

  // ** Hooks

  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteCurrency(id))
    handleRowOptionsClose()
  }

  const handleClose = () =>{ 
    setEditCurrencyOpen(false)
    reset()
   }

   const toggleEditCurrency = () =>{ 
    setValue('currencyName', name)
    setValue('currencyCode', code)
    setValue('currencySymbol', symbol)
    setCryptoCurrency(crypto)
    setEditCurrencyOpen(!editCurrencyOpen)
    handleRowOptionsClose()
   }

   const onSubmit = data => {
    dispatch(updateCurrency({...data, cryptoCurrency, id}))
    setCryptoCurrency('No')
    setEditCurrencyOpen(false)
    reset()
  }

  const handleCryptoCheck = event => {
    setCryptoCurrency(event.target.value)
  }
  
  const handlePositionCheck = event => {
    setCurrencyPosition(event.target.value)
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
        
        <MenuItem onClick={toggleEditCurrency} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
      <Dialog
              open={editCurrencyOpen}
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
                Edit Currency
              </DialogTitle>

              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='currencyName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                      <TextField 
                      fullWidth 
                      value={value}
                      onChange={onChange}
                      label='Currency Name' 
                      error={Boolean(errors.currencyName)}
                        />
                      )}
                      />
                      {errors.currencyName && <FormHelperText sx={{ color: 'error.main' }}>{errors.currencyName.message}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='currencySymbol'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        label='Currency Symbol'
                        error={Boolean(errors.currencySymbol)}
                      />
                      )}
                      />
                      {errors.currencySymbol && <FormHelperText sx={{ color: 'error.main' }}>{errors.currencySymbol.message}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl sx={{ width:'100%' }}>
                    <Controller
                      name='currencyCode'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                    <TextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        label='Currency Code'
                        error={Boolean(errors.currencyCode)}
                      />
                      )}
                      />
                      {errors.currencyCode && <FormHelperText sx={{ color: 'error.main' }}>{errors.currencyCode.message}</FormHelperText>}
                      </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                  <Typography>Is Cryptocurrency?</Typography>
                  <RadioGroup row aria-label='controlled' name='controlled' value={cryptoCurrency} onChange={handleCryptoCheck}>
                      <FormControlLabel value='1' control={<Radio />} label='Yes' />
                      <FormControlLabel value='0' control={<Radio />} label='No' />
                  </RadioGroup>
                  </Grid>
                  <Grid item xs={13} sm={5}>
                  <Typography>Currency Position?</Typography>
                  <RadioGroup row aria-label='controlled' name='controlled' value={currencyPosition} onChange={handlePositionCheck}>
                      <FormControlLabel value='1' control={<Radio />} label='Front' />
                      <FormControlLabel value='0' control={<Radio />} label='Behind' />
                  </RadioGroup>
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
    flex: 0.1,
    minWidth: 170,
    field: 'currencyName',
    headerName: 'Name',
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
              {row.currency}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0,
    field: 'currencySymbol',
    minWidth: 90,
    headerName: 'Symbol',
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
              {row.symbol}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0,
    minWidth: 110,
    field: 'currencyPosition',
    headerName: 'Position',
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
              {/* {row.currencyPosition} */}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0,
    field: 'currencyCode',
    width: 70,
    headerName: 'Code',
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
              {row.code}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    field: 'exchangeRate',
    minWidth: 100,
    headerName: 'Exchange Rate',
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
              {/* {row.languageCode} */}
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
    renderCell: ({ row }) => <RowOptions id={row.id} name={row.currency} symbol={row.symbol} code={row.code} crypto={row.is_cryptocurrency} />
  }
]

const StepCurrencySettings = () => {
  // ** State
  const [value, setvalue] = useState('')
  const [addCurrencyOpen, setAddCurrencyOpen] = useState(false)
  const [cryptoCurrency, setCryptoCurrency] = useState(0)
  const [currencyPosition, setCurrencyPosition] = useState(0)
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)

  const handleCryptoCheck = event => {
    setCryptoCurrency(event.target.value)
  }
  
  const handlePositionCheck = event => {
    setCurrencyPosition(event.target.value)
  }

  // ** Hooks

  const dispatch = useDispatch()
  const store = useSelector(state => state.currency)
  useEffect(() => {
    dispatch(
      fetchData({
        currencyName: value,
        page,
        length
      })
    )
  }, [dispatch, value, page, length])

  const handleFilter = useCallback(val => {
    setvalue(val)
  }, [])

  const toggleAddCurrency = () => setAddCurrencyOpen(!addCurrencyOpen)

  const handleClose = () =>{ 
    setAddCurrencyOpen(false)
    reset()
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


  const onSubmit = data => {

    dispatch(addCurrency({...data, cryptoCurrency}))
    setCryptoCurrency('No')
    setAddCurrencyOpen(false)
    reset()
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card sx={{ boxShadow: 0 }}>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddCurrency}/>
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
              open={addCurrencyOpen}
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
                Add Currency
              </DialogTitle>

              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='currencyName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                      <TextField 
                      fullWidth
                      label='Currency Name' 
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.currencyName)}
                        />
                      )}
                      />
                      {errors.currencyName && <FormHelperText sx={{ color: 'error.main' }}>{errors.currencyName.message}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ width: '100%' }}>
                    <Controller
                      name='currencySymbol'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        label='Currency Symbol'
                        error={Boolean(errors.currencySymbol)}
                      />
                      )}
                      />
                      {errors.currencySymbol && <FormHelperText sx={{ color: 'error.main' }}>{errors.currencySymbol.message}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl sx={{ width:'100%' }}>
                    <Controller
                      name='currencyCode'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                    <TextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        label='Currency Code'
                        error={Boolean(errors.currencyCode)}
                      />
                      )}
                      />
                      {errors.currencyCode && <FormHelperText sx={{ color: 'error.main' }}>{errors.currencyCode.message}</FormHelperText>}
                      </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                  <Typography>Is Cryptocurrency?</Typography>
                  <RadioGroup row aria-label='controlled' name='controlled' value={cryptoCurrency} onChange={handleCryptoCheck}>
                      <FormControlLabel value='1' control={<Radio />} label='Yes' />
                      <FormControlLabel value='0' control={<Radio />} label='No' />
                  </RadioGroup>
                  </Grid>
                  <Grid item xs={13} sm={5}>
                  <Typography>Currency Position?</Typography>
                  <RadioGroup row aria-label='controlled' name='controlled' value={currencyPosition} onChange={handlePositionCheck}>
                      <FormControlLabel value='1' control={<Radio />} label='Front' />
                      <FormControlLabel value='0' control={<Radio />} label='Behind' />
                  </RadioGroup>
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
  )
  

}

export default StepCurrencySettings
