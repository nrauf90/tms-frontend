import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import configData from '../../../config.json'

// ** Axios Imports
import axios from "axios"

// ** Third Party Components
import toast from "react-hot-toast"

// ** Fetch Packages
export const fetchData = createAsyncThunk('appPackages/fetchData', async params => {
    const response = await axios.get(`${configData.SERVER_URL}/api/packages`, {
      params,
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
      }
    }
    )
  
    return response
  })
  
  // ** Add Package
  export const addPackage = createAsyncThunk('appPackages/addPackage', async (data, { getState, dispatch }) => {
    const response = await axios.post(`${configData.SERVER_URL}/api/createPackages`, {
      name: data.name,
      employees: data.employees,
      storageSize: data.storageSize,
      storageUnit: data.storageUnit,
      free_plan: data.free_plan,
      discription: data.discription,
      is_private: data.is_private,
      is_recommended: data.is_recommended,
      is_default: data.is_default,
      modules: data.modules,
      monthly_price: data.monthly_price,
      stripe_monthly_plan_id: data.stripe_monthly_plan_id,
      paypal_monthly_plan_id: data.paypal_monthly_plan_id,
      annual_price: data.annual_price,
      stripe_annual_plan_id: data.stripe_annual_plan_id,
      paypal_annual_plan_id: data.paypal_annual_plan_id,
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
    dispatch(fetchData(getState().packages.params))
  
    return response.data
  })
  
  // ** Delete Package
  export const deletePackage = createAsyncThunk('appPackages/deletePackage', async (id, { getState, dispatch }) => {
    const response = await axios.delete(`${configData.SERVER_URL}/api/deletePackages/${id}`, {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`
      }
    }).catch(function (error){
      toast.error(response?.data?.message)
    })
    if(response?.data?.success == true){
      toast.success(response?.data?.message)
  }
    dispatch(fetchData(getState().packages.params))
  
    return response.data
  })

  // ** Update Package
  export const updatePackage = createAsyncThunk('appPackages/updatePackage', async (data, {getState, dispatch}) => {
    const response = await axios.post(`${configData.SERVER_URL}/api/updatePackages/${data.id}`, {
      name: data.name,
      employees: data.employees,
      storageSize: data.storageSize,
      storageUnit: data.storageUnit,
      free_plan: data.free_plan,
      discription: data.discription,
      is_private: data.is_private,
      is_recommended: data.is_recommended,
      is_default: data.is_default,
      modules: data.modules,
      monthly_price: data.monthly_price,
      stripe_monthly_plan_id: data.stripe_monthly_plan_id,
      paypal_monthly_plan_id: data.paypal_monthly_plan_id,
      annual_price: data.annual_price,
      stripe_annual_plan_id: data.stripe_annual_plan_id,
      paypal_annual_plan_id: data.paypal_annual_plan_id,
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
    dispatch(fetchData(getState().packages.params))
  
    return response.data
  })
  
  export const appPackagesSlice = createSlice({
    name: 'appPackages',
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
  
  export default appPackagesSlice.reducer