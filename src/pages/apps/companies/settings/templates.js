//** React Imports
import { useState } from "react"

//** MUI Imports
import Typography from "@mui/material/Typography"
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'


const PrintingTemplates = () => {

//** States

const [value, setValue] = useState('1')

const handleChange = (event, newValue) => {
  setValue(newValue)
}


return (
<TabContext value={value}>
    <TabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
        <Tab value='1' label='Receive Money' />
        <Tab value='2' label='Make Payment' />
        <Tab value='3' label='Other Collection' />
        <Tab value='4' label='Settings' />
    </TabList>
    <TabPanel value='1'>
        <Typography>Receive Money</Typography>
    </TabPanel>
    <TabPanel value='2'>
        <Typography>Make Payment</Typography>
    </TabPanel>
    <TabPanel value='3'>
        <Typography>Other Collection</Typography>
    </TabPanel>
    <TabPanel value='4'>
        <Typography>Settings</Typography>
    </TabPanel>
</TabContext>
)
}

export default PrintingTemplates