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
import Spinner from 'src/@core/components/simple-spinner'
import PageHeader from 'src/@core/components/page-header'

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
import { fetchData, deleteUser } from 'src/store/apps/user'

// ** Third Party Components
import axios from 'axios'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import configData from '../../../../config.json'

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
  //console.log(row)
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

const RowOptions = ({ id, fname, lname, email, role, roleId }) => {
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
        <MenuItem component={Link} href={`/forms/UserForm?id=${id}`} sx={{ '& svg': { mr: 2 } }}>
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
    renderCell: ({ row }) => (
      <RowOptions
        id={row.id}
        fname={row.fname}
        lname={row.lname}
        email={row.email}
        role={row.roles[0].name}
        roleId={row.roles[0].id}
      />
    )
  }
]

const UserList = ({ apiData }) => {
  // ** State
  const [role, setRole] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [filterRoles, setFilterRoles] = useState('')
  const [statusName, setStatusName] = useState('')
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)

  const getAllRoles = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/user/role`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })

    //console.log(response)
    setFilterRoles(response?.data)
  }

  // ** Hooks
  useEffect(() => {
    getAllRoles()

    //console.log("ROLE", filterRoles)
  }, [])

  const dispatch = useDispatch()
  const store = useSelector(state => state.user)
  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        name: value,
        page,
        length
      })
    )
  }, [dispatch, role, status, value, page, length])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handleStatusChange = useCallback(e => {
    if (e.target.value == 'active') {
      setStatusName('Active')
      setStatus(1)
    } else {
      setStatusName('Inactive')
      setStatus(0)
    }
  }, [])

  const clearFilters = () => {
    setStatusName('')
    setStatus('')
    setRole('')
  }

  return (
    <Grid
      container
      spacing={6}
      sx={{
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(246, 246, 247)'
        }
      }}
    >
      <Grid item xs={12}>
        <PageHeader
          title={
            <Typography variant='h5' sx={{ mb: 6 }}>
              User List
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
              lastCount={store.last_page}
              page={page}
              setPage={setPage}
              length={length}
              setLength={setLength}
            />
          </Suspense>
        </Card>
      </Grid>
    </Grid>
  )
}

UserList.acl = {
  action: 'read',
  subject: 'user'
}

export default UserList
