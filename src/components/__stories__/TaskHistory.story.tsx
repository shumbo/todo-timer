import React from 'react';
import { storiesOf } from '@storybook/react';
import { Status } from '../../models/task.model';
import TaskHistory from '../TaskHistory';

storiesOf('TaskHistory', module)
  .add('No History', () => (
    <TaskHistory
      task={{ title: 'demo', id: 'id', status: Status.TODO, history: [] }}
    />
  ))
  .add('Worked 1 time', () => (
    <TaskHistory
      task={{
        title: 'demo',
        id: 'id',
        status: Status.TODO,
        history: [
          {
            id: 'work1',
            start: new Date(2019, 5, 17, 12, 2, 1, 0),
            end: new Date(2019, 5, 17, 14, 3, 10, 0),
          },
        ],
      }}
    />
  ))
  .add('Worked 3 time', () => (
    <TaskHistory
      task={{
        title: 'demo',
        id: 'id',
        status: Status.TODO,
        history: [
          {
            id: 'work1',
            start: new Date(2019, 5, 17, 12, 2, 1, 0),
            end: new Date(2019, 5, 17, 14, 3, 10, 0),
          },{
            id: 'work2',
            start: new Date(2019, 5, 17, 12, 10, 1, 0),
            end: new Date(2019, 5, 17, 14, 13, 10, 0),
          },{
            id: 'work3',
            start: new Date(2019, 5, 18, 12, 2, 1, 0),
            end: new Date(2019, 5, 18, 14, 3, 10, 0),
          },
        ],
      }}
    />
  ));
