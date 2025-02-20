// ** React & Next Imports
import { useState } from 'react'
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Filter from 'src/core/DataGrid/component/filter/Filter'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeader = props => {
  // ** Props
  const { handleFilter, value } = props

  //** States */

  const [filterTray, setFilterTray] = useState(false)

  //** Functions */
  
  const toggleFilterTray = () => setFilterTray(!filterTray)

  const applyFilters = () => {

  }

  const clearFilters = () => {

  }

  const requiredFilters = [
    {
      renderFilter: () => {
        return (
          <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Status</InputLabel>
                  <Select
                    sx={{ mb: 4 }}
                    fullWidth
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    inputProps={{ placeholder: 'Select Status' }}
                  >
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </Select>
          </FormControl>
        )
      }
    },
    {
      renderFilter: () => {
        return (
          <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    sx={{ mb: 4 }}
                    fullWidth
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </Select>
          </FormControl>
        )
      } 
    }
  ]

  const requiredButtons = [
    {
      renderButton: () => {
        return (
          <Button type='submit' onClick={applyFilters} variant='contained' sx={{ mr: 3 }}>
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
          sx={{ mr: 4 }}
          placeholder='Search User'
          onChange={e => handleFilter(e.target.value)}
        />

        <Button component={Link} href='/forms/CompanyUserForm' variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          Add New User
        </Button>
      </Box>
      <Filter open={filterTray} toggle={toggleFilterTray} filters={requiredFilters} buttons={requiredButtons}/>
    </Box>
  )
}

export default TableHeader
