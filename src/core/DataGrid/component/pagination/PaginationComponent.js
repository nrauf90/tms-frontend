import { useEffect, useState } from "react"
import { FormControl } from "@mui/material"
import Select from '@mui/material/Select'
import Pagination from '@mui/material/Pagination'
import MenuItem from '@mui/material/MenuItem'


const PaginationComponent = (props) => {

const handleChange = (event, value) => {
    props.setPage(value)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: 10 }}>Rows per page:</span>
      <FormControl variant='standard' size="small">
    <Select
      labelId="dropdown-label"
      value={props.length}
      onChange={(e) => props.setLength(e.target.value)}
      sx={{  
        fontSize: '0.8rem',
        pt: '5%',
        '& .MuiSelect-standard' : {
          paddingRight: '0!important',
        },
      }}
    >
      <MenuItem value="10">10</MenuItem>
      <MenuItem value="50">50</MenuItem>
      <MenuItem value="100">100</MenuItem>
    </Select>
    </FormControl>
      <Pagination count={props.lastCount} color='primary' page={props.page} onChange={handleChange}/>
    </div>
  )
}

export default PaginationComponent