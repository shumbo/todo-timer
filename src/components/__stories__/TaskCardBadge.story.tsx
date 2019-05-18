import React from 'react';
import { storiesOf } from '@storybook/react';

import { Status } from '../../models/task.model';
import TaskCardBadge from '../TaskCardBadge';

storiesOf('TaskCardBadge', module)
  .add('TODO', () => <TaskCardBadge status={Status.TODO} />)
  .add('IN PROGRESS', () => <TaskCardBadge status={Status.IN_PROGRESS} />)
  .add('DONE', () => <TaskCardBadge status={Status.DONE} />);
