// ** React Imports
import { useState, useEffect, useCallback, Suspense, lazy } from 'react'
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Spinner from 'src/@core/components/simple-spinner'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import TableHeader from 'src/views/apps/permissions/TableHeader'

// ** Actions Imports
import { fetchData, deletePermission } from 'src/store/apps/permissions'

// ** Data Gird lazy loading..

const DataGrids = lazy(() => import('src/core/DataGrid/DataGrids'))

const colors = {
  support: 'info',
  users: 'success',
  manager: 'warning',
  administrator: 'primary',
  'restricted-user': 'error'
}

const defaultColumns = [
  {
    flex: 0.25,
    field: 'name',
    minWidth: 240,
    headerName: 'Name',
    headerClassName: 'super-app-theme--header',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 210,
    field: 'createdDate',
    headerName: 'Created Date',
    headerClassName: 'super-app-theme--header',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.created_at.substring(0,10)} { } {row.created_at.substring(11,19)}</Typography>
  }
]

const PermissionsTable = () => {
  // ** State
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.permissions)


  useEffect(() => {
    dispatch(
      fetchData({
        permissionName: searchValue,
        page,
        length
      })
    )
  }, [dispatch, searchValue, page, length])

  const handleFilter = useCallback(val => {
    setSearchValue(val)
  }, [])

  function handledeletePermission (id) {
    dispatch(deletePermission({id}))
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      headerClassName: 'super-app-theme--header',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={Link} href={`/forms/PermissionForm?id=${row.id}`}>
            <Icon icon='tabler:edit' />
          </IconButton>
          <IconButton onClick={() => handledeletePermission(row.id)}>
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
                Permissions List
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12} sx={{ '& .super-app-theme--header': {
      backgroundColor: 'rgba(246, 246, 247)',
    } }}>
          <Card>
            <TableHeader value={searchValue} handleFilter={handleFilter} />
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
    </>
  )
}

PermissionsTable.acl = {
  action: 'read',
  subject: 'permission'
}

export default PermissionsTable
