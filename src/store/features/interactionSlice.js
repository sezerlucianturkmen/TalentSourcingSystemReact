import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import candidateService from '../../config/CandidateService'

const initialStateCandidate = {
  interaction: {},
  interactionList: [],
  isUpdated: false,

  data: [],
  error: {
    code: '',
    message: '',
    fields: [],
  },
}

export const createInteraction = createAsyncThunk('interaction/create', async (payload) => {
  try {
    const response = await fetch(candidateService.createInteraction, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    return response
  } catch (err) {
    return err.response
  }
})

export const updateInteraction = createAsyncThunk('interaction/update', async (payload) => {
  try {
    const response = await fetch(candidateService.updateInteraction, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    return response
  } catch (err) {
    return err.response
  }
})

export const getAll = createAsyncThunk('interaction/getall', async (payload) => {
  try {
    const response = await fetch(candidateService.findAllInteraction + payload, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    return response
  } catch (err) {
    return err.response
  }
})

export const deleteInteraction = createAsyncThunk('interaction/delete', async (payload) => {
  try {
    const response = await fetch(candidateService.deleteAction + payload, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    return response
  } catch (err) {
    return err.response
  }
})

const candidateSlice = createSlice({
  name: 'candidate',
  initialState: initialStateCandidate,

  reducers: {},
  extraReducers: (build) => {
    //getCandidates
    build.addCase(getAll.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(getAll.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.interactionList = action.payload.sort((a, b) => b.id - a.id)
      state.isLoading = false
    })
    build.addCase(getAll.rejected, (state) => {
      state.isLoading = false
    })
    //create
    build.addCase(createInteraction.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(createInteraction.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.interaction = action.payload
      if (state.isUpdated === false) {
        state.isUpdated = true
      } else {
        state.isUpdated = false
      }
      state.isLoading = false
    })
    build.addCase(createInteraction.rejected, (state) => {
      state.isLoading = false
    })
    //update
    build.addCase(updateInteraction.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(updateInteraction.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      if (state.isUpdated === false) {
        state.isUpdated = true
      } else {
        state.isUpdated = false
      }
      state.isLoading = false
    })
    build.addCase(updateInteraction.rejected, (state) => {
      state.isLoading = false
    })
    //delete
    build.addCase(deleteInteraction.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(deleteInteraction.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.isLoading = false
      if (state.isUpdated === false) {
        state.isUpdated = true
      } else {
        state.isUpdated = false
      }
    })
    build.addCase(deleteInteraction.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export default candidateSlice.reducer
