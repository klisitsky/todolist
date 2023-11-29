import type { Meta, StoryObj } from '@storybook/react'
import { Task } from './Task'
import { TaskPriorities, TaskStatuses } from 'api/tasks-api'
import ReduxStoreProviderDecorator, { todolistId1, todolistId2 } from 'stories/ReduxStoreProviderDecorator'

const meta: Meta<typeof Task> = {
  title: 'TODOLIST/Task',
  component: Task,
  parameters: {},
  decorators: [ReduxStoreProviderDecorator],
  tags: ['autodocs'],
}

type Story = StoryObj<typeof Task>

export const TaskIsNotDone: Story = {
  args: {
    task: {
      id: '1',
      title: 'Задача выполнена',
      addedDate: '',
      status: TaskStatuses.New,
      order: 1,
      deadline: '',
      description: '',
      priority: TaskPriorities.Middle,
      startDate: '',
      todoListId: todolistId2,
      loadingStatus: 'idle',
    },
    todolistId: todolistId2,
  },
}

export const TaskIsDone: Story = {
  args: {
    task: {
      id: '1',
      title: 'Задача не выполнена',
      addedDate: '',
      status: TaskStatuses.Completed,
      order: 2,
      deadline: '',
      description: '',
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todolistId1,
      loadingStatus: 'idle',
    },
    todolistId: todolistId1,
  },
}

export default meta
