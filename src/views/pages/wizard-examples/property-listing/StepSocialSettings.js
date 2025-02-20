// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'

const StepSocialSettings = () => {

    return (
        <Grid container spacing={5}>
            <Grid item xs={12} sx={{mb: '2%'}}>
            <Typography sx={{ fontWeight: 'bold', color: 'lightgreen' }} variant="h5">Google</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField fullWidth label='Google Client ID' />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField fullWidth label='Google Client Secret' type='password' />
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography sx={{fontWeight: 'bold', mb: '3%'}}>Status</Typography>
            <FormControlLabel control={<Switch defaultChecked color='success' />} label='' />
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography sx={{fontWeight: 'bold', mb: '3%'}}>Callback</Typography>
            <Typography variant="body2">https://</Typography>
            <Typography variant="body1">(Add this call back url on your google app settings)</Typography>
            </Grid>

            <Grid item xs={12} sx={{mb: '2%'}}>
            <Typography sx={{ fontWeight: 'bold', color: 'lightpink' }} variant="h5">Facebook</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField fullWidth label='Facebook App ID' />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField fullWidth label='Facebook App Secret' type='password' />
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography sx={{fontWeight: 'bold', mb: '3%'}}>Status</Typography>
            <FormControlLabel control={<Switch defaultChecked color='success' />} label='' />
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography sx={{fontWeight: 'bold', mb: '3%'}}>Callback</Typography>
            <Typography variant="body2">https://</Typography>
            <Typography variant="body1">(Add this call back url on your facebook app settings)</Typography>
            </Grid>

            <Grid item xs={12} sx={{mb: '2%'}}>
            <Typography sx={{ fontWeight: 'bold', color: 'lightsalmon' }} variant="h5">Linked In</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField fullWidth label='Linkedin Client ID' />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField fullWidth label='Linkedin Client Secret' type='password' />
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography sx={{fontWeight: 'bold', mb: '3%'}}>Status</Typography>
            <FormControlLabel control={<Switch defaultChecked color='success' />} label='' />
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography sx={{fontWeight: 'bold', mb: '3%'}}>Callback</Typography>
            <Typography variant="body2">https://</Typography>
            <Typography variant="body1">(Add this call back url on your linkedin app settings)</Typography>
            </Grid>

            <Grid item xs={12} sx={{mb: '2%'}}>
            <Typography sx={{ fontWeight: 'bold', color: 'lightblue' }} variant="h5">Twitter</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField fullWidth label='Twitter API Key' />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField fullWidth label='Twitter API Secret Key' type='password' />
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography sx={{fontWeight: 'bold', mb: '3%'}}>Status</Typography>
            <FormControlLabel control={<Switch defaultChecked color='success' />} label='' />
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography sx={{fontWeight: 'bold', mb: '3%'}}>Callback</Typography>
            <Typography variant="body2">https://</Typography>
            <Typography variant="body1">(Add this call back url on your twitter app settings)</Typography>
            </Grid>

            <Grid container justifyContent="flex-end" sx={{ mt: '5%' }}>
            <Button
            color = 'success'
            variant='contained'
            >
                Submit
            </Button>
            </Grid>
        </Grid>
    )
}

export default StepSocialSettings