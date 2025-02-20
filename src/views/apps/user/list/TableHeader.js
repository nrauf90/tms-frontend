// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Filter from 'src/core/DataGrid/component/filter/Filter'
import axios from 'axios'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Link from 'next/link'
import configData from '../../../../config.json'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Reducer Import
import { fetchData } from 'src/store/apps/user'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeader = props => {
  // ** Props
  const { handleFilter, toggle, value } = props

  // ** States

  const [filterTray, setFilterTray] = useState(false)
  const [status, setStatus] = useState('')
  const [statusName, setStatusName] = useState('')
  const [role, setRole] = useState('')
  const [filterRoles, setFilterRoles] = useState('')
  const [generalSearch, setGeneralSearch] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      fetchData({
        name: generalSearch
      })
    )
  }, [dispatch, generalSearch])

  const applyFilters = () => {
    setGeneralSearch('')
    setTimeout(function (){
      dispatch(fetchData({
        role,
        status
      })
      )
    }, 1000)
  }

  const clearFilters = () => {
    setRole('')
    setStatus('')
    setStatusName('')
      dispatch(
        fetchData({
          role: '',
          status: '',
          name: ''
        })
      )
  }



  const getAllRoles = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/user/role`, {
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
      }
    })

    //console.log(response)
    setFilterRoles(response?.data)
  }

  useEffect(() => {
    getAllRoles()
  }, [])

  const toggleFilterTray = () => setFilterTray(!filterTray)

  const requiredFilters = [
    {
      renderFilter: () => {
        return (
          <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    sx={{ mb: 4 }}
                    fullWidth
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    {filterRoles?.data?.map((role, index) => {
                      return (
                      <MenuItem value={role.id} key={index}>{role.name}</MenuItem>
                      )})
                    }
                  </Select>
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
                    value={statusName}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={(e) => {
                      if(e.target.value == "active") {
                        setStatusName("active")
                        setStatus(1)
                      }
                      else {
                        setStatusName("inactive")
                        setStatus(0)
                      }
                    }}
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
        <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={applyFilters}>
          Submit
        </Button>
        )
      }
    },
    {
      renderButton: () => {
        return (
        <Button variant='outlined' color='secondary' onClick={clearFilters}>
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
      <Button color='secondary' onClick={toggleFilterTray} variant='outlined' startIcon={<Icon icon='material-symbols:filter-alt-sharp' />}>
        Filters
      </Button>
      </Box>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={generalSearch}
          sx={{ mr: 4 }}
          placeholder='Search User'
          onChange={(e) => setGeneralSearch(e.target.value)}
        />

        <Button component={Link} href='/forms/UserForm' variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          Add New User
        </Button>
      </Box>
    </Box>
    <Filter open={filterTray} toggle={toggleFilterTray} filters={requiredFilters} buttons={requiredButtons}/>
    </>
  )
}

export default TableHeader
