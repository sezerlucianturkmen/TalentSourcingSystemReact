import { configureStore } from '@reduxjs/toolkit'
import { CandidateSlice } from './features'
import { InteractionSlice } from './features'

const store = configureStore({
  reducer: {
    candidate: CandidateSlice,
    interaction: InteractionSlice,
  },
})
export default store
