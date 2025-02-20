// ** React Imports
import { useState, useEffect, useCallback, lazy, Suspense } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import PageHeader from 'src/@core/components/page-header'
import Spinner from 'src/@core/components/simple-spinner'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteCompanyUser } from 'src/store/apps/companyuser'

// ** Third Party Components
import axios from 'axios'
import configData from '../../../config.json'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/companyUsers/TableHeader'

// Data grid component import
const DataGrids = lazy(() => import('src/core/DataGrid/DataGrids'))

// ** renders client column
const userRoleObj = {
  super_admin: { icon: 'tabler:device-laptop', color: 'secondary' },
  company_admin: { icon: 'tabler:circle-check', color: 'success' },
  seller: { icon: 'tabler:edit', color: 'info' },
  Vendor: { icon: 'tabler:chart-pie-2', color: 'primary' },
  subscriber: { icon: 'tabler:user', color: 'warning' }
}

const userStatusObj = {
  active: 'success',
  inactive: 'secondary'
}

// ** renders client column
const renderClient = row => {
  if (row.image.length) {
    return <CustomAvatar src={`${configData.SERVER_URL}/${row.image}`} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor}
        sx={{ mr: 2.5, width: 38, height: 38, fontSize: '1rem', fontWeight: 500 }}
      >
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

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
    dispatch(deleteCompanyUser(id))
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
        <MenuItem component={Link} href={`/forms/CompanyUserForm?id=${id}`} sx={{ '& svg': { mr: 2 } }}>
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
    flex: 0.15,
    minWidth: 280,
    field: 'fullName',
    headerName: 'User',
    headerClassName: 'super-app-theme--header',
    renderCell: ({ row }) => {
      const { email } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              href='/apps/user/view/userViewAccount'
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {row.fname + ' ' + row.lname}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'role',
    minWidth: 170,
    headerName: 'Role',
    headerClassName: 'super-app-theme--header',
    renderCell: ({ row }) => {
      //console.log(userRoleObj[row.roles[0].name].color)
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar
            skin='light'
            sx={{ mr: 4, width: 30, height: 30 }}
            color={userRoleObj[row?.roles[0]?.label].color || 'primary'}
          >
            <Icon icon={userRoleObj[row?.roles[0]?.label].icon} />
          </CustomAvatar>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.roles[0]?.name}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    headerClassName: 'super-app-theme--header',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.status === 1 ? 'active' : 'inactive'}
          color={userStatusObj[row.status === 1 ? 'active' : 'inactive']}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    headerClassName: 'super-app-theme--header',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

const CompanyUsers = () => {
  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.companyUsers)
  useEffect(() => {
    dispatch(
      fetchData({
        name: value,
        page,
        length
      })
    )
  }, [dispatch, value, page, length])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <PageHeader
          title={
            <Typography variant='h5' sx={{ mb: 6 }}>
              Company Users
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
              page={page}
              setPage={setPage}
              length={length}
              setLength={setLength}
              lastCount={store.last_page}
            />
          </Suspense>
        </Card>
      </Grid>
    </Grid>
  )
}

CompanyUsers.acl = {
  action: 'read',
  subject: 'companyuser'
}

export default CompanyUsers
