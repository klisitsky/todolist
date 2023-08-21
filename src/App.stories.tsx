import type { Meta, StoryObj } from '@storybook/react';
import ReduxStoreProviderDecorator from "./stories/ReduxStoreProviderDecorator";
import App from "./App";

const meta: Meta<typeof App> = {
  title: 'TODOLIST/App',
  component: App,
  parameters: {},
  decorators: [ReduxStoreProviderDecorator],
  tags: ['autodocs'],
};

type Story = StoryObj<typeof App>;

export const AppDefault: Story = {
};


export default meta;