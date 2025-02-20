import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Filter from 'src/core/DataGrid/component/filter/Filter'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

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
              label='Method'
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
              label='Discription'
            />
          </FormControl>
        )
      }
    },
    {
      renderFilter: () => {
        return (
          <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    sx={{ mb: 4 }}
                    fullWidth
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'

                    //onChange={(e) => {
                      //if(e.target.value == "active") {
                        //setStatusName("active")
                        //setStatus(1)
                      //}
                      //else {
                       // setStatusName("inactive")
                       // setStatus(0)
                      //}
                    //}}

                    inputProps={{ placeholder: 'Select Status' }}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
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
      <Button color='secondary' variant='outlined' startIcon={<Icon icon='tabler:upload' />} sx={{ mr: 4 }}>
      </Button>
      <Button color='secondary' variant='outlined' onClick={toggleFilterTray} startIcon={<Icon icon='material-symbols:filter-alt-sharp' />}>
      </Button>
      </Box>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4 }}
          placeholder='Search Method'
          onChange={e => handleFilter(e.target.value)}
        />

        <Button onClick={toggle} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          Add New Method
        </Button>
      </Box>
      <Filter open={filterTray} toggle={toggleFilterTray} filters={requiredFilters} buttons={requiredButtons}/>
    </Box>
  )
}

export default TableHeader
