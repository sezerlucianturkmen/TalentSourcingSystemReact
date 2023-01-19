import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import candidateService from '../../config/CandidateService'

const initialStateCandidate = {
  candidate: {},
  candidateList: [],
  candidateSourcedList: [],
  candidateid: null,
  interactionsOfCandidate: [],
  isUpdated: false,
  isCreated: false,

  data: [],
  error: {
    code: '',
    message: '',
    fields: [],
  },
}

export const getSourcedCandidates = createAsyncThunk('candidate/getSourcedCandidates', async () => {
  const result = await fetch(candidateService.getSourcedCandidates)
    .then((response) => response.json())
    .then((data) => data)
  return result
})

export const getCandidates = createAsyncThunk('candidate/getCandidates', async () => {
  const result = await fetch(candidateService.getCandidates)
    .then((response) => response.json())
    .then((data) => data)
  return result
})

export const create = createAsyncThunk('candidate/create', async (payload) => {
  try {
    const response = await fetch(candidateService.create, {
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

export const update = createAsyncThunk('candidate/update', async (payload) => {
  try {
    const response = await fetch(candidateService.update, {
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

export const deleteCandidate = createAsyncThunk('candidate/delete', async (payload) => {
  try {
    const response = await fetch(candidateService.delete + payload, {
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

export const findCandidate = createAsyncThunk('candidate/find', async (payload) => {
  try {
    const response = await fetch(candidateService.findCandidate + payload, {
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

const candidateSlice = createSlice({
  name: 'candidate',
  initialState: initialStateCandidate,

  reducers: {},
  extraReducers: (build) => {
    //getSourcedCandidates
    build.addCase(getSourcedCandidates.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(getSourcedCandidates.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.candidateSourcedList = action.payload.sort((a, b) => b.id - a.id)
      state.isLoading = false
    })
    build.addCase(getSourcedCandidates.rejected, (state) => {
      state.isLoading = false
    })
    //getCandidates
    build.addCase(getCandidates.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(getCandidates.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.candidateList = action.payload.sort((a, b) => b.id - a.id)
      state.isLoading = false
    })
    build.addCase(getCandidates.rejected, (state) => {
      state.isLoading = false
    })
    //create
    build.addCase(create.pending, (state) => {
      state.isLoading = true
      state.isCreated = false
    })
    build.addCase(create.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.candidate = action.payload
      state.candidateid = action.payload.id
      state.isLoading = false
      state.isCreated = true
      alert('Candidate is  SUCCESSFULLY created')
      if (state.isUpdated === false) {
        state.isUpdated = true
      } else {
        state.isUpdated = false
      }
    })
    build.addCase(create.rejected, (state) => {
      state.isLoading = false
      state.isCreated = false
    })
    //update
    build.addCase(update.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(update.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.isLoading = false
      if (state.isUpdated === false) {
        state.isUpdated = true
      } else {
        state.isUpdated = false
      }
    })
    build.addCase(update.rejected, (state) => {
      state.isLoading = false
    })
    //delete
    build.addCase(deleteCandidate.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(deleteCandidate.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.isLoading = false
      if (state.isUpdated === false) {
        state.isUpdated = true
      } else {
        state.isUpdated = false
      }
    })
    build.addCase(deleteCandidate.rejected, (state) => {
      state.isLoading = false
    })
    //find
    build.addCase(findCandidate.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(findCandidate.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.isLoading = false
      state.candidate = action.payload
    })
    build.addCase(findCandidate.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export default candidateSlice.reducer
