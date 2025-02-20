import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import configData from '../../../config.json'

// ** Axios Imports
import axios from 'axios'

// ** Third Party Components
import toast from 'react-hot-toast'


// ** Fetch Company Users
export const fetchData = createAsyncThunk('appCompanyUsers/fetchData', async params => {
  const response = await axios.get(`${configData.SERVER_URL}/api/companyUsers`, {
    params,
    headers: {
        'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  })

  return response
})

// ** Add Company User
export const addCompanyUser = createAsyncThunk('appCompanyUsers/addCompanyUser', async (data, { getState, dispatch }) => {
  const response = await axios.post(`${configData.SERVER_URL}/api/createCompanyUser`, {
    email: data.email,
    password: data.password,
    firstname: data.firstname,
    lastname: data.lastname,
    roles: data.selectedCheckbox
  },
  {
    headers : {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).catch(function (error){
    toast.error('User with this email or name already exists')
  })
  if(response?.data?.isSuccess == true){
    toast.success('User created successfully')
  }

  //dispatch(fetchData(getState().companyUsers.params))

  return response
})

// ** Delete Company User
export const deleteCompanyUser = createAsyncThunk('appCompanyUsers/deleteCompanyUser', async (id, { getState, dispatch }) => {
  const response = await axios.delete( `${configData.SERVER_URL}/api/deleteCompanyUser/${id}`, {
    headers: {
      'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).catch(function (error){
    toast.error('Unable to delete user')
  })
  if(response?.data?.isSuccess == true){
    toast.success('User Deleted Successfully')
  }
  dispatch(fetchData(getState().companyUsers.params))

  return response
})

// ** Update Company User
export const updateCompanyUser = createAsyncThunk('appCompanyUsers/updateCompanyUser', async (data, { getState, dispatch }) => {
    const response = await axios.post(`${configData.SERVER_URL}/api/updateCompanyUser/${data.id}`, {
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      roles: data.selectedCheckbox
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    if(response?.data?.isSuccess == true){
      toast.success('User Updated Successfully')
    }

    //dispatch(fetchData(getState().companyUsers.params))
  
    return response.data
})  

export const appCompanyUsersSlice = createSlice({
  name: 'appCompanyUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data.payload.data
      state.last_page = action.payload.data.payload.last_page
    })
    .addCase(fetchData.rejected, (state, action) => {
        if(action.error.code == "ERR_BAD_REQUEST"){
          state.code = 404
        }
    })
  }
})

export default appCompanyUsersSlice.reducer
