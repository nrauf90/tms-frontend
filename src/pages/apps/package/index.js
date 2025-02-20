// ** React & Next Imports
import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
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
import TableHeader from 'src/views/apps/packages/TableHeader'

// ** Actions Imports
import { fetchData, deletePackage } from 'src/store/apps/packages'

// ** DataGrids lazy load...

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
    minWidth: 170,
    headerName: 'Name',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
  },
  {
    flex: 0.35,
    minWidth: 150,
    field: 'annualPrice',
    headerName: 'Annual Price ($)',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.annual_price}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 155,
    field: 'monthlyPrice',
    headerName: 'Monthly Price ($)',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.monthly_price}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 105,
    field: 'employees',
    headerName: 'Employees',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.employees}</Typography>
  },
  {
    flex: 0,
    minWidth: 80,
    field: 'storage',
    headerName: 'Storage',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.storage}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 210,
    field: 'modules', 
    headerName: 'Modules',
    cellClassName: 'modules-class',
    sx: {
      '&.modules-class': {
        display: 'block',
        overflow: 'auto'
      },
    },
    renderCell: ({ row }) =>{
      return row.modules.map((item, index) => {
        return (
          <>
        <Typography display="block"  sx={{ color: 'text.secondary' }} key={index}>{item.name}</Typography>
        </>
        )
      })
    }
  }
]

const PackagesTable = () => {
  // ** State
  const [value, setValue] = useState('')
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.packages)
  useEffect(() => {
    dispatch(
      fetchData({
        packageName: value,
        page,
        length
      })
    )
  }, [dispatch, value, page, length])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleDeletePackage = (id) => {
    dispatch(deletePackage(id))
  }

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
          <IconButton component={Link} href={`/forms/PackageForm?id=${row.id}`}>
            <Icon icon='tabler:edit' />
          </IconButton>
          <IconButton onClick={() => handleDeletePackage(row.id)}>
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
                Packages
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

    </>
  )
}

PackagesTable.acl = {
  action: 'read',
  subject: 'package'
}

export default PackagesTable

