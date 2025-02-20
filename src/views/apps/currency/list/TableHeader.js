import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Filter from 'src/core/DataGrid/component/filter/Filter'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeader = props => {
  // ** Props
  const { handleFilter, toggle, value } = props

  //** States */
  const [filterTray, setFilterTray] = useState(false)


  const toggleFilterTray = () => setFilterTray(!filterTray)

  const applyFilters = () => {

  }

  const clearFilters = () => {

  }

  const requiredFilters = [
    {
      renderFilter: () => {
        return (
          <FormControl fullWidth sx={{ mb: 4 }}>
            <TextField
              label='Name'
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
              label='Symbol'
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
                  label='Position'
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
                  label='Exchange Rate'
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
      </Button>
      <Button color='secondary' variant='outlined' onClick={toggleFilterTray} startIcon={<Icon icon='material-symbols:filter-alt-sharp' />}>
      </Button>
      </Box>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4 }}
          placeholder='Search Currency'
          onChange={e => handleFilter(e.target.value)}
        />

        <Button onClick={toggle} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          Add New Currency
        </Button>
      </Box>
      <Filter open={filterTray} toggle={toggleFilterTray} filters={requiredFilters} buttons={requiredButtons}/>
    </Box>
  )
}

export default TableHeader
