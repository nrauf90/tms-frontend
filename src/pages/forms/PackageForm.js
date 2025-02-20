// ** React & Next Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import Checkbox from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'
import configData from '../../config.json'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { addPackage, updatePackage } from 'src/store/apps/packages'

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
  name: yup
    .string()
    .typeError('Name is required')
    .min(4, obj => showErrors('Name', obj.value.length, obj.min))
    .required('Name is required'),
  employees: yup.number().required('Number of employees is required'),
  storageSize: yup.number().nullable().required('Size is required'),
  discription: yup
    .string()
    .min(10, obj => showErrors('Discription', obj.value.length, obj.min))
    .required('Discription is required'),
  monthly_price: yup
    .string()
    .nullable()
    .min(7)
    .matches(/^[+-]?\d+(\.\d+)?$/, 'Invalid data')
    .transform((value, originalValue) => (originalValue?.trim() === '' ? null : value)),
  annual_price: yup
    .string()
    .nullable()
    .min(7)
    .matches(/^[+-]?\d+(\.\d+)?$/, 'Invalid data')
    .transform((value, originalValue) => (originalValue?.trim() === '' ? null : value)),
  stripe_monthly_plan_id: yup
    .string()
    .nullable()
    .min(7)
    .matches(/^[+-]?\d+(\.\d+)?$/, 'Invalid data')
    .transform((value, originalValue) => (originalValue?.trim() === '' ? null : value)),
  stripe_annual_plan_id: yup
    .string()
    .nullable()
    .min(7)
    .matches(/^[+-]?\d+(\.\d+)?$/, 'Invalid data')
    .transform((value, originalValue) => (originalValue?.trim() === '' ? null : value)),
  paypal_monthly_plan_id: yup
    .string()
    .nullable()
    .min(7)
    .matches(/^[+-]?\d+(\.\d+)?$/, 'Invalid data')
    .transform((value, originalValue) => (originalValue?.trim() === '' ? null : value)),
  paypal_annual_plan_id: yup
    .string()
    .nullable()
    .min(7)
    .matches(/^[+-]?\d+(\.\d+)?$/, 'Invalid data')
    .transform((value, originalValue) => (originalValue?.trim() === '' ? null : value))
})

const defaultValues = {
  name: '',
  employees: '',
  storageSize: '',
  storageUnit: '',
  discription: '',
  monthly_price: '',
  annual_price: '',
  stripe_monthly_plan_id: '',
  stripe_annual_plan_id: '',
  paypal_monthly_plan_id: '',
  paypal_annual_plan_id: ''
}

const PackageForm = () => {
  // ** States

  const [freePlan, setFreePlan] = useState(false)
  const [monthlyPlansShow, setMonthlyPlansShow] = useState(true)
  const [annualPlansShow, setAnnualPlansShow] = useState(true)
  const [makePrivate, setMakePrivate] = useState(false)
  const [markRecommended, setMarkRecommended] = useState(false)
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)
  const [modules, setModules] = useState()
  const [showContent, setShowContent] = useState()
  const [isDefault, setIsDefault] = useState(false)

  // ** Hooks
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
  const router = useRouter()

  const { id } = router.query

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
    setMarkRecommended(!markRecommended)
  }

  const handleDefault = event => {
    setIsDefault(!isDefault)
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
  }, [selectedCheckbox, modules?.length])

  const getModules = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/modules`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })

    //console.log(response)

    setModules(response?.data?.data)

    if (Object.keys(router.query).length === 0) {
      setShowContent(1)
    }
  }

  const packageDetails = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/packageDetails/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })

    setValue('name', response?.data?.data[0]?.name)
    setValue('employees', response?.data?.data[0]?.employees)
    setValue('storageSize', response?.data?.data[0]?.storage.split(' ')[0])
    setValue('storageUnit', response?.data?.data[0]?.storage.split(' ')[1])
    setValue('discription', response?.data?.data[0]?.discription)
    if (response?.data?.data[0]?.free_plan == 1) {
      setFreePlan(true)
    } else {
      setFreePlan(false)
    }
    if (response?.data?.data[0]?.is_private == 1) {
      setMakePrivate(true)
    } else {
      setMakePrivate(false)
    }
    if (response?.data?.data[0]?.is_recommended == 1) {
      setMarkRecommended(true)
    } else {
      setMarkRecommended(false)
    }
    if (response?.data?.data[0]?.is_default == 1) {
      setIsDefault(true)
    } else {
      setIsDefault(false)
    }
    if (response?.data?.data[0]?.monthly_price != null) {
      setValue('monthly_price', response?.data?.data[0]?.monthly_price)
    }
    if (response?.data?.data[0]?.annual_price != null) {
      setValue('annual_price', response?.data?.data[0]?.annual_price)
    }
    if (response?.data?.data[0]?.stripe_monthly_plan_id != null) {
      setValue('stripe_monthly_plan_id', response?.data?.data[0]?.stripe_monthly_plan_id)
    }
    if (response?.data?.data[0]?.stripe_annual_plan_id != null) {
      setValue('stripe_annual_plan_id', response?.data?.data[0]?.stripe_annual_plan_id)
    }
    if (response?.data?.data[0]?.paypal_monthly_plan_id != null) {
      setValue('paypal_monthly_plan_id', response?.data?.data[0]?.paypal_monthly_plan_id)
    }
    if (response?.data?.data[0]?.paypal_annual_plan_id != null) {
      setValue('paypal_annual_plan_id', response?.data?.data[0]?.paypal_annual_plan_id)
    }
    if (response?.data?.data[0]?.modules != null) {
      response?.data?.data[0]?.modules?.forEach(row => {
        toggleModule(row.id)
      })
    }
    setShowContent(1)
  }

  useEffect(() => {
    getModules()
    if (Object.keys(router.query).length !== 0) {
      packageDetails()
    }
  }, [])

  const handleBackClick = () => {
    router.back()
  }

  const onSubmit = data => {
    if (Object.keys(router.query).length === 0) {
      if (freePlan == true) {
        data.free_plan = 1
      } else {
        data.free_plan = 0
      }
      if (makePrivate == true) {
        data.is_private = 1
      } else {
        data.is_private = 0
      }
      if (markRecommended == true) {
        data.is_recommended = 1
      } else {
        data.is_recommended = 0
      }
      if (isDefault == true) {
        data.is_default = 1
      } else {
        data.is_default = 0
      }
      data.modules = selectedCheckbox
      dispatch(addPackage({ ...data }))
      router.back()
    } else {
      if (freePlan == true) {
        data.free_plan = 1
      } else {
        data.free_plan = 0
      }
      if (makePrivate == true) {
        data.is_private = 1
      } else {
        data.is_private = 0
      }
      if (markRecommended == true) {
        data.is_recommended = 1
      } else {
        data.is_recommended = 0
      }
      if (isDefault == true) {
        data.is_default = 1
      } else {
        data.is_default = 0
      }
      data.modules = selectedCheckbox
      dispatch(updatePackage({ ...data, id }))
      router.back()
    }
  }

  return (
    <Card>
      {Object.keys(router.query).length === 0 ? (
        <CardHeader title='Add Package' />
      ) : (
        <CardHeader title='Edit Package' />
      )}
      {showContent !== undefined ? (
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Name'
                        onChange={onChange}
                        error={Boolean(errors.name)}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                  {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='employees'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Max Employees'
                        onChange={onChange}
                        error={Boolean(errors.employees)}
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                  {errors.employees && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.employees.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='storageSize'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Max Storage Size'
                        placeholder='Set "0" for unlimited storage size'
                        onChange={onChange}
                        error={Boolean(errors.storageSize)}
                        aria-describedby='validation-basic-email'
                      />
                    )}
                  />
                  {errors.storageSize && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.storageSize.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='unit-select' error={Boolean(errors.storageUnit)}>
                    Storage Unit
                  </InputLabel>
                  <Controller
                    name='storageUnit'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        defaultValue='MB'
                        fullWidth
                        labelId='unit-select'
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
                  {errors.storageUnit && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.storageUnit.message}</FormHelperText>
                  )}
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
              <Grid item xs={12} sm={6}>
                <FormGroup row>
                  <FormControlLabel
                    label='Is Default?'
                    control={<Checkbox checked={isDefault} onChange={handleDefault} name='Is Default' />}
                  />
                </FormGroup>
              </Grid>

              {freePlan == false ? (
                <>
                  <Grid item xs={12} sx={{ pt: 0 }}>
                    <Typography variant='h6'>Payment Gateway Plans</Typography>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormGroup row>
                      <FormControlLabel
                        label='Monthly'
                        control={
                          <Checkbox checked={monthlyPlansShow} onChange={handleMonthlyPlans} name='Monthly Plan' />
                        }
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
              ) : null}
              {freePlan == false ? (
                <>
                  {monthlyPlansShow == true ? (
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
                              error={Boolean(errors.monthly_price)}
                            />
                          )}
                        />
                        {errors.monthly_price && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.monthly_price.message}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  ) : null}
                  {annualPlansShow == true ? (
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
                              error={Boolean(errors.annual_price)}
                            />
                          )}
                        />
                        {errors.annual_price && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.annual_price.message}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  ) : null}
                  {monthlyPlansShow == true ? (
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
                              error={Boolean(errors.stripe_monthly_plan_id)}
                            />
                          )}
                        />
                        {errors.stripe_monthly_plan_id && (
                          <FormHelperText sx={{ color: 'error.main' }}>
                            {errors.stripe_monthly_plan_id.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  ) : null}
                  {annualPlansShow == true ? (
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
                              error={Boolean(errors.stripe_annual_plan_id)}
                            />
                          )}
                        />
                        {errors.stripe_annual_plan_id && (
                          <FormHelperText sx={{ color: 'error.main' }}>
                            {errors.stripe_annual_plan_id.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  ) : null}
                  {monthlyPlansShow == true ? (
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
                              error={Boolean(errors.paypal_monthly_plan_id)}
                            />
                          )}
                        />
                        {errors.paypal_monthly_plan_id && (
                          <FormHelperText sx={{ color: 'error.main' }}>
                            {errors.paypal_monthly_plan_id.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  ) : null}
                  {annualPlansShow == true ? (
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
                              error={Boolean(errors.paypal_annual_plan_id)}
                            />
                          )}
                        />
                        {errors.paypal_annual_plan_id && (
                          <FormHelperText sx={{ color: 'error.main' }}>
                            {errors.paypal_annual_plan_id.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  ) : null}
                </>
              ) : null}
              <Grid item xs={12} sm={6}>
                <FormGroup row>
                  <FormControlLabel
                    label='Make Private'
                    control={<Checkbox checked={makePrivate} onChange={handlePrivate} name='Make Private' />}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={<Switch checked={markRecommended} onChange={handleRecommended} />}
                  label='Mark as recommended?'
                />
              </Grid>
              <Grid item xs={12} sx={{ pt: 0 }}>
                <Typography variant='h6'>Select Module</Typography>
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
                          <TableRow key={index} sx={{ display: 'unset' }}>
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
                        label='Description'
                        multiline
                        rows={4}
                        variant='outlined'
                        fullWidth
                        error={Boolean(errors.discription)}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  {errors.discription && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.discription.message}</FormHelperText>
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

PackageForm.acl = {
  action: 'create',
  subject: 'package'
}

export default PackageForm
