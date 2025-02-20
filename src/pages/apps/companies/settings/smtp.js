//** React Imports
import { useState, useEffect } from "react"

//** MUI Imports
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from "@mui/material/TextField"
import Checkbox from '@mui/material/Checkbox'
import Button from "@mui/material/Button"


const SMTP = () => {

//** States
const [ownAddress, setOwnAddress] = useState(false)
const [enableSSL, setEnableSSL] = useState(false)

const handleOwnAddress = event => {
    setOwnAddress(!ownAddress)
}

const handleEnableSSL = event => {
    setEnableSSL(!enableSSL)
}


return (
<Grid container spacing={5}>
    <Grid item xs={12}>
        <FormGroup row>
        <FormControlLabel
        label='Use own address for emails'
        control={<Checkbox checked={ownAddress} onChange={handleOwnAddress} name='controlled' />}
        />
        </FormGroup>
    </Grid>
    {ownAddress == true? (
        <>
    <Grid item xs={12} sm={6}>
        <TextField
        fullWidth
        label='Sender Name'
        />
    </Grid>
    <Grid item xs={12} sm={6}>
        <TextField
        fullWidth
        label='From Email Address'
        type="email"
        />
    </Grid>
    <Grid item xs={12} sm={6}>
        <TextField
        fullWidth
        label='Reply-To-Email Address'
        />
    </Grid>
    <Grid item xs={12} sm={6}>
        <TextField
        fullWidth
        label='Host'
        />
    </Grid>
    <Grid item xs={12} sm={6}>
        <TextField
        fullWidth
        label='Port'
        />
    </Grid>
    <Grid item xs={12} sm={6}>
        <TextField
        fullWidth
        label='SMTP Username'
        />
    </Grid>
    <Grid item xs={12}>
        <TextField
        fullWidth
        label='SMTP Password'
        />
    </Grid>
    <Grid item xs={12}>
    <FormGroup row>
        <FormControlLabel
        label='Enable SSL'
        control={<Checkbox checked={enableSSL} onChange={handleEnableSSL} name='controlled' />}
        />
        </FormGroup>
    </Grid>
    <Grid container justifyContent="flex-end" sx={{ mt: '2%' }}>
    <Button
        color = 'info'
        variant='contained'
        type='submit'
        sx={{ mr: '2%' }}
        >
            Test
        </Button>
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
)
}

export default SMTP