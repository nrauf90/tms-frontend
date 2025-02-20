// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import configData from '../../../config.json'
import toast from 'react-hot-toast'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Permissions
export const fetchData = createAsyncThunk('appPermissions/fetchData', async params => {
  const response = await axios.get(`${configData.SERVER_URL}/api/permission`, {
    params,
    headers : {
      'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  })

  return response.data.data
  
})

export const addPermission = createAsyncThunk('appPermissions/addPermission', async (data, {getState, dispatch }) => {
  const response = await axios.post(`${configData.SERVER_URL}/api/permission/${data.permissionName}`, {
        slug: data.slug,
        group_name: data.groupName,
        permission: data.permissionName
  },
  {
    headers : {
      'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).catch(function (error){
    toast.error(error?.response?.data?.message)
  })
  if(response?.data?.success == true){
    toast.success(response?.data?.message)
  }

  dispatch(fetchData(getState().permissions.params))

  return response.data
})


export const editPermission = createAsyncThunk('appPermissions/editPermission', async (data, {getState, dispatch}) => {
  const response = await axios.post(`${configData.SERVER_URL}/api/edit/permission/${data.id}`, {
    slug: data.slug,
    group_name: data.groupName,
    permission: data.permissionName
  },
  {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}` 
    }
  }).catch(function (error){
    toast.error('Unable to edit permission')
  })
  if(response?.data?.success == true){
    toast.success('Permission Updated Successfully')
  }

  dispatch(fetchData(getState().permissions.params))

  return response.data
})

export const deletePermission = createAsyncThunk('appPermissions/deletePermission', async (id, {getState, dispatch}) => {
  const response = await axios.delete(`${configData.SERVER_URL}/api/permission/${id}`)
  .catch(function (error){
    toast.error('Unable to delete permission')
  })
  if(response?.data?.success == true){
    toast.success('Permission Deleted Successfully')
  }

  dispatch(fetchData(getState().permissions.params))

  return response.data
})

export const appPermissionsSlice = createSlice({
  name: 'appPermissions',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
       state.data = action.payload.data
       state.last_page = action.payload.last_page
     })
     .addCase(fetchData.rejected, (state, action) => {
      if(action.error.code == "ERR_BAD_REQUEST"){
        state.code = 404
      }
    })
  }
})

export default appPermissionsSlice.reducer
