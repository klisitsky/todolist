import type { Meta, StoryObj } from '@storybook/react';
import {Task} from "./Task";
import ReduxStoreProviderDecorator, {todolistId1, todolistId2} from "../../stories/ReduxStoreProviderDecorator";

const meta: Meta<typeof Task> = {
  title: 'TODOLIST/Task',
  component: Task,
  parameters: {},
  decorators: [ReduxStoreProviderDecorator],
  tags: ['autodocs'],
};


type Story = StoryObj<typeof Task>;

export const TaskIsDone: Story = {
  args: {
    task: {id: '1', title: 'Задача не выполнена', isDone: false},
    todolistId: todolistId1
  }
};

export const TaskIsNotDone: Story = {
  args: {
    task: {id: '1', title: 'Задача выполнена', isDone: true},
    todolistId: todolistId2
  }
};

export default meta;