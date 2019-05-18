import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TaskCardMenu from '../TaskCardMenu';

storiesOf('TaskCardMenu', module).add('default', () => (
  <TaskCardMenu
    onDelete={action('onDelete')}
    onEdit={action('onEdit')}
    openHistory={action('openHistory')}
  />
));
