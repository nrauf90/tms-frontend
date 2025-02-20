import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import configData from '../../../config.json'

// ** Axios Imports
import axios from 'axios'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async params => {
  const response = await axios.get(`${configData.SERVER_URL}/api/getAllUsers`, {
    params,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}` 
    }
  },
  );

  //console.log(response)

  return response
})

// ** Add User
export const addUser = createAsyncThunk('appUsers/addUser', async (data, { getState, dispatch }) => {
  //console.log(data)
  const response = await axios.post(`${configData.SERVER_URL}/api/addNewUser`, {
    data,
  },
  {
    headers : {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}` 
    }
  },
  );

  //console.log(response)

  if(response.data.success == true){
    toast.success('User Added Successfully')
  } else {
    toast.error('User cannot be added')
  }
  dispatch(fetchData(getState().user.params))

  return response.data
})

// ** Delete User
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { getState, dispatch }) => {
  const response = await axios.delete(`${configData.SERVER_URL}/api/deleteUser/${id}`, {
    headers : {
      'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).catch(function (error){
    toast.error('Super Admin cannot be deleted')
  })

  //console.log(response)
  
  if(response?.data?.success == true){
    toast.success('User Deleted Successfully')
  }
  dispatch(fetchData(getState().user.params))

  return response.data
})

// ** Update User

export const updateUser = createAsyncThunk('appUsers/updateUser', async (data, {getState, dispatch}) => {
  const response = await axios.post(`${configData.SERVER_URL}/api/updateUser/${data.id}`, {
    fname : data.firstName,
    lname : data.lastName,
    password : data.password,
  },
  {
    headers: {
      'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).catch(function (error){
    toast.error(error?.response?.data?.message)
  })
  if(response?.data?.success == true){
    toast.success(response?.data?.message)
  }
  dispatch(fetchData(getState().user.params))

  return response.data
})


export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data.data.data
      state.total = action.payload.data.data.total
      state.current_page = action.payload.data.data.current_page
      state.per_page = action.payload.data.data.per_page
      state.next_page_url = action.payload.data.data.next_page_url
      state.last_page = action.payload.data.data.last_page
    })
    .addCase(fetchData.rejected, (state, action) => {
      if(action.error.code == "ERR_BAD_REQUEST"){
        state.code = 404
      }
    })
  }
})

export default appUsersSlice.reducer
