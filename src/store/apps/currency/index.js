import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import configData from '../../../config.json'

// ** Axios Imports
import axios from 'axios'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Fetch Currencies
export const fetchData = createAsyncThunk('appCurrencies/fetchData', async params => {

  const response = await axios.get(`${configData.SERVER_URL}/api/currencies`, {
    params,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    }
  },
  )

  return response
})

// ** Add Currency
export const addCurrency = createAsyncThunk('appCurrencies/addCurrency', async (data, { getState, dispatch }) => {

  const response = await axios.post(`${configData.SERVER_URL}/api/createCurrency`, {
    data,
  },
  {
    headers:{
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).catch(function (error){
    toast.error("Unable to add currency")
  })
  if(response?.data?.success == true){
    toast.success('Currency Added Successfully')
  }
  dispatch(fetchData(getState().currency.params))

  return response.data
})

// ** Delete Currency
export const deleteCurrency = createAsyncThunk('appCurrencies/deleteCurrency', async (id, { getState, dispatch }) => {
  const response = await axios.delete(`${configData.SERVER_URL}/api/deleteCurrency/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).catch(function (error){
    toast.error("Unable to delete currency")
  })

  if(response?.data?.success == true){
    toast.success("Currency Deleted Successfully")
  }
  dispatch(fetchData(getState().currency.params))

  return response.data
})

// ** Update Currency
export const updateCurrency = createAsyncThunk('appCurrencies/updateCurrency', async (data, {getState, dispatch}) => {
  const response = await axios.post(`${configData.SERVER_URL}/api/updateCurrency/${data.id}`, {
    data
  },
  {
    headers: {
      'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
    }
  }).catch(function (error){
    toast.error("Unable to update currency")
  })
  if(response?.data?.success == true){
    toast.success('Currency Updated Successfully')
  }
  dispatch(fetchData(getState().currency.params))

  return response.data
})

export const appCurrenciesSlice = createSlice({
  name: 'appCurrencies',
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

export default appCurrenciesSlice.reducer
