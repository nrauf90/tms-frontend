// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'



const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))


const Filter = (props) => {
  // ** Props
  const { open, toggle, filters, buttons } = props

  const handleClose = () => {
    toggle()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Filters</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{ borderRadius: 1, color: 'text.primary', backgroundColor: 'action.selected' }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>

                {filters.map((ele, index) => {
                  return (
                    ele.renderFilter()
                  )
                })
                }

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {buttons.map((ele2, index) => {
            return (
              ele2.renderButton()
            )
          })
          }
          </Box>
      </Box>
    </Drawer>
  )
}

export default Filter
