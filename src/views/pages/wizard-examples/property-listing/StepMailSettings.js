// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
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
import FormControlLabel from '@mui/material/FormControlLabel'



const StepMailSettings = () => {
  const [mailDriver, setMailDriver] = useState('controlled-checked')

  const handleMailDriverCheck = event => {
    setMailDriver(event.target.value)
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
        <Typography>Mail Driver</Typography>
                  <RadioGroup row aria-label='controlled' name='controlled' value={mailDriver} onChange={handleMailDriverCheck}>
                      <FormControlLabel value='controlled-unchecked' control={<Radio />} label='Mail' />
                      <FormControlLabel value='controlled-checked' control={<Radio />} label='SMTP' />
                  </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        {/* <FormControl fullWidth>
          <TextField type='number' label='Zip Code' placeholder='99950' aria-describedby='validation-zip-code' />
        </FormControl> */}
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label='Mail Host' placeholder='smtp.gmail.com' />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label='Mail Port' placeholder='8080' />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label='Mail Username' type='email' placeholder='someone@example.com' />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label='Mail Password' type='password' placeholder='Enter Password' />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor='country-select'>Mail Encryption</InputLabel>
          <Select label='Mail Encryption' labelId='mail-select' aria-describedby='mail-select' defaultValue=''>
            <MenuItem value='TLS'>TLS</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label='Mail From Name' placeholder='Email Name' />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label='Mail From Email' placeholder='from@email.com' />
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

export default StepMailSettings
