// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { styled, useTheme } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip';
import Dropzone from 'react-dropzone'; 

// ** Icon Imports

import Icon from 'src/@core/components/icon'

// ** Third Party Components

import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

//** Third Party Imports
import axios from 'axios'
import configData from '../../../../config.json'


const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginBottom: theme.spacing(8.5)
}))


const StepGlobalSettings = () => {

  // ** States
  const [logoImg, setLogoImg] = useState([]);
  const [favIconImg, setFavIconImg] = useState([]);
  const [currency, setCurrency] = useState()
  const [selectedCurrency, setSelectedCurrency] = useState()
  const [timeZone, setTimeZone] = useState()
  const [selectedTimeZone, setSelectedTimeZone] = useState()
  const [languages, setLanguages] = useState()
  const [selectedLanguage, setSelectedLanguage] = useState()
  const [weekDays, setWeekDays] = useState()
  const [selectedDay, setSelectedDay] = useState()

  // ** Hook
  const theme = useTheme()

  // const { getRootProps, getInputProps } = useDropzone({
  //   maxFiles: 1,
  //   maxSize: 2000000,
  //   accept: {
  //     'image/*': ['.png', '.jpg', '.jpeg', '.gif']
  //   },
  //   onDrop: acceptedFiles => {
  //     setLogoImg(acceptedFiles.map(file => Object.assign(file)))
  //   },
  //   onDropRejected: () => {
  //     toast.error('You can only upload 1 file & maximum size of 2 MB.', {
  //       duration: 2000
  //     })
  //   }
  // })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = logoImg
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setLogoImg([...filtered])
  }

  const logoImgList = logoImg.map(file => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const favIconImgList = favIconImg.map(file => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setLogoImg([])
  }

  const getAllCurrencies = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/allCurrencies`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    setCurrency(response.data.data)
  }

  const getAllTimeZones = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/timezones`, {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    setTimeZone(response.data.data)
  }

  const getAllLanguages = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/languages`, {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
      }
    })

    //console.log(response)

    setLanguages(response.data.data)
  }

  const getAllDays = async () => {
    const response = await axios.get(`${configData.SERVER_URL}/api/days`, {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    setWeekDays(response.data.data)
  }

  useEffect(() => {
    getAllCurrencies()
    getAllTimeZones()
    getAllLanguages()
    getAllDays()
  }, [])



  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <TextField label='Company Name' placeholder='Worksuite SaaS' />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <TextField label='Company Email' placeholder='company@email.com' />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label='Company Phone' placeholder='+929999991999' />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label='Company Website'
          placeholder='www.domain.com'
        />
      </Grid>
      <Grid item xs={12} md={6}>
      <FormControl fullWidth>
          <InputLabel htmlFor='currency-select'>Currency</InputLabel>
          <Select label='Currency'
           labelId='currency-select' 
           aria-describedby='currency-select' 
           value={selectedCurrency}
           onChange={(e) => setSelectedCurrency(e.target.value)}
           defaultValue=''>
            {currency?.map((item, index) => {
              return (
              <MenuItem value={item.id} key={index}>{item.currency} {item.country}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
      <FormControl fullWidth>
          <InputLabel htmlFor='timezone-select'>Default Timezone</InputLabel>
          <Select label='Default Timezone'
          labelId='time-zone-select'
          aria-describedby='time-zone-select'
          value={selectedTimeZone}
          onChange={(e) => setSelectedTimeZone(e.target.value)}
          defaultValue=''>
            {timeZone?.map((item, index) => {
              return (
                <MenuItem value={item.id} key={index}>{item.time_zone} {item.GMT}</MenuItem>
              )
            })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
      <FormControl fullWidth>
          <InputLabel htmlFor='language-select'>Change Language</InputLabel>
          <Select 
          label='Change Language'
          labelId='language-select'
          aria-describedby='language-select'
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          defaultValue=''>
            {languages?.map((item, index) => {
              return (
                <MenuItem value={item.id} key={index}>{item.language_name}</MenuItem>
              )
            })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography sx={{fontWeight: 'bold'}}>Logo Image</Typography>
      <Fragment>
      <Dropzone onDrop={ (acceptedFiles) => {
       setLogoImg(acceptedFiles.map(file => Object.assign(file)))
     }}>
  {({getRootProps, getInputProps}) => (
     <div {...getRootProps({ className: 'dropzone' })}>
   <input {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
          <Typography sx={{ mb: 2.5}}>
            Drop file here or click to upload.
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
          <Typography sx={{ color: 'text.secondary' }}>Max size of 2 MB</Typography>
        </Box>
    </div>
  )}
</Dropzone>
    
      {logoImg.length ? (
        <Fragment>
          <List>{logoImgList}</List>
          {/* <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove
            </Button>
          </div> */}
        </Fragment>
      ) : null}
    </Fragment>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography sx={{fontWeight: 'bold'}}>Favicon Image</Typography>
      <Fragment>
      <Dropzone onDrop={ (acceptedFiles) => {
       setFavIconImg(acceptedFiles.map(file => Object.assign(file)))
     }}>
  {({getRootProps, getInputProps}) => (
     <div {...getRootProps({ className: 'dropzone' })}>
   <input {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
          <Typography sx={{ mb: 2.5}}>
            Drop file here or click to upload.
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
          <Typography sx={{ color: 'text.secondary' }}>Max size of 2 MB</Typography>
        </Box>
    </div>
  )}
</Dropzone>
      {favIconImg.length ? (
        <Fragment>
          <List>{favIconImgList}</List>
          {/* <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove
            </Button>
          </div> */}
        </Fragment>
      ) : null}
    </Fragment>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          minRows={2}
          label='Company Address'
          placeholder='King Fahad Road'
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          minRows={2}
          label='License Expired Message'
          placeholder=''
        />
      </Grid>
      <Grid item xs={12}>
      <FormControl fullWidth>
          <InputLabel htmlFor='currency-select'>Week Start From</InputLabel>
          <Select 
          label='Week Start From'
          labelId='day-select'
          aria-describedby='day-select'
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)} 
          defaultValue=''>
            {weekDays?.map((item, index) => {
              return (
                <MenuItem value={item.id} key={index}>{item.days}</MenuItem>
              )
            })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid container justifyContent="flex-end" sx={{ mt: '5%' }}>
      <Button
      color = 'success'
      variant='contained'
      >
        Submit
      </Button>
    </Grid>
    </Grid>
  )
}

export default StepGlobalSettings
