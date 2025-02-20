// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import { Box } from '@mui/system'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import DialogActions from '@mui/material/DialogActions'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import FormHelperText from '@mui/material/FormHelperText'
import { updatePackage } from 'src/store/apps/packages'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Third party imports

import axios from 'axios'
import configData from '../../../config.json'

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
  name: yup.string()
  .typeError('Name is required')
  .min(4, obj => showErrors('Name', obj.value.length, obj.min))
  .required('Name is required'),
  employees: yup
  .number()
  .required('Number of employees is required'),
  storageSize: yup.number()
  .min(1, obj => showErrors('Size', obj.value.length, obj.min ))
  .required('Size is required'),
  discription: yup
  .string()
  .min(10, obj => showErrors('Discription', obj.value.length, obj.min))
  .required('Discription is required')
})

const defaultValues = {
  name : '',
  employees: '',
  storageSize: '',
  storageUnit: '',
  discription: '',
  }


const EditPackage = (props) => {

  // ** State
  const [open, setOpen] = useState(false)
  const [freePlan, setFreePlan] = useState(false)
  const [monthlyPlansShow, setMonthlyPlansShow] = useState(true)
  const [annualPlansShow, setAnnualPlansShow] = useState(true)
  const [makePrivate, setMakePrivate] = useState(false)
  const [markRecommended, setMarkRecommended] = useState(false)
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)
  const [modules, setModules] = useState()
  const id = props.id

  // ** Hooks
  const dispatch = useDispatch()

  const handlePlan = event => {
    setFreePlan(event.target.checked)
  }

  const handleMonthlyPlans = event => {
    setMonthlyPlansShow(event.target.checked)
  }

  const handleAnnualPlans = event => {
    setAnnualPlansShow(event.target.checked)
  }

  const handlePrivate = event => {
    setMakePrivate(event.target.checked)
  }

  const handleRecommended = event => {
    setMarkRecommended(event.target.value)
  }

  const toggleModule = id => {
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
      modules?.forEach(row => {
        toggleModule(row.id)
      })
    }
  }
  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < modules?.length) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }

    //console.log(selectedCheckbox)

  }, [selectedCheckbox])

  const getModules = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/modules`, {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
      }
    })

    //console.log(response)
    
    setModules(response?.data?.data)
  }

  useEffect(() => {
    if(open == true){
    getModules()
    packageDetails(props.id)
    }
  }, [open])

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

const handleClose = () => {
  setSelectedCheckbox([])
  setIsIndeterminateCheckbox(false)
  reset()
}

const packageDetails = async (id) => {
    const response = await axios.get(`${configData.SERVER_URL}/api/packageDetails/${id}`, {
        headers : {
            'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    console.log(response)
    setValue('name', response?.data?.data[0]?.name)
    setValue('employees', response?.data?.data[0]?.employees)
    setValue('storageSize', response?.data?.data[0]?.storage.split(" ")[0])
    setValue('storageUnit', response?.data?.data[0]?.storage.split(" ")[1])
    setValue('discription', response?.data?.data[0]?.discription)
    if(response?.data?.data[0]?.free_plan == 1){
        setFreePlan(true)
    } else {
        setFreePlan(false)
    }
    if(response?.data?.data[0]?.is_private == 1){
        setMakePrivate(true)
    } else {
        setMakePrivate(false)
    }
    if(response?.data?.data[0]?.is_recommended == 1){
        setMarkRecommended(true)
    } else {
        setMarkRecommended(false)
    }
    if(response?.data?.data[0]?.monthly_price != null){
        setValue('monthly_price', response?.data?.data[0]?.monthly_price)
    }
    if(response?.data?.data[0]?.annual_price != null){
        setValue('annual_price', response?.data?.data[0]?.annual_price)
    }
    if(response?.data?.data[0]?.stripe_monthly_plan_id != null){
        setValue('stripe_monthly_plan_id', response?.data?.data[0]?.stripe_monthly_plan_id)
    }
    if(response?.data?.data[0]?.stripe_annual_plan_id != null){
        setValue('stripe_annual_plan_id', response?.data?.data[0]?.stripe_annual_plan_id)
    }
    if(response?.data?.data[0]?.paypal_monthly_plan_id != null){
        setValue('paypal_monthly_plan_id', response?.data?.data[0]?.paypal_monthly_plan_id)
    }
    if(response?.data?.data[0]?.paypal_annual_plan_id != null){
        setValue('paypal_annual_plan_id', response?.data?.data[0]?.paypal_annual_plan_id)
    }
    if(response?.data?.data[0]?.modules  != null){
        response?.data?.data[0]?.modules?.forEach(row => {
            toggleModule(row.id)
        })
    }

  }


  const onSubmit = data => {
    setOpen(false)
    if(freePlan == true){
      data.free_plan = 1
    }
    else {
      data.free_plan = 0
    }
    if(makePrivate == true){
      data.is_private = 1
    } 
    else {
      data.is_private = 0
    }
    if(markRecommended == true){
      data.is_recommended = 1
    } 
    else {
      data.is_recommended = 0
    }
    data.modules = selectedCheckbox
    dispatch(updatePackage({...data, id}))
    reset()
    setFreePlan(false)
    setMakePrivate(false)
    setMarkRecommended(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
  }

  const openDialog = () => {
    reset()
    setFreePlan(false)
    setMakePrivate(false)
    setMarkRecommended(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
    setOpen(true)
  }
 
  const closeDialog = () => {
    setOpen(false)
    reset()
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
  }

  return (
    <>
    <IconButton onClick={openDialog}>
        <Icon icon='tabler:edit' />
    </IconButton>
      <Dialog 
        fullScreen
        fullWidth
        maxWidth='md'
        onClose={closeDialog} 
        open={open}
        >
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={closeDialog}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='tabler:x' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Edit Package
            </Typography>
            {/* <Typography variant='body2'>Updating user details will receive a privacy audit.</Typography> */}
          </Box>
          <Grid container spacing={6}>
          <Grid item xs={12} sx={{ pt: 0 }}>
            <Typography variant="h6">Edit Package Info</Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
            <FormControl sx={{ width: '100%' }}>
            <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
            <TextField 
            fullWidth
            label='Name' 
            error={Boolean(errors.name)} 
            value={value}
            onChange={onChange}
            />
            )}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
            </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
            <FormControl sx={{ width: '100%' }}>
            <Controller
            name='employees'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
            <TextField
              fullWidth
              label='Max Employees' 
              error={Boolean(errors.employees)} 
              value={value}
              onChange={onChange}
            />
            )}
            />
            {errors.employees && <FormHelperText sx={{ color: 'error.main' }}>{errors.employees.message}</FormHelperText>}
            </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ pt: 0 }}>
            <Typography variant="h6">Storage</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: '100%' }}>
            <Controller
            name='storageSize'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextField 
              fullWidth
              label='Max Storage Size' 
              placeholder='Set "0" for unlimited storage size'
              error={Boolean(errors.storageSize)} 
              value={value}
              onChange={onChange}
              />
            )}
            />
              {errors.storageSize && <FormHelperText sx={{ color: 'error.main' }}>{errors.storageSize.message}</FormHelperText>}
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel id='unit-select' error={Boolean(errors.storageUnit)} >Storage Unit</InputLabel>
                <Controller
                name='storageUnit'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                <Select
                defaultValue='MB' 
                fullWidth labelId='unit-select'
                label='Storage Unit'
                value={value}
                onChange={onChange}
                error={Boolean(errors.storageUnit)}
                >
                  <MenuItem value='MB'>MB</MenuItem>
                  <MenuItem value='GB'>GB</MenuItem>
                </Select>
                )}
                />
                {errors.storageUnit && <FormHelperText sx={{ color: 'error.main' }}>{errors.storageUnit.message}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormGroup row>
                <FormControlLabel
                    label='Free Plan'
                    control={<Checkbox checked={freePlan} onChange={handlePlan} name='Free Plan' />}
                />
            </FormGroup>
            </Grid>
            { freePlan == false? (
            <>
            <Grid item xs={12} sx={{ pt: 0 }}>
            <Typography variant="h6">Payment Gateway Plans</Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
            <FormGroup row>
                <FormControlLabel
                    label='Monthly'
                    control={<Checkbox checked={monthlyPlansShow} onChange={handleMonthlyPlans} name='Monthly Plan' />}
                />
            </FormGroup>
            </Grid>
            <Grid item sm={6} xs={12}>
            <FormGroup row>
                <FormControlLabel
                    label='Annual'
                    control={<Checkbox checked={annualPlansShow} onChange={handleAnnualPlans} name='Annual Plan' />}
                />
            </FormGroup>
            </Grid>
            </>
            ) : (
                null
            ) 
            }
            { freePlan == false? (
                <>
            { monthlyPlansShow == true? (
            <Grid item sm={6} xs={12}>
              <FormControl sx={{ width: '100%' }}>
              <Controller
              name='monthly_price'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
            <TextField 
              fullWidth
              label='Monthly Price ($)'
              value={value}
              onChange={onChange}
               />
            )}
            />
            </FormControl>
            </Grid>
            ) : (
                null
            )
            }
            { annualPlansShow == true? (
            <Grid item sm={6} xs={12}>
              <FormControl sx={{ width: '100%' }}>
              <Controller
              name='annual_price'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                label='Annual Price ($)'
                value={value}
                onChange={onChange}
                />
              )}
              />
              </FormControl>
            </Grid>
            ) : (
                null
            )
            }
            { monthlyPlansShow == true? (
            <Grid item sm={6} xs={12}>
              <FormControl sx={{ width: '100%' }}>
              <Controller
              name='stripe_monthly_plan_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                label='Stripe Monthly Plan ID'
                value={value}
                onChange={onChange}
                />
              )}
              />
              </FormControl>
            </Grid>
            ) : (
                null
            )
            }
            { annualPlansShow == true? (
            <Grid item sm={6} xs={12}>
              <FormControl sx={{ width: '100%' }}>
              <Controller
              name='stripe_annual_plan_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                label='Stripe Annual Plan ID'
                value={value}
                onChange={onChange}
                />
              )}
              />
              </FormControl>
            </Grid>
            ) : (
                null
            )
            }
            { monthlyPlansShow == true? (
            <Grid item sm={6} xs={12}>
              <FormControl sx={{ width: '100%' }}>
              <Controller
              name='paypal_monthly_plan_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
              <TextField 
                fullWidth
                label='Paypal Monthly Plan ID'
                value={value}
                onChange={onChange}
                />
              )}
              />
            </FormControl>
            </Grid>
            ) : (
                null
            )
            }
            { annualPlansShow == true? (
            <Grid item sm={6} xs={12}>
              <FormControl sx={{ width: '100%' }}>
              <Controller
              name='paypal_annual_plan_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                label='Paypal Annual Plan ID'
                value={value}
                onChange={onChange}
                />
              )}
              />
              </FormControl>
            </Grid>
            ) : (
                null
            )
            }
            </>
            ) : (
                null
            )
            }
            <Grid item xs={12} sm={6}>
            <FormGroup row>
            <FormControlLabel
                label='Make Private'
                control={<Checkbox checked={makePrivate} onChange={handlePrivate} name='Make Private' />}
            />
            </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Switch checked={markRecommended} onChange={handleRecommended} />} label='Mark as recommended?' />
            </Grid>
            <Grid item xs={12} sx={{ pt: 0 }}>
            <Typography variant="h6">Select Module</Typography>
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
                          checked={selectedCheckbox.length === modules?.length}
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modules?.map((i, index) => {
                  

                  return (
                    <TableRow key={index} sx={{ display: 'unset' }} >
                      {/* <TableCell
                        sx={{
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          color: theme => `${theme.palette.text.primary} !important`
                        }}
                      >
                        {i}
                      </TableCell> */}
                      <TableCell>
                        <FormControlLabel
                          label={i.name}
                          control={
                            <Checkbox
                              size='small'
                              id={`${i.id}-${i.name}`}
                              onChange={() => toggleModule(i.id)}
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
          <Grid item xs={12}>
          <FormControl sx={{ width: '100%' }}>
            <Controller
            name='discription'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
            <TextField
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                error={Boolean(errors.discription)} 
                value={value}
                onChange={onChange}
                />
          )}
          />
          {errors.discription && <FormHelperText sx={{ color: 'error.main' }}>{errors.discription.message}</FormHelperText>}
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
          <Button variant='contained' type='submit' sx={{ mr: 1 }}>
            Submit
          </Button> 
          <Button variant='outlined' color='secondary' onClick={closeDialog}>
            Discard
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default EditPackage