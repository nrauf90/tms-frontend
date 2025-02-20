// ** React Imports
import { Suspense, lazy, useCallback, useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import PageHeader from 'src/@core/components/page-header'
import Spinner from 'src/@core/components/simple-spinner'

// ** DataGrid lazy loading...

const DataGrids = lazy(() => import('src/core/DataGrid/DataGrids'))

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { deleteData, fetchData } from 'src/store/apps/companies'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/companies/TableHeader'

// ** renders client column
const renderClient = row => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
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

  const handleDelete = id => {
    dispatch(deleteData(id))
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
        <MenuItem
          onClick={handleRowOptionsClose}
          sx={{ '& svg': { mr: 2 } }}
          component={Link}
          href={`/forms/CompanyForm?id=${id}`}
        >
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete(id)} sx={{ '& svg': { mr: 2 } }}>
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
    minWidth: 200,
    field: 'fullName',
    headerName: 'Name',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
  },
  {
    flex: 0.2,
    field: 'email',
    minWidth: 200,
    headerName: 'Email',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.company_detail.email}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: 'Package',
    field: 'package',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.package.name}</Typography>
  },
  {
    flex: 0,
    minWidth: 100,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return row.status == 1 ? (
        <Typography sx={{ color: 'text.secondary' }}>Active</Typography>
      ) : (
        <Typography sx={{ color: 'text.secondary' }}>Inactive</Typography>
      )
    }
  },
  {
    flex: 0,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

const CompaniesTable = () => {
  // ** State
  const [value, setValue] = useState('')
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.companies)
  useEffect(() => {
    dispatch(
      fetchData({
        name: value,
        length,
        page
      })
    )
  }, [dispatch, value, length, page])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback(e => {}, [])

  const handlePlanChange = useCallback(e => {}, [])

  const handleStatusChange = useCallback(e => {}, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={
            <Typography variant='h5' sx={{ mb: 6 }}>
              Company List
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

CompaniesTable.acl = {
  action: 'read',
  subject: 'company'
}

export default CompaniesTable
