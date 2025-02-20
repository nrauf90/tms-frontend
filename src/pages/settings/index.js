// ** Demo Components Imports
import PropertyListing from 'src/views/pages/wizard-examples/property-listing'

// ** Custom Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const WizardExamples = () => {
  return (
    <DatePickerWrapper>
      <PropertyListing />
    </DatePickerWrapper>
  )
}

WizardExamples.acl = {
  action: 'read',
  subject: 'setting'
}

export default WizardExamples