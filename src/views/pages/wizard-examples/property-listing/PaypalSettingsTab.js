// ** React Imports
import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'
import configData from '../../../../config.json'
import toast from 'react-hot-toast'

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
    paypal_client_id: yup
    .string()
    .required('Client Key is required'),
    paypal_secret: yup
    .string()
    .required('Secret Key is required'),
    paypal_environment: yup.string()
    .required('Environment is required'),
  })
  
  const defaultValues = {
    paypal_client_id : '',
    paypal_secret: '',
    paypal_environment: ''
    }

const PaypalSettingsTab = () => {

const [checked, setChecked] = useState(false)
const [webHookSecret, setWebHookSecret] = useState()
const [updateButton, setUpdateButton] = useState(false)
const [recordId, setRecordId] = useState()

const handleChange = event => {
    setChecked(event.target.checked)
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
    
    const onSubmit = async (data) => {
        if(checked == true){
            data.status = 1
        } else {
            data.status = 0
        }

        if(updateButton == false) {
            const response = await axios.post(`${configData.SERVER_URL}/api/storePaypalInfo`, {
                paypal_client_id : data.paypal_client_id,
                paypal_secret : data.paypal_secret,
                paypal_environment : data.paypal_environment,
                status : data.status
            },
            {
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).catch(function (error){
                toast.error(response?.data?.message)
            })
            if(response?.data?.success == true){
                toast.success(response?.data?.message)
            }
            loadPaypalData()
        } else {
            const response = await axios.post(`${configData.SERVER_URL}/api/updatePaypalInfo/${recordId}`, {
                paypal_client_id : data.paypal_client_id,
                paypal_secret : data.paypal_secret,
                paypal_environment : data.paypal_environment,
                status : data.status
            },
            {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).catch(function (error){
                toast.error(response?.data?.message)
            })
            if(response?.data?.success == true){
                toast.success(response?.data?.message)
            }
            loadPaypalData()
        }
    }

    const loadPaypalData = async () => {
        const response = await axios.get(`${configData.SERVER_URL}/api/paypalInfo`, {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).catch(function (error){

        })
        setValue('paypal_client_id', response?.data?.data[0]?.paypal_client_id)
        setValue('paypal_secret', response?.data?.data[0]?.paypal_secret)
        setValue('paypal_environment', response?.data?.data[0]?.paypal_environment)
        setRecordId(response?.data?.data[0]?.id)
        if(response?.data?.data[0]?.status == 1){
            setChecked(true)
        } else {
            setChecked(false)
        }
        if(response?.data?.success == true){
            setUpdateButton(true)
            }
    }

    useEffect(() => {
        loadPaypalData()
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing = {5}>
            <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: '100%' }}>
            <Controller
            name='paypal_client_id'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
            <TextField
                fullWidth
                label='Paypal Client Id'
                error={Boolean(errors.paypal_client_id)} 
                value={value}
                onChange={onChange} 
                />
            )}
            />
            {errors.paypal_client_id && <FormHelperText sx={{ color: 'error.main' }}>{errors.paypal_client_id.message}</FormHelperText>}
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: '100%' }}>
            <Controller
            name='paypal_secret'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
            <TextField
                fullWidth
                label='Paypal Secret' 
                placeholder=''
                type='password' 
                error={Boolean(errors.paypal_secret)} 
                value={value}
                onChange={onChange}
                />
            )}
            />
            {errors.paypal_secret && <FormHelperText sx={{ color: 'error.main' }}>{errors.paypal_secret.message}</FormHelperText>}
            </FormControl>
            </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth>
            <InputLabel 
            htmlFor='environment-select'
            error={Boolean(errors.paypal_environment)}
            >
                Select Environment
            </InputLabel>
            <Controller
                name='paypal_environment'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
            <Select 
            label='Select Environment' 
            labelId='environment-select' 
            aria-describedby='environment-select' 
            value={value}
            onChange={onChange}
            error={Boolean(errors.paypal_environment)}
            >
                <MenuItem value='Sandbox'>Sandbox</MenuItem>
            </Select>
            )}
            />
            {errors.paypal_secret && <FormHelperText sx={{ color: 'error.main' }}>{errors.paypal_secret.message}</FormHelperText>}
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography sx={{fontWeight: 'bold'}}>Webhook URL</Typography>
        <Typography variant="body2">https://</Typography>
        <Typography variant="body1">(Add this call back url on your google app settings)</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography sx={{fontWeight: 'bold', mb: '3%'}}>Paypal Status</Typography>
        <FormControlLabel control={<Switch checked={checked} onChange={handleChange} color='success' />} label='' />
        </Grid>
        <Grid container justifyContent="flex-end" sx={{ mt: '5%' }}>
        { updateButton == false? (
                <Button
                color = 'success'
                variant='contained'
                type='submit'
                >
                    Submit
                </Button>
        ) : (
            <Button
                color = 'success'
                variant='contained'
                type='submit'
                >
                    Update
                </Button>
        )
        }
        </Grid>
        </Grid>
        </form>
    )
}

export default PaypalSettingsTab