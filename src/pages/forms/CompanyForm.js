// ** React Imports
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

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
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import Dropzone from 'react-dropzone'
import configData from '../../config.json'

//** Store imports */
import { useDispatch } from 'react-redux'
import { addCompany, updateCompanyAdmin } from 'src/store/apps/companies'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const defaultValues = {
  companyName: '',
  companyEmail: '',
  companyPhone: '',
  companyWebsite: '',
  companyAddress: '',
  defaultCurrency: '',
  defaultTimezone: '',
  defaultLanguage: '',
  defaultPackage: '',
  status: '',
  email: '',
  password: '',
  fname: '',
  lname: ''
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
  companyName: yup
    .string()
    .typeError('Company Name is required')
    .min(6, obj => showErrors('Company Name', obj.value.length, obj.min))
    .matches(/^[A-Za-z\s]+$/, 'Company Name must only contain letters')
    .required('Company Name field is required'),
  companyEmail: yup.string().email('Invalid Email Address').required('Email field is required'),
  companyPhone: yup
    .string()
    .matches(/^\+\d{1,3}\d{3}\d{3}\d{4}$/, 'Invalid phone number')
    .required('Phone Number field is required'),
  companyWebsite: yup
    .string()
    .typeError('Company Website is required')
    .min(6, obj => showErrors('Company Website', obj.value.length, obj.min))
    .matches(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(\/[^\s]*)?$/, 'Invalid website URL')
    .required('Company Website field is required'),
  companyAddress: yup
    .string()
    .typeError('Company Address is required')
    .min(10, obj => showErrors('Company Address', obj.value.length, obj.min))
    .required('Company Address field is required'),
  defaultCurrency: yup.string().required('Default Currency field is required'),
  defaultTimezone: yup.string().required('Default Timezone field is required'),
  defaultLanguage: yup.string().required('Default Language field is required'),
  defaultPackage: yup.string().required('Default Package field is required'),
  email: yup.string().email('Invalid Email Address').required('Email field is required'),
  password: yup.string().required('Password field is required'),
  fname: yup
    .string()
    .typeError('First Name is required')
    .min(4, obj => showErrors('First Name', obj.value.length, obj.min))
    .matches(/^[A-Za-z\s]+$/, 'First Name must only contain letters')
    .required('First Name field is required'),
  lname: yup
    .string()
    .typeError('Last Name is required')
    .min(4, obj => showErrors('Last Name', obj.value.length, obj.min))
    .matches(/^[A-Za-z\s]+$/, 'Last Name must only contain letters')
    .required('Last Name field is required'),
  status: yup.string().required('Status field is required')
})

const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginBottom: theme.spacing(8.5)
}))

const CompanyForm = () => {
  // ** States

  const [logoImg, setLogoImg] = useState([])
  const [currencies, setCurrencies] = useState()
  const [timeZones, setTimeZones] = useState()
  const [packages, setPackages] = useState()
  const [languages, setLanguages] = useState()
  const [showContent, setShowContent] = useState()
  const [base64Logo, setBase64Logo] = useState()

  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()

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

  const theme = useTheme()

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = logoImg
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setLogoImg([...filtered])
    setBase64Logo('')
  }

  const logoImgList = logoImg.map(file => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const loadCurrencies = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/allCurrencies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    setCurrencies(response?.data?.data)
  }

  const loadTimeZones = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/timezones`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    setTimeZones(response?.data?.data)
  }

  const loadPackages = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/allPackages`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    setPackages(response?.data?.data)
  }

  const loadLanguages = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/languages`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    setLanguages(response?.data?.data)
    if (Object.keys(router.query).length === 0) {
      setShowContent(1)
    }
  }

  const loadPackageDetails = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/showCompany/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    setValue('companyName', response?.data?.data[0]?.name)
    setValue('companyEmail', response?.data?.data[0]?.company_detail?.email)
    setValue('companyPhone', response?.data?.data[0]?.company_detail?.phone)
    setValue('companyWebsite', response?.data?.data[0]?.website)
    setValue('companyAddress', response?.data.data[0]?.company_detail?.address_line_1)
    setValue('defaultCurrency', response?.data?.data[0]?.company_detail?.currency?.id)
    setValue('defaultTimezone', response?.data?.data[0]?.company_detail?.timezone?.id)
    setValue('defaultPackage', response?.data?.data[0]?.package?.id)
    setValue('status', response?.data?.data[0]?.status)
    setValue('defaultLanguage', response?.data?.data[0]?.company_detail?.language?.id)

    //passing dummies to bypass validation errors in case of edit where we dont want to edit the user details
    //Not handling them at backend and also not sending them in request body from redux store

    setValue('email', 'someone@example.com')
    setValue('fname', 'Someone')
    setValue('lname', 'example')
    setValue('password', 'test1234')
    setShowContent(1)
  }

  useEffect(() => {
    loadCurrencies()
    loadTimeZones()
    loadPackages()
    loadLanguages()
    if (Object.keys(router.query).length !== 0) {
      loadPackageDetails()
    }
  }, [])

  const handleBackClick = () => {
    router.back()
  }

  const onSubmit = data => {
    if (Object.keys(router.query).length === 0) {
      dispatch(addCompany({ ...data, base64Logo }))
      router.back()
    } else {
      dispatch(updateCompanyAdmin({ ...data, id }))
      router.back()
    }
  }

  return (
    <Card>
      {Object.keys(router.query).length === 0 ? (
        <CardHeader title='Add Company' />
      ) : (
        <CardHeader title='Edit Companys' />
      )}
      {showContent !== undefined ? (
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='companyName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Company Name'
                        onChange={onChange}
                        error={Boolean(errors.companyName)}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                  {errors.companyName && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.companyName.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='companyEmail'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Company Email'
                        type='email'
                        onChange={onChange}
                        error={Boolean(errors.companyEmail)}
                        aria-describedby='validation-basic-last-name'
                      />
                    )}
                  />
                  {errors.companyEmail && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.companyEmail.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='companyPhone'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Company Phone'
                        onChange={onChange}
                        error={Boolean(errors.companyPhone)}
                        aria-describedby='validation-basic-email'
                      />
                    )}
                  />
                  {errors.companyPhone && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.companyPhone.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='companyWebsite'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Company Website'
                        onChange={onChange}
                        error={Boolean(errors.companyWebsite)}
                      />
                    )}
                  />
                  {errors.companyWebsite && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.companyWebsite.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 'bold' }}>Logo</Typography>
                <Fragment>
                  <Dropzone
                    onDrop={acceptedFiles => {
                      setLogoImg(
                        acceptedFiles.map(file => {
                          const reader = new FileReader()
                          reader.onload = () => {
                            const base64String = reader.result
                            setBase64Logo(base64String)
                          }
                          reader.readAsDataURL(file)

                          return Object.assign(file)
                        })
                      )
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <Box
                          sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}
                        >
                          <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
                          <Typography sx={{ mb: 2.5 }}>Drop file here or click to upload.</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>Max size of 2 MB</Typography>
                        </Box>
                      </div>
                    )}
                  </Dropzone>

                  {logoImg.length ? (
                    <Fragment>
                      <List>{logoImgList}</List>
                      {/* <div className='buttons'>
                        <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                        Remove
                        </Button>
                    </div> */}
                    </Fragment>
                  ) : null}
                </Fragment>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='companyAddress'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Company Address'
                        onChange={onChange}
                        error={Boolean(errors.companyAddress)}
                        multiline
                        rows={7}
                      />
                    )}
                  />
                  {errors.companyAddress && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.companyAddress.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='currency-select'>Default Currency</InputLabel>
                  <Controller
                    name='defaultCurrency'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        fullWidth
                        value={value}
                        onChange={onChange}
                        labelId='currency-select'
                        label='Default Currency'
                        error={Boolean(errors.defaultCurrency)}
                      >
                        {currencies?.map((ele, index) => {
                          return (
                            <MenuItem value={ele.id} key={index}>
                              {ele.currency} - ({ele.country})
                            </MenuItem>
                          )
                        })}
                      </Select>
                    )}
                  />
                  {errors.defaultCurrency && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.defaultCurrency.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='currency-select'>Default Timezone</InputLabel>
                  <Controller
                    name='defaultTimezone'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        fullWidth
                        value={value}
                        onChange={onChange}
                        labelId='timezone-select'
                        label='Default Timezone'
                        error={Boolean(errors.defaultTimezone)}
                      >
                        {timeZones?.map((ele2, index) => {
                          return (
                            <MenuItem value={ele2.id} key={index}>
                              {ele2.GMT}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    )}
                  />
                  {errors.defaultTimezone && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.defaultTimezone.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='currency-select'>Default Package</InputLabel>
                  <Controller
                    name='defaultPackage'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        fullWidth
                        value={value}
                        onChange={onChange}
                        labelId='package-select'
                        label='Default Package'
                        error={Boolean(errors.defaultPackage)}
                      >
                        {packages?.map((ele3, index) => {
                          return (
                            <MenuItem value={ele3.id} key={index}>
                              {ele3.name}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    )}
                  />
                  {errors.defaultPackage && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.defaultPackage.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='currency-select'>Status</InputLabel>
                  <Controller
                    name='status'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        fullWidth
                        value={value}
                        onChange={onChange}
                        labelId='status-select'
                        label='Status'
                        error={Boolean(errors.status)}
                      >
                        <MenuItem value='1'>Active</MenuItem>
                        <MenuItem value='0'>Inactive</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.status && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.status.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='language-select'>Language</InputLabel>
                  <Controller
                    name='defaultLanguage'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        fullWidth
                        value={value}
                        onChange={onChange}
                        labelId='language-select'
                        label='Language'
                        errors={Boolean(errors.defaultLanguage)}
                      >
                        {languages?.map((ele4, index) => {
                          return (
                            <MenuItem value={ele4.id} key={index}>
                              {ele4.language_name}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    )}
                  />
                  {errors.defaultLanguage && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.defaultLanguage.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {Object.keys(router.query).length === 0 ? (
                <>
                  <Grid item xs={12} sx={{ pt: 0 }}>
                    <Typography variant='h6'>Admin Account Details</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='email'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Email'
                            type='email'
                            onChange={onChange}
                            error={Boolean(errors.email)}
                          />
                        )}
                      />
                      {errors.email && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='password'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Password'
                            type='password'
                            onChange={onChange}
                            error={Boolean(errors.password)}
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
                      <Controller
                        name='fname'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='First Name'
                            onChange={onChange}
                            error={Boolean(errors.fname)}
                            aria-describedby='validation-basic-last-name'
                          />
                        )}
                      />
                      {errors.fname && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.fname.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Controller
                        name='lname'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            label='Last Name'
                            onChange={onChange}
                            error={Boolean(errors.lname)}
                            aria-describedby='validation-basic-last-name'
                          />
                        )}
                      />
                      {errors.lname && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.lname.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </>
              ) : null}
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

CompanyForm.acl = {
  action: 'create',
  subject: 'company'
}

export default CompanyForm
