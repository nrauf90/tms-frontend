// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import MuiStep from '@mui/material/Step'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Step Components
import StepLanguageSettings from 'src/views/pages/wizard-examples/property-listing/StepLanguageSettings'
import StepCurrencySettings from 'src/views/pages/wizard-examples/property-listing/StepCurrencySettings'
import StepMailSettings from 'src/views/pages/wizard-examples/property-listing/StepMailSettings'
import StepGlobalSettings from 'src/views/pages/wizard-examples/property-listing/StepGlobalSettings'
import StepSecuritySettings from 'src/views/pages/wizard-examples/property-listing/StepSecuritySettings'
import StepSocialSettings from 'src/views/pages/wizard-examples/property-listing/StepSocialSettings'
import StepStorageSettings from 'src/views/pages/wizard-examples/property-listing/StepStorageSettings'
import StepPaymentSettings from 'src/views/pages/wizard-examples/property-listing/StepPaymentSettings'

// ** Util Import

import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'

const steps = [
  {
    icon: 'material-symbols:settings-alert-outline',
    title: 'Global Settings',
  },
  {
    icon: 'ic:baseline-alternate-email',
    title: 'Email Settings'
  },
  {
    icon: 'material-symbols:lock-outline-sharp',
    title: 'Security',
  },
  {
    icon: 'ooui:language',
    title: 'Language Settings',
  },
  {
    title: 'Currency Settings',
    icon: 'ic:round-currency-pound'
  },
  {
    title: 'Payment Methods',
    icon: 'material-symbols:payments'
  },
  {
    title: 'Storage Settings',
    icon: 'mdi:storage'
  },
  {
    title: 'Profile Settings',
    icon: 'gg:profile'
  },
  {
    title: 'Social Logins',
    icon: 'bi:twitter'
  },
  {
    title: 'System Logs',
    icon: 'octicon:log-24'
  }
]

const StepperHeaderContainer = styled(CardContent)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('lg')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const Step = styled(MuiStep)(({ theme }) => ({
  '& .MuiStepLabel-root': {
    paddingTop: 0
  },
  '&:not(:last-of-type) .MuiStepLabel-root': {
    paddingBottom: theme.spacing(5)
  },
  '&:last-of-type .MuiStepLabel-root': {
    paddingBottom: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '& + svg': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed .step-title': {
    color: theme.palette.text.disabled
  },
  '& .MuiStepLabel-label': {
    cursor: 'pointer'
  }
}))

const PropertyListingWizard = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0)

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <StepGlobalSettings />
      case 1:
        return <StepMailSettings />
      case 2:
        return <StepSecuritySettings />
      case 3:
        return <StepLanguageSettings />
      case 4:
        return <StepCurrencySettings />
      case 5:
        return <StepPaymentSettings />
      case 6:
        return <StepStorageSettings />
      case 7:
        return null
      case 8:
        return <StepSocialSettings />
      case 9:
        return null
      default:
        return null
    }
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }

  const renderFooter = () => {
    const stepCondition = activeStep === steps.length - 1

  }

  return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}>
      <StepperHeaderContainer sx={{ pr: 0 }}>
        <StepperWrapper sx={{ height: '100%' }}>
          <Stepper
            connector={<></>}
            orientation='vertical'
            sx={{ height: '100%', minWidth: '15rem'}}
          >
            {steps.map((step, index) => {
              const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar

              return (
                <Step
                  key={index}
                  onClick={() => setActiveStep(index)}
                >
                  <StepLabel>
                    <div className='step-label'>
                      <RenderAvatar
                        variant='rounded'
                        {...(activeStep >= index && { skin: '' })}
                        {...(activeStep === index && { skin: 'filled' })}
                        {...(activeStep >= index && { color: 'primary' })}
                        sx={{
                          
                  
                        }}
                      >
                        <Icon icon={step.icon}/>
                      </RenderAvatar>
                      <div>
                        <Typography className='step-title'
                        
                        >
                          {step.title}
                          </Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </StepperHeaderContainer>
      <CardContent sx={{ pt: theme => `${theme.spacing(6)} !important`, width: '100%' }}>
        {renderContent()}
        {renderFooter()}
      </CardContent>
    </Card>
  )
}

export default PropertyListingWizard
