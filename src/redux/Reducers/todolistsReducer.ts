import {
  createTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  deleteTodolistAC, setTodolistsAC, changeTodolistLoadingStatusAC, clearDataAC
} from "../actions/todolistsActions";
import {TodolistType} from "../../api/todolist-api";
import {RequestStatusType} from "./appReducer";


export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistActionType = ReturnType<typeof createTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ClearDataActionType = ReturnType<typeof clearDataAC>

export type TodolistActionsType =
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistLoadingStatusAC>
  | DeleteTodolistActionType
  | AddTodolistActionType
  | SetTodolistsActionType
  | ClearDataActionType

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterType
  loadingStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state = initialState, action: TodolistActionsType):Array<TodolistDomainType> => {
  switch (action.type) {
    case 'CHANGE-TODOLIST-FILTER':
      return state
        .map(tl => tl.id === action.todolistId ? {...tl, filter:action.newFilter} : tl)
    case 'CHANGE-TODOLIST-TITLE':
      return state
        .map(tl => tl.id === action.todolistId ? {...tl, title: action.newTitle} : tl)
    case 'CHANGE-TODOLIST-LOADING-STATUS':
      return state
        .map(tl => tl.id === action.todolistId ? {...tl, loadingStatus:action.newLoadingStatus} : tl)
    case 'DELETE-TODOLIST':
      return state.filter(tl => tl.id !== action.todolistId)
    case "ADD-TODOLIST":
      return [{...action.todolist, filter: 'all', loadingStatus: 'idle'}, ...state]
    case "SET-TODOLISTS":
      return action.todolists.map(el => ({...el, filter: 'all', loadingStatus: 'idle'}))
    case "CLEAR-DATA":
      return []
    default:
      return state
  }
}


