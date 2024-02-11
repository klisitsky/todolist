import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatchType, AppRootStateType } from 'features/App/store'
import { BaseResponse } from 'common/types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatchType
  rejectValue: null | BaseResponse
}>()
