// ** React & Next Imports
import { useState } from 'react'
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'
import FormControl from '@mui/material/FormControl'
import Filter from 'src/core/DataGrid/component/filter/Filter'

const TableHeader = props => {
  // ** Props
  const { value, handleFilter } = props

  // ** State
  const [filterTray, setFilterTray] = useState(false)
  const [name, setName] = useState()
  const [annualPrice, setAnnualPrice] = useState()
  const [monthlyPrice, setMonthlyPrice] = useState()
  const [employees, setEmployees] = useState()
  const [storage, setStorage] = useState()
  const [modulesName, setModulesName] = useState()

const toggleFilterTray = () => setFilterTray(!filterTray)


const applyFilters = () => {

}

const clearFilters = () => {
  setName('')
  setAnnualPrice('')
  setMonthlyPrice('')
  setEmployees('')
  setStorage('')
  setModulesName('')
}

  const requiredFilters = [
    {
      renderFilter: () => {
        return (
          <FormControl fullWidth sx={{ mb: 4 }}>
            <TextField
                  label='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
          </FormControl>
        )
      }
    },
    {
      renderFilter: () => {
        return (
          <FormControl fullWidth sx={{ mb: 4 }}>
            <TextField
                  label='Annual Price'
                  value={annualPrice}
                  onChange={(e) => setAnnualPrice(e.target.value)}
                />
          </FormControl>
        )
      }
    },
    {
      renderFilter: () => {
        return (
          <FormControl fullWidth sx={{ mb: 4 }}>
            <TextField
                  label='Monthly Price'
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(e.target.value)}
                />
          </FormControl>
        )
      }
    },
    {
      renderFilter: () => {
        return (
          <FormControl fullWidth sx={{ mb: 4 }}>
            <TextField
                  label='Employees'
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                />
          </FormControl>
        )
      }
    },
    {
      renderFilter: () => {
        return (
          <FormControl fullWidth sx={{ mb: 4 }}>
            <TextField
                  label='Storage'
                  value={storage}
                  onChange={(e) => setStorage(e.target.name)}
                />
          </FormControl>
        )
      }
    },
    {
      renderFilter: () => {
        return (
          <FormControl fullWidth sx={{ mb: 4 }}>
            <TextField
                  label='Modules'
                  value={modulesName}
                  onChange={(e) => setModulesName(e.target.name)}
                />
          </FormControl>
        )
      }
    }
  ]

  const requiredButtons = [
    {
      renderButton: () => {
        return (
          <Button type='submit' variant='contained' onClick={applyFilters} sx={{ mr: 3 }}>
          Submit
        </Button>
        )
      }
    },
    {
      renderButton: () => {
        return (
          <Button variant='outlined' onClick={clearFilters} color='secondary'>
          Clear Filters
          </Button>
        )
      }
    }
  ]

  return (
    <>
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button color='secondary' variant='outlined' startIcon={<Icon icon='tabler:upload' />} sx={{ mr:4 }}>
        Export
      </Button>
      <Button color='secondary' variant='outlined' onClick={toggleFilterTray} startIcon={<Icon icon='material-symbols:filter-alt-sharp' />}>
        Filters
      </Button>
      </Box>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          onChange={e => handleFilter(e.target.value)}
          sx={{ mr: 4 }}
          placeholder='Search Package'
        />

        <Button component={Link} href='/forms/PackageForm' variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          Add Package
        </Button>
      </Box>
    </Box>
      <Filter open={filterTray} toggle={toggleFilterTray} filters={requiredFilters} buttons={requiredButtons}/>
    </>
  )
}

export default TableHeader
