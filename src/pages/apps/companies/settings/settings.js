//** React Imports
import { useState } from "react"

//** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from "@mui/material/TextField"
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'



const MultiCurrencyCheckboxLabel = () => {
    return (
        <>
        <span>Allow Multi Currency</span>
        <Chip label='Cannot be changed once saved' color='warning' size='small' />
        </>
    )
}

const BranchLabel = () => {
    return (
        <>
        <span>Enable Branch</span>
        <Chip label='Cannot be changed once saved' color='warning' size='small' sx={{ ml: '2px' }}/>
        </>
    )
}

const Settings = () => {

//**States

const [multiCurrency, setMultiCurrency] = useState(false)
const [currencyDiscription, setCurrencyDiscription] = useState('controlled-checked')
const [narration, setNarration] = useState(false)
const [reduceCost, setReduceCost] = useState(false)
const [saleDiscount, setSaleDiscount] = useState(false)
const [transactionPeriviousYear, setTransactionPeriviousYear] = useState(false)
const [showOutstandingBalanceOnSale, setShowOutstandingBalanceOnSale] = useState(false)
const [showOutstandingBalanceOnPurchase, setShowOutstandingBalanceOnPurchase] = useState(false)
const [showTransactionNumber, setShowTransactionNumber] = useState(false)
const [enableSMSService, setEnableSMSService] = useState(false)
const [copyCommentsForSale, setCopyCommentsForSale] = useState(false)
const [copyCommentsForPurchase, setCopyCommentsForPurchase] = useState(false)
const [enableBranch, setEnableBranch] = useState(false)



const handleMultiCurrency = event => {
    setMultiCurrency(event.target.checked)
}

const handleDiscription = event => {
    setCurrencyDiscription(event.target.value)
}

const handleNarration = event => {
    setNarration(event.target.checked)
}

const handleReduceCost = event => {
    setReduceCost(event.target.checked)
}

const handleSaleDiscount = event => {
    setSaleDiscount(event.target.checked)
}

const handleTransaction = event => {
    setTransactionPeriviousYear(event.target.checked)
}

const handleOutstandingBalanceOnSale = event => {
    setShowOutstandingBalanceOnSale(event.target.checked)
}

const handleOutstandingBalanceOnPurchase = event => {
    setShowOutstandingBalanceOnPurchase(event.target.checked)
}

const handleTransactionNumber = event => {
    setShowTransactionNumber(event.target.checked)
}

const handleSMSService = event => {
    setEnableSMSService(event.target.checked)
}

const handleCopyCommentsForSale = event => {
    setCopyCommentsForSale(event.target.checked)
}

const handleCopyCommentsForPurchase = event => {
    setCopyCommentsForPurchase(event.target.checked)
}

const handleEnableBranch = event => {
    setEnableBranch(event.target.checked)
}

return (
    <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
    <Card>
      <CardHeader title='Currency Settings' />
      <CardContent>
      <Grid container spacing={5}>
      <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>Home Currency</InputLabel>
        <Select
          label='Home Currency'
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>
        </Grid>
        <Grid item sx={12}>
        <FormGroup row>
            <FormControlLabel
            label={<MultiCurrencyCheckboxLabel />}
            control={<Checkbox checked={multiCurrency} onChange={handleMultiCurrency} name='controlled' />}
            />
        </FormGroup>
        </Grid>
        <Grid item xs={12}>
        <RadioGroup row aria-label='controlled' name='controlled' value={currencyDiscription} onChange={handleDiscription}>
          <FormControlLabel value='controlled-checked' control={<Radio />} label='Display Currency Symbol (Rs)' />
          <FormControlLabel value='controlled-unchecked' control={<Radio />} label='Display Currency Code (PKR)' />
        </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Typography>Decimal Place Limit (Up to 4)</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField size="small" />
        </Grid>
      </Grid>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
    <Card>
      <CardHeader title='Account Settings' />
      <CardContent>
        <Grid container spacing={5}>
        <Grid item xs={12}>
            <FormControl fullWidth>
            <InputLabel>Financial Year Start</InputLabel>
            <Select
            label='Financial Year Start'
            >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12}>
        <FormGroup row>
            <FormControlLabel
            label='Enable Narration'
            control={<Checkbox checked={narration} onChange={handleNarration} name='controlled' />}
            />
        </FormGroup>
        <FormGroup row>
            <FormControlLabel
            label='Reduce Cost on Purchase Discount (By Default)'
            control={<Checkbox checked={reduceCost} onChange={handleReduceCost} name='controlled' />}
            />
        </FormGroup>
        <FormGroup row>
            <FormControlLabel
            label='Reduce Sale on Sale Discount (By Default)'
            control={<Checkbox checked={saleDiscount} onChange={handleSaleDiscount} name='controlled' />}
            />
        </FormGroup>
        <FormGroup row>
            <FormControlLabel
            label='Allow Transaction in Perivious Fiscal Year'
            control={<Checkbox checked={transactionPeriviousYear} onChange={handleTransaction} name='controlled' />}
            />
        </FormGroup>
        </Grid>
        </Grid>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
        <Card>
        <CardHeader title='General Settings' />
        <CardContent>
        <Grid container spacing={5}>
            <Grid item xs={12}>
            <FormGroup row>
            <FormControlLabel
            label='Show Outstanding Balance at (Sale Invoice/ Return/ Receive Money/ Customer Refund PDF)'
            control={<Checkbox checked={showOutstandingBalanceOnSale} onChange={handleOutstandingBalanceOnSale} name='controlled' />}
            />
            </FormGroup>
            </Grid>
            <Grid item xs={12}>
            <FormGroup row>
            <FormControlLabel
            label='Show Outstanding Balance at (Purchase Invoice/ Return/ Make Payment/ Vendor Refund PDF)'
            control={<Checkbox checked={showOutstandingBalanceOnPurchase} onChange={handleOutstandingBalanceOnPurchase} name='controlled' />}
            />
            </FormGroup>
            </Grid>
            <Grid item xs={12}>
            <FormGroup row>
            <FormControlLabel
            label='Show Transaction Number at (Purchases/ Sales/ Accounts/ Manufacturing/ Products/ Inventory)'
            control={<Checkbox checked={showTransactionNumber} onChange={handleTransactionNumber} name='controlled' />}
            />
            </FormGroup>
            </Grid>
            <Grid item xs={12}>
            <FormGroup row>
            <FormControlLabel
            label='Enable SMS Service'
            control={<Checkbox checked={enableSMSService} onChange={handleSMSService} name='controlled' />}
            />
            </FormGroup>
            </Grid>
            <Grid item xs={12}>
            <FormGroup row>
            <FormControlLabel
            label='Enable Copy Comments at (Sales Quotation / Sales Order / Sales Delivery/ Sales Invoice / Sales Return)'
            control={<Checkbox checked={copyCommentsForSale} onChange={handleCopyCommentsForSale} name='controlled' />}
            />
            </FormGroup>
            </Grid>
            <Grid item xs={12}>
            <FormGroup row>
            <FormControlLabel
            label='Enable Copy Comments at (Purchases Order / Purchases Good Receiving / Purchases Invoice / Purchases Return)'
            control={<Checkbox checked={copyCommentsForPurchase} onChange={handleCopyCommentsForPurchase} name='controlled' />}
            />
            </FormGroup>
            </Grid>
        </Grid>
        </CardContent>
        </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
        <Card>
            <CardHeader title='Branch' />
            <CardContent>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                    <FormGroup row>
                    <FormControlLabel
                    label={<BranchLabel />}
                    control={<Checkbox checked={enableBranch} onChange={handleEnableBranch} name='controlled' />}
                    />
                    </FormGroup>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: '2%' }}>
                <Button variant='contained' color = 'success' >Linked Subscriptions</Button>
                </Grid>
            </CardContent>
        </Card>
    </Grid>
    <Grid container justifyContent="flex-end" sx={{ mt: '5%' }}>
        <Button
        color = 'success'
        variant='contained'
        type='submit'>
            Submit
        </Button>
    </Grid>
    <Grid item xs={12} sm={6}>
        <Card>
            <CardHeader title='Delete Company' />
            <CardContent>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Button variant='contained' color='error'>Delete Company</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Grid>
    </Grid>
)
}

export default Settings
