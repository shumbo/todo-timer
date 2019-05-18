import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AddTaskDialog from '../AddTaskDialog';

storiesOf('AddTaskDialog', module).add('default', () => (
  <AddTaskDialog onChange={action('onChange')} />
));
