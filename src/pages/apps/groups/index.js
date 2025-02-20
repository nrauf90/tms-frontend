// ** React Imports
import { useState, useEffect, useCallback, lazy, Suspense } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Spinner from 'src/@core/components/simple-spinner'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/views/apps/groups/TableHeader'

// ** Actions Imports
import { fetchData, updateGroup, deleteGroup } from 'src/store/apps/group'

// ** Lazy import of datagrid...

const DataGrids = lazy(() => import('src/core/DataGrid/DataGrids'))

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

const defaultColumns = [
  {
    flex: 0.25,
    field: 'name',
    minWidth: 240,
    headerName: 'Name',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.group_name}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 210,
    field: 'createdDate',
    headerName: 'Created Date',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.created_at.substring(0,10)} { } {row.created_at.substring(11,19)}</Typography>
  }
]

const PermissionsGroup = () => {
  // ** State
  const [value, setvalue] = useState('')
  const [groupId, setGroupId] = useState()
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.group)
  useEffect(() => {
    dispatch(
      fetchData({
        groupName: value,
        page,
        length
      })
    )
  }, [dispatch, value, page, length])

  const handleFilter = useCallback(val => {
    setvalue(val)
  }, [])

  const handleEditGroup = (name, id) => {
    setGroupId('')
    reset()
    setValue('groupName', name)
    setGroupId(id)
    setEditDialogOpen(true)
  }

  const handleDeleteGroup = (id) => {
    dispatch(deleteGroup(id))
  }

  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const onSubmit = data => {
    dispatch(updateGroup({...data, groupId}))
    setEditDialogOpen(false)
    reset()
    setGroupId('')
  }

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

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => handleEditGroup(row.group_name, row.id)}>
            <Icon icon='tabler:edit' />
          </IconButton>
          <IconButton onClick={() => handleDeleteGroup(row.id)}>
            <Icon icon='tabler:trash' />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={
              <Typography variant='h5' sx={{ mb: 6 }}>
                Groups
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} handleFilter={handleFilter} />
          <Suspense fallback={<Spinner />}>
            <DataGrids
            store={store}
            columns={columns}
            lastCount = {store.last_page}
            page={page}
            setPage={setPage}
            length={length}
            setLength={setLength}
            />
          </Suspense>
          </Card>
        </Grid>
      </Grid>
      <Dialog maxWidth='sm' fullWidth onClose={handleDialogToggle} open={editDialogOpen}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Edit Permission Group
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box component='form' sx={{ mt: 8 }} onSubmit={handleSubmit(onSubmit)}>
            <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
            <FormControl sx={{ width: '75%' }}>
            <Controller
              name='groupName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                size='small'
                label='Group Name'
                sx={{ mr: [0, 4], mb: [3, 0] }}
                placeholder='Enter Group Name'
                value={value}
                onChange={onChange}
                error={Boolean(errors.groupName)}
              />
              )}
              />
              {errors.groupName && <FormHelperText sx={{ color: 'error.main' }}>{errors.groupName.message}</FormHelperText>}
              </FormControl>
              <Button type='submit' variant='contained' sx={{ ml: '5%' }}>
                Update
              </Button>
            </FormGroup>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

PermissionsGroup.acl = {
  action: 'read',
  subject: 'permission'
}

export default PermissionsGroup
