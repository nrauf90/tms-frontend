//**  React Imports 
import { useState, Fragment, useEffect } from 'react'

//** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dropzone from 'react-dropzone'
import List from '@mui/material/List'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import ListItem from '@mui/material/ListItem'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'

//** Third Party Imports

import configData from '../../../../config.json'
import axios from 'axios'
import toast from 'react-hot-toast'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
      return `${field} field is required`
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`
    } else {
      return ''
    }
  }

const defaultValues = {
    companyName: '',
    organizationType: '',
    slug: '',
    address1: '',
    address2: '',
    country: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    contactPerson: '',
    phone: '',
    fax: '',
    ntn: '',
    cnic: ''
}

const schema = yup.object().shape({
  companyName: yup.string().typeError('Company Name is required')
  .min(6, obj => showErrors('Company Name', obj.value.length, obj.min))
  .matches(/^[A-Za-z\s]+$/, 'Company Name must only contain letters')
  .required('Company Name field is required'),
  organizationType : yup.string().typeError('Organization Type is required')
  .min(5, obj => showErrors('Organization Type', obj.value.length, obj.min))
  .matches(/^[A-Za-z\s]+$/, 'Organization Type must only contain letters')
  .required('Organization field is required'),
  slug: yup.string().typeError('Slug is required')
  .min(4, obj => showErrors('Slug', obj.value.length, obj.min))
  .required('Slug is required'),
  address1: yup.string().typeError('Address Line 1 is required')
  .min(5, obj => showErrors('Address Line 1', obj.value.length, obj.min))
  .required('Address Line 1 is required'),
  email: yup.string().email('Invalid Email Address')
  .required('Email field is required'),
  phone: yup.string()
  .matches(/^\+\d{1,3}\d{3}\d{3}\d{4}$/, 'Invalid phone number')
  .required('Phone Number field is required'),

})

const Img = styled('img')(({ theme }) => ({
    width: 48,
    height: 48,
    marginBottom: theme.spacing(8.5)
}))

const Information = ()  => {

//** States
const [logoImg, setLogoImg] = useState([])
const [countries, setCountries] = useState()
const [showContent, setShowContent] = useState()
const [Id, setId] = useState()

//**  Hooks
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

const loadCountries = async () => {
  const response = await axios.get(`${configData.SERVER_URL}/api/countries`, {
    headers: {
    'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  })
  setCountries(response?.data?.data)
}

const loadInformation = async () => {
  const response = await axios.get(`${configData.SERVER_URL}/api/showCompany`, {
    headers : {
      'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  })
  setValue('companyName', response?.data?.data[0]?.name)
  setValue('organizationType', response?.data?.data[0]?.company_detail?.organzation_type)
  setValue('slug', response?.data.data[0]?.company_detail?.slug)
  setValue('address1', response?.data?.data[0]?.company_detail?.address_line_1)
  setValue('address2', response?.data.data[0]?.company_detail?.address_line_2)
  setValue('country', response?.data?.data[0]?.company_detail?.country_id)
  setValue('city', response?.data?.data[0]?.company_detail?.city)
  setValue('state', response?.data?.data[0]?.company_detail?.state)
  setValue('zip', response?.data?.data[0]?.company_detail?.zip)
  setValue('email', response?.data?.data[0]?.company_detail?.email)
  setValue('contactPerson', response?.data?.data[0]?.company_detail?.contact_person)
  setValue('phone', response?.data?.data[0]?.company_detail?.phone)
  setValue('fax', response?.data?.data[0]?.company_detail?.fax)
  setValue('ntn', response?.data?.data[0]?.company_detail?.ntn)
  setValue('cnic', response?.data?.data[0]?.company_detail?.cnic)
  setId(response?.data?.data[0]?.id)
  setShowContent(1)

}

useEffect(() => {
  loadCountries()
  loadInformation()
}, [])

const onSubmit = async (data) => {
  const response = await axios.post(`${configData.SERVER_URL}/api/updateCompany/${Id}`, {
    companyName: data.companyName,
    address1: data.address1,
    address2: data.address2,
    city: data.city,
    cnic: data.cnic,
    email: data.email,
    fax: data.fax,
    ntn: data.ntn,
    organizationType: data.organizationType,
    phone: data.phone,
    slug: data.slug,
    state: data.state,
    zip: data.zip,
    country: data.country,
    contactPerson: data.contactPerson
  },
  {
    headers: {
      'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).catch(function (error){
    toast.error('Failed to update information')
  })
  if(response?.data?.success == true){
    toast.success(response?.data?.message)
  }
  loadInformation()
}

return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={5}>
    {showContent === 1? (
      <>
    <Grid item xs={12} md={6}>
                <Typography sx={{fontWeight: 'bold'}}>Logo</Typography>
                    <Fragment>
                    <Dropzone onDrop={ (acceptedFiles) => {
                    setLogoImg(acceptedFiles.map(file => Object.assign(file)))
                    }}>
                {({getRootProps, getInputProps}) => (
                    <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
                        <Typography sx={{ mb: 2.5}}>
                            Drop file here or click to upload.
                        </Typography>
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
                      multiline
                      rows={7}
                    />
                  )}
                />
                {errors.companyName && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.companyName.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='organizationType'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Type of Organization'
                      onChange={onChange}
                      error={Boolean(errors.organzationType)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.organzationType && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.organizationType.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
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
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.slug && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.slug.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='address1'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Address Line 1'
                      onChange={onChange}
                      error={Boolean(errors.address1)}
                      multiline
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.address1 && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.address1.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='address2'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Address Line 2'
                      onChange={onChange}
                      error={Boolean(errors.address2)}
                      aria-describedby='validation-basic-last-name'
                      multiline
                    />
                  )}
                />
                {errors.address2 && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.address2.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
              <InputLabel id='country-select'>Country</InputLabel>
                <Controller
                  name='country'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                        fullWidth
                        value={value}
                        onChange={onChange}
                        labelId='country-select'
                        label='Country'
                        error={Boolean(errors.country)}
                    >
                    {countries?.map((ele, index) => {
                      return (
                        <MenuItem value={ele.id} key={index}>{ele.nice_name}</MenuItem>
                      )
                    })
                    }
                    </Select>
                  )}
                />
                {errors.country && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.country.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='city'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='City'
                      onChange={onChange}
                      error={Boolean(errors.city)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.city && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.city.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='state'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='State'
                      onChange={onChange}
                      error={Boolean(errors.state)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.state && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.state.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='zip'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Zip'
                      onChange={onChange}
                      error={Boolean(errors.zip)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.zip && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.zip.message}
                  </FormHelperText>
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
                      value={value}
                      label='Email'
                      type='email'
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='contactPerson'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Contact Person'
                      onChange={onChange}
                      error={Boolean(errors.contactPerson)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.contactPerson && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.contactPerson.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='phone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Phone'
                      onChange={onChange}
                      error={Boolean(errors.phone)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.phone && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.phone.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='fax'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Fax'
                      onChange={onChange}
                      error={Boolean(errors.fax)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.fax && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.fax.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='ntn'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='NTN'
                      onChange={onChange}
                      error={Boolean(errors.ntn)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.ntn && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.ntn.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='cnic'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='CNIC'
                      onChange={onChange}
                      error={Boolean(errors.cnic)}
                      aria-describedby='validation-basic-last-name'
                    />
                  )}
                />
                {errors.cnic && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.cnic.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid container justifyContent="flex-end" sx={{ mt: '5%' }}>
            <Button
            color = 'success'
            variant='contained'
            type='submit'
            >
              Submit
            </Button>
            </Grid>
          </>
      ) : (
        null
      )}
    </Grid>
    </form>
)
}

export default Information