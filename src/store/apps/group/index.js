import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import configData from '../../../config.json'

// ** Axios Imports
import axios from "axios"

// ** Third Party Components
import toast from "react-hot-toast"

// ** Fetch Groups
export const fetchData = createAsyncThunk('appGroup/fetchData', async params => {
    const response = await axios.get(`${configData.SERVER_URL}/api/groups`, {
      params,
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
      }
    },
    )
  
    return response
  })
  
  // ** Add Group
  export const addGroup = createAsyncThunk('appGroup/addGroup', async (data, { getState, dispatch }) => {
    const response = await axios.post(`${configData.SERVER_URL}/api/createGroup`, {
      groupName : data.groupName
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

    dispatch(fetchData(getState().group.params))
  
    return response.data
  })
  
  // ** Delete Group
  export const deleteGroup = createAsyncThunk('appGroup/deleteGroup', async (id, { getState, dispatch }) => {
    const response = await axios.delete(`${configData.SERVER_URL}/api/deleteGroup/${id}`, {
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).catch(function (error){
      toast.error(error?.response?.data?.message)
    })
    if(response?.data?.success == true){
      toast.success(response?.data?.message)
    }
    dispatch(fetchData(getState().group.params))
  
    return response.data
  })

  // ** Update Group
  export const updateGroup = createAsyncThunk('appGroup/updateGroup', async (data, {getState, dispatch}) => {
    const response = await axios.post(`${configData.SERVER_URL}/api/updateGroup/${data.groupId}`, {
      groupName : data.groupName
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
    dispatch(fetchData(getState().group.params))
  })
  
  export const appGroupSlice = createSlice({
    name: 'appGroup',
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
        state.last_page = action.payload.data.data.last_page
      })
      .addCase(fetchData.rejected, (state, action) => {
        if(action.error.code == "ERR_BAD_REQUEST"){
          state.code = 404
        }
      })
    }
  })
  
  export default appGroupSlice.reducer