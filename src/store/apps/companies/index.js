import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import configData from '../../../config.json'

// ** Axios Imports
import axios from 'axios'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Fetch Companies
export const fetchData = createAsyncThunk('appCompanies/fetchData', async params => {
  const response = await axios.get(`${configData.SERVER_URL}/api/companies`, {
    params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })

  return response
})

export const deleteData = createAsyncThunk('deleteCompany/delete', async companyId => {
  const response = await axios.delete(`${configData.SERVER_URL}/api/deletecompany/${companyId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  })

  return response.data // Returning only relevant data
})

// ** Add Company
export const addCompany = createAsyncThunk('appCompanies/addCompany', async (data, { getState, dispatch }) => {
  const response = await axios
    .post(
      `${configData.SERVER_URL}/api/createCompany`,
      {
        companyName: data.companyName,
        companyEmail: data.companyEmail,
        companyPhone: data.companyPhone,
        companyWebsite: data.companyWebsite,
        companyLogo: data.companyLogo,
        companyAddress: data.companyAddress,
        defaultCurrency: data.defaultCurrency,
        defaultTimezone: data.defaultTimezone,
        defaultLanguage: data.defaultLanguage,
        defaultPackage: data.defaultPackage,
        logo: data.base64Logo,
        status: data.status,
        email: data.email,
        password: data.password,
        fname: data.fname,
        lname: data.lname
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    )
    .catch(function (error) {
      toast.error(error?.response?.data?.message)
    })
  if (response?.data?.success == true) {
    toast.success(response?.data?.message)
  }

  dispatch(fetchData(getState().companies.params))

  return response.data
})

// ** Update Company
export const updateCompany = createAsyncThunk('appCompanies/updateCompany', async (data, { getState, dispatch }) => {
  const response = await axios
    .post(
      `${configData.SERVER_URL}/api/updateCompany/${data.id}`,
      {
        companyName: data.companyName,
        companyEmail: data.companyEmail,
        companyPhone: data.companyPhone,
        companyWebsite: data.companyWebsite,
        companyLogo: data.companyLogo,
        companyAddress: data.companyAddress,
        defaultCurrency: data.defaultCurrency,
        defaultTimezone: data.defaultTimezone,
        defaultLanguage: data.defaultLanguage,
        defaultPackage: data.defaultPackage,
        status: data.status
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    )
    .catch(function (error) {
      toast.error(error?.response?.data?.message)
    })
  if (response?.data?.success == true) {
    toast.success(response?.data?.message)
  }
  dispatch(fetchData(getState().companies.params))

  return response.data
})

export const updateCompanyAdmin = createAsyncThunk(
  'appCompanies/updateCompanyAdmin',
  async (data, { getState, dispatch }) => {
    const response = await axios
      .post(
        `${configData.SERVER_URL}/api/updateCompanyAdmin/${data.id}`,
        {
          companyName: data.companyName,
          companyEmail: data.companyEmail,
          companyPhone: data.companyPhone,
          companyWebsite: data.companyWebsite,
          companyLogo: data.companyLogo,
          companyAddress: data.companyAddress,
          defaultCurrency: data.defaultCurrency,
          defaultTimezone: data.defaultTimezone,
          defaultLanguage: data.defaultLanguage,
          defaultPackage: data.defaultPackage,
          status: data.status
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      )
      .catch(function (error) {
        toast.error(error?.response?.data?.message)
      })
    if (response?.data?.success == true) {
      toast.success(response?.data?.message)
    }
    dispatch(fetchData(getState().companies.params))

    return response.data
  }
)

export const appCompaniesSlice = createSlice({
  name: 'appCompanies',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.data.data.data
        state.last_page = action.payload.data.data.last_page
      })
      .addCase(fetchData.rejected, (state, action) => {
        if (action.error.code == 'ERR_BAD_REQUEST') {
          state.code = 404
        }
      })
  }
})

export default appCompaniesSlice.reducer
