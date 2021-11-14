import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: false,
    token : "",
    username : "",
  },
  reducers: {
    login: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    exit: (state) => {
        state.value = false
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUsername : (state, action) => {
      state.username = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, exit, setToken,setUsername } = authSlice.actions

export default authSlice.reducer