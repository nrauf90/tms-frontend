import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { toast } from 'react-hot-toast'
import configData from '../../../config.json'


// ** Fetch Offline Payment Methods
export const fetchData = createAsyncThunk('appPayments/fetchData', async params => {
  const response = await axios.get(`${configData.SERVER_URL}/api/offlineMethods`, {
    params,
    headers: {
      'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  },
  )

  return response
})

// ** Add Offline Payment Method
export const addMethod = createAsyncThunk('appPayments/addMethod', async (data, { getState, dispatch }) => {
  const response = await axios.post(`${configData.SERVER_URL}/api/createOfflineMethod`, {
    data
  },
  {
    headers: {
      'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).catch(function (error){
    toast.error("Unable to add method")
  })
  if(response?.data?.success == true){
    toast.success("Method Added Successfully")
  }
  dispatch(fetchData(getState().payment.params))

  return response.data
})

// ** Delete Offline Payment Method
export const deleteMethod = createAsyncThunk('appPayments/deleteMethod', async (id, { getState, dispatch }) => {
  const response = await axios.delete(`${configData.SERVER_URL}/api/deleteOfflineMethod/${id}`, {
    headers: {
      'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).catch(function (error){
    toast.error("Unable to delete method")
  })

  if(response?.data?.success == true){
    toast.success("Method deleted successfully")
  }
  dispatch(fetchData(getState().payment.params))

  return response.data
})

//** Update Offline Currency Payment Method
export const updateMethod = createAsyncThunk('appPayments/updateMethod', async (data, {getState, dispatch}) => {
  const response = await axios.post(`${configData.SERVER_URL}/api/deleteOfflineMethod/${data.id}`, {
    data
  },
  {
    headers: {
      'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).catch(function (error){
    toast.error("Unable to update method")
  })
  if(response?.data?.success == true){
    toast.success('Method Updated Successfully')
  }
  dispatch(fetchData(getState().payment.params))

  return response.data
})

export const appPaymentsSlice = createSlice({
  name: 'appPayments',
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
      console.log(action)
    })
    .addCase(fetchData.rejected, (state, action) => {
      if(action.error.code == "ERR_BAD_REQUEST"){
        state.code = 404
      }
    })
  }
})

export default appPaymentsSlice.reducer
