import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Status } from '../../models/task.model';
import EditTaskDialog from '../EditTaskDialog';

storiesOf('EditTaskDialog', module)
  .add('TODO', () => (
    <EditTaskDialog
      task={{ id: 'id', title: 'todo', status: Status.TODO, history: [] }}
      onChange={action('onChange')}
    />
  ))
  .add('DONE', () => (
    <EditTaskDialog
      task={{ id: 'id', title: 'done', status: Status.DONE, history: [] }}
      onChange={action('onChange')}
    />
  ))
  .add(
    'IN PROGRESS',
    () => (
      <EditTaskDialog
        task={{
          id: 'id',
          title: 'in progress',
          status: Status.IN_PROGRESS,
          history: [],
        }}
        onChange={action('onChange')}
      />
    ),
    {
      notes: 'Hide status dropdown for in progress task',
    }
  );
