// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import { useDispatch } from 'react-redux'
import { addGroup } from 'src/store/apps/group'

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
  groupName : yup.string().matches(/^[A-Za-z\s]+$/, 'Group Name must contain only letters and spaces')
  .min(4, obj => showErrors('Group', obj.value.length, obj.min))
  .required('Group Name is required')
})

const defaultValues = {
  groupName : '',
}

const TableHeader = props => {
  // ** Props
  const { value, handleFilter } = props

  // ** State
  const [open, setOpen] = useState(false)

  // ** Hooks
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

  const dispatch = useDispatch()

  const handleDialogToggle = () =>{
    reset()
    setOpen(!open)
  }

  const onSubmit = data => {
    dispatch(addGroup({...data}))
    reset()
    setOpen(false)
  }

  return (
    <>
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search Group'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 2 }} variant='contained' onClick={handleDialogToggle}>
          Add Group
        </Button>
      </Box>
      <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Add New Group
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              mt: 4,
              mx: 'auto',
              width: '100%',
              maxWidth: 360,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <FormControl sx={{ width: '100%' }}>
            <Controller
              name='groupName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
            <TextField
              fullWidth
              sx={{ mb: 1 }}
              label='Group Name'
              placeholder='Enter Group Name'
              value={value}
              onChange={onChange}
              error={Boolean(errors.groupName)}
             />
              )}
            />
            {errors.groupName && <FormHelperText sx={{ color: 'error.main' }}>{errors.groupName.message}</FormHelperText>}
            </FormControl>
            <Box className='demo-space-x' sx={{ '& > :last-child': { mr: '0 !important' } }}>
              <Button size='large' type='submit' variant='contained'>
                Create Group
              </Button>
              <Button type='reset' size='large' variant='outlined' color='secondary' onClick={handleDialogToggle}>
                Discard
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TableHeader
