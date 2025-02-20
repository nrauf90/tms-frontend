import { Grid } from "@mui/material"
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from "react"

const StepStorageSettings = () => {

    const [showAWSSettings, setShowAWSSettings] = useState(false)
    const [selectedSettings, setSelectedSettings] = useState('')

    return (    
    <Grid container spacing = {5}>
        <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor='storage-select'>Select Storage</InputLabel>
          <Select 
          label='Select Storage' 
          labelId='storage-select' 
          aria-describedby='storage-select' 
          defaultValue=''
          value={selectedSettings}
          onChange={ 
            (e) => {
                if(e.target.value == "AWS"){
                    setShowAWSSettings(true)
                    setSelectedSettings(e.target.value)
                }
                else {
                    setShowAWSSettings(false)
                    setSelectedSettings(e.target.value)
                }}}
          >
            <MenuItem value='Local'>Local (Default)</MenuItem>
            <MenuItem value='AWS'>AWS S3 Storage (Amazon Web Services S3)</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        {
            showAWSSettings && 
            <>
            <Grid item xs={12}>
            <TextField fullWidth label='AWS Key' placeholder='' />
            </Grid>
            <Grid item xs={12}>
            <TextField fullWidth label='AWS Secret' placeholder='' type='password' />
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel htmlFor='region-select'>
                    AWS Region
                </InputLabel>
                <Select
                label='AWS Region'
                labelId='region-select'
                aria-describedby="region-select"
                defaultValue=''
                >
                    <MenuItem value='US (East)'>US East (Ohio) us-east-2 </MenuItem>
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
            <TextField fullWidth label='AWS Bucket' placeholder='' />
            </Grid>
            </>
        }
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

export default StepStorageSettings