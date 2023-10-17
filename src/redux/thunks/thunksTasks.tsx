import {TaskModelType, TasksApi} from "../../api/tasks-api";
import {createTaskAC, deleteTaskAC, setTasksAC, updateTaskAC} from "../actions/tasksActions";
import {AppDispatchType, AppRootStateType, AppThunk} from "../../components/App/redux-store";
import {setAppLoadingStatusAC} from "../Reducers/appReducer";
import {ErrorType, RequestResultsType} from "../../api/todolist-api";
import {handleServerError, handleServerNetworkError} from "../../utils/utils";
import axios from "axios";

export const getTasksTC = (todolistId: string): AppThunk => async (dispatch: AppDispatchType) => {
  dispatch(setAppLoadingStatusAC('loading'))
  try {
    const res = await TasksApi.getTasks(todolistId)
    dispatch(setTasksAC(todolistId, res.data.items))
    dispatch(setAppLoadingStatusAC('succeeded'))
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const errorMessage = e.response ? e.response.data.error : e.message
      handleServerNetworkError(dispatch, errorMessage)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  }
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => async (dispatch: AppDispatchType) => {
  dispatch(setAppLoadingStatusAC('loading'))
  dispatch(updateTaskAC(todolistId, taskId, {loadingStatus: 'loading'}))
  try {
    const res = await TasksApi.deleteTask(todolistId, taskId)
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(deleteTaskAC(todolistId, taskId))
      dispatch(setAppLoadingStatusAC('succeeded'))
    } else {
      handleServerError(dispatch, res.data)
      dispatch(updateTaskAC(todolistId, taskId, {loadingStatus: 'failed'}))
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const errorMessage = e.response ? e.response.data.error : e.message
      handleServerNetworkError(dispatch, errorMessage)
      dispatch(updateTaskAC(todolistId, taskId, {loadingStatus: 'failed'}))
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
      dispatch(updateTaskAC(todolistId, taskId, {loadingStatus: 'failed'}))
    }
  }
}
export const createTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch: AppDispatchType) => {
  dispatch(setAppLoadingStatusAC('loading'))
  try {
    const res = await TasksApi.createTask(todolistId, title)
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(createTaskAC(todolistId, res.data.data.item))
      dispatch(setAppLoadingStatusAC('succeeded'))
    } else {
      handleServerError(dispatch, res.data)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const errorMessage = e.response ? e.response.data.error : e.message
      handleServerNetworkError(dispatch, errorMessage)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  }
}
export const updateTaskTC = (todolistId: string, taskId: string, task: TaskModelType): AppThunk =>
  async (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
    const ourTask = getState().tasks[todolistId].find(t => t.id === taskId)
    const updatedTask = {
      title: ourTask?.title,
      description: ourTask?.description,
      status: ourTask?.status,
      priority: ourTask?.priority,
      startDate: ourTask?.startDate,
      deadline: ourTask?.deadline,
      ...task
    }
    dispatch(setAppLoadingStatusAC('loading'))
    try {
      const res = await TasksApi.updateTask(todolistId, taskId, updatedTask)
      if (res.data.resultCode === RequestResultsType.OK) {
        dispatch(updateTaskAC(todolistId, taskId, task))
        dispatch(setAppLoadingStatusAC('succeeded'))
      } else {
        handleServerError(dispatch, res.data)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        const errorMessage = e.response ? e.response.data.error : e.message
        handleServerNetworkError(dispatch, errorMessage)
      } else {
        handleServerNetworkError(dispatch, (e as Error).message)
      }
    }
  }