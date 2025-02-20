// ** React Imports
import { useState, lazy, Suspense } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Settings from './settings'
import SMTP from './smtp'
import PrintingTemplates from './templates'

const Information =  lazy(() => import('./information')) 

import Spinner from 'src/@core/components/simple-spinner'

const CompanySettings = () => {
  
  // ** State

const [value, setValue] = useState('1')

const handleChange = (event, newValue) => {
  setValue(newValue)
}

  return (
    <Card>
    <CardContent>
    <TabContext value={value}>
      <TabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
        <Tab value='1' label='Information' />
        <Tab value='2' label='Settings' />
        <Tab value='3' label='SMTP' />
        <Tab value='4' label='Printing Templates' />
      </TabList>
      <TabPanel value='1'>
      <Suspense fallback={<Spinner />}>
        <Information />
      </Suspense>
      </TabPanel>
      <TabPanel value='2'>
        <Settings />
      </TabPanel>
      <TabPanel value='3'>
        <SMTP />
      </TabPanel>
      <TabPanel value='4'>
        <PrintingTemplates />
      </TabPanel>
    </TabContext>
    </CardContent>
    </Card>
  )
}

export default CompanySettings

CompanySettings.acl = {
    action: 'write',
    subject: 'company'
}
