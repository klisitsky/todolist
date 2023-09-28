import {useDispatch, useSelector} from "react-redux";
import {tasksSelector} from "../../../redux/selectors/selectors";
import {AppRootStateType} from "../../../redux/redux-store";
import React, {useCallback} from "react";
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "../../../redux/actions/todolistsActions";
import {addTaskAC} from "../../../redux/actions/tasksActions";
import {FilterType} from "../../../redux/Reducers/todolistsReducer";
import {TaskStatuses, TaskType} from "../../../api/tasks-api";


export const useTodolist = (todolistId: string,
                            todolistFilter: FilterType) => {
  const dispatch = useDispatch()
  const selectedTasksByTodolistId = tasksSelector(todolistId)
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(selectedTasksByTodolistId)
  let filteredTasks = tasks

  switch (todolistFilter) {
    case 'active':
      filteredTasks = tasks.filter(task => task.status === TaskStatuses.New)
      break;
    case 'completed':
      filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed)
      break;
  }

  const changeTodolistTitle = useCallback((changedTodolistTitle: string) => {
    dispatch(changeTodolistTitleAC(todolistId, changedTodolistTitle))
  }, [todolistId])

  const onDeleteTodolistClickHandler = useCallback(() => {
    dispatch(deleteTodolistAC(todolistId))
  }, [todolistId])


  const changeTodolistFilter = useCallback((newFilter: FilterType) => {
    dispatch(changeTodolistFilterAC(todolistId, newFilter))
  }, [todolistId])


  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(todolistId, title))
  }, [todolistId])


  return {
    filteredTasks,
    changeTodolistTitle,
    onDeleteTodolistClickHandler,
    addTask,
    changeTodolistFilter
  }
}