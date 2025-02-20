// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import TableHeader from 'src/views/apps/languages/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'

// ** Utils Import

import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/languages'

// ** Third Party Components
import axios from 'axios'


const data = [
  {
    "id" : 1,
    "languageName" : "Arabic",
    "languageStatus" : "Active",
    "languageCode" : "AR",
  }, 
  {
    "id" : 2,
    "languageName" : "French",
    "languageStatus" : "Active",
    "languageCode" : "FR",
  }, 
  {
    "id" : 3,
    "languageName" : "Urdu",
    "languageStatus" : "Active",
    "languageCode" : "UR",
  }, 
  {
    "id" : 4,
    "languageName" : "Urdu",
    "languageStatus" : "Active",
    "languageCode" : "UR",
  }, 
  {
    "id" : 5,
    "languageName" : "Urdu",
    "languageStatus" : "Active",
    "languageCode" : "UR",
  }, 
  {
    "id" : 6,
    "languageName" : "Urdu",
    "languageStatus" : "Active",
    "languageCode" : "UR",
  }, 
  {
    "id" : 7,
    "languageName" : "Urdu",
    "languageStatus" : "Active",
    "languageCode" : "UR",
  },
  {
    "id" : 8,
    "languageName" : "Urdu",
    "languageStatus" : "Active",
    "languageCode" : "UR",
  },
  {
    "id" : 9,
    "languageName" : "Urdu",
    "languageStatus" : "Active",
    "languageCode" : "UR",
  },
  {
    "id" : 10,
    "languageName" : "Urdu",
    "languageStatus" : "Active",
    "languageCode" : "UR",
  }
]



const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns = [
  {
    flex: 0.25,
    minWidth: 280,
    field: 'languagename',
    headerName: 'Language Name',
    renderCell: ({ row }) => {
      const { fullName, email } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
              }}
            >
              {row.languageName}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'languagecode',
    minWidth: 170,
    headerName: 'Language Code',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
              }}
            >
              {row.languageCode}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return (
        <FormControlLabel control={
          <Switch defaultChecked color='success' />}
          />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

const StepLanguageSettings = () => {
  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addLanguageOpen, setAddLanguageOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.languages)
  useEffect(() => {
    dispatch(
      fetchData({
        //filters

        // role,
        // status,
        // q: value,
        // currentPlan: plan
      })
    )
  }, [dispatch, plan, role, status, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const toggleAddLanguage = () => setAddLanguageOpen(!addLanguageOpen)
  const handleClose = () => setAddLanguageOpen(false)

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card sx={{ boxShadow: 0 }}>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddLanguage}/>
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={data}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
      <Dialog
              open={addLanguageOpen}
              onClose={handleClose}
              aria-labelledby='user-view-edit'
              aria-describedby='user-view-edit-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            >
              <DialogTitle
                id='user-view-edit'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                Add Language
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                {/* <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText> */}
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                      fullWidth 
                      label='Language Name' 
                      onChange={(e) =>{
                        }}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Language Code'
                        onChange={(e) =>{

                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl style={{width: 255}}>
                  <InputLabel id='demo-simple-select-outlined-label'>Status</InputLabel>
                  <Select
                    label='Status'
                    defaultValue=''
                    id='demo-simple-select-outlined'
                    labelId='demo-simple-select-outlined-label'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value='Active' key='Active'>Active</MenuItem>
                    <MenuItem value='Inactive' key='Inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
                  </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Button variant='contained' sx={{ mr: 2 }}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
    </Grid>
  )
 
}

export default StepLanguageSettings
