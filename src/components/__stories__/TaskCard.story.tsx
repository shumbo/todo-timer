import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Status } from '../../models/task.model';
import TaskCard from '../TaskCard';

storiesOf('TaskCard', module)
  .add('TODO', () => (
    <TaskCard
      task={{ id: 'id', title: 'TODO', status: Status.TODO, history: [] }}
      onComplete={action('onComplete')}
      onEdit={action('onComplete')}
      onDelete={action('onDelete')}
      onStart={action('onStart')}
      onStop={action('onStop')}
    />
  ))
  .add('IN PROGRESS', () => (
    <TaskCard
      task={{
        id: 'id',
        title: 'IN PROGRESS',
        status: Status.IN_PROGRESS,
        history: [],
      }}
      onComplete={action('onComplete')}
      onEdit={action('onComplete')}
      onDelete={action('onDelete')}
      onStart={action('onStart')}
      onStop={action('onStop')}
    />
  ))
  .add('DONE', () => (
    <TaskCard
      task={{ id: 'id', title: 'DONE', status: Status.DONE, history: [] }}
      onComplete={action('onComplete')}
      onEdit={action('onComplete')}
      onDelete={action('onDelete')}
      onStart={action('onStart')}
      onStop={action('onStop')}
    />
  ));
