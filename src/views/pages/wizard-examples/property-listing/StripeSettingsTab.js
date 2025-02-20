// ** React Imports
import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
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
    publishable_key: yup
    .string()
    .required('Publishable Key is required'),
    secret_key: yup
    .string()
    .required('Secret Key is required'),
    webhook_secret: yup.string()
    .required('Webhook Secret is required'),
  })
  
  const defaultValues = {
    publishable_key : '',
    secret_key: '',
    webhook_secret: ''
    }
  

const StripeSettingsTab = () => {

    //** States
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
        //data.status = checked
        if(checked == true){
            data.status = 1
        } else {
            data.status = 0 
        }
        if(updateButton == false){
        const response = await axios.post(`${configData.SERVER_URL}/api/storeStripeInfo`, {
            publishable_key : data.publishable_key,
            secret_key : data.secret_key,
            webhook_secret : data.webhook_secret,
            status : data.status
        },
        {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).catch(function(error){
            toast.error(response?.data?.message)
        })
        if(response?.data?.success == true){
            toast.success(response?.data?.message)
        }
        loadStripeData()
        } 
        else {
            const response = await axios.post(`${configData.SERVER_URL}/api/updateStripeInfo/${recordId}`, {
                publishable_key : data.publishable_key,
                secret_key : data.secret_key,
                webhook_secret : data.webhook_secret,
                status : data.status
            },
            {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                }
            }).catch(function(error){
                toast.error(response?.data?.message)
            })
            if(response?.data?.success == true){
                toast.success(response?.data?.message)
            }
            loadStripeData()
        }
      }

    const loadStripeData = async () => {
        const response = await axios.get(`${configData.SERVER_URL}/api/stripeInfo`, {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).catch(function (error){

        })
        setValue('publishable_key', response?.data?.data[0]?.publishable_key)
        setValue('secret_key', response?.data?.data[0]?.secret_key)
        setValue('webhook_secret', response?.data?.data[0]?.webhook_secret)
        setWebHookSecret(response?.data?.data[0]?.webhook_secret)
        setRecordId(response?.data?.data[0]?.id)
        if(response?.data?.success == true){
        setUpdateButton(true)
        }
        if(response?.data?.data[0]?.status == 1){
            setChecked(true)
        } else {
            setChecked(false)
        }
    }

    useEffect(() => {
    loadStripeData()
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing = {5}>
            <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: '100%' }}>
            <Controller
            name='publishable_key'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
            <TextField 
            fullWidth label='Publishable Key' 
            placeholder=''
            error={Boolean(errors.publishable_key)} 
            value={value}
            onChange={onChange}
            />
            )}
            />
            {errors.publishable_key && <FormHelperText sx={{ color: 'error.main' }}>{errors.publishable_key.message}</FormHelperText>}
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: '100%' }}>
            <Controller
            name='secret_key'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
            <TextField
             fullWidth label='Stripe Secret'
            placeholder='' 
            type='password' 
            error={Boolean(errors.secret_key)} 
            value={value}
            onChange={onChange}
            />
            )}
            />
                {errors.secret_key && <FormHelperText sx={{ color: 'error.main' }}>{errors.secret_key.message}</FormHelperText>}
            </FormControl>
            </Grid>
        <Grid item xs={12}>
        <FormControl sx={{ width: '100%' }}>
            <Controller
            name='webhook_secret'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
            <TextField
                fullWidth
                label='Stripe Webhook Secret'
                error={Boolean(errors.webhook_secret)} 
                value={value}
                onChange={onChange}
              />
            )}
            />
            {errors.webhook_secret && <FormHelperText sx={{ color: 'error.main' }}>{errors.webhook_secret.message}</FormHelperText>}
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography sx={{fontWeight: 'bold'}}>Webhook URL</Typography>
        <Typography variant="body2">https://{webHookSecret}</Typography>
        <Typography variant="body1">(Add this call back url on your google app settings)</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography sx={{fontWeight: 'bold', mb: '3%'}}>Stripe Status</Typography>
        <FormControlLabel control={<Switch checked={checked} onChange={handleChange} color='success' />} label='' />
        </Grid>
        <Grid container justifyContent="flex-end" sx={{ mt: '5%' }}>
            { updateButton == false? (
                <Button type='submit' variant='contained' color='success'>
                    Submit
                </Button>
                ) : (
                <Button type='submit' variant='contained' color='success'>
                    Update
                </Button>
                )}
        </Grid>
        </Grid>
        </form>
    )
}

export default StripeSettingsTab