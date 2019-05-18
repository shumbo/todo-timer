import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FilterTabs from '../FilterTabs';
import { Status } from '../../models/task.model';

storiesOf('FilterTabs', module)
  .add('ALL', () => <FilterTabs filter={null} onSelect={action('onSelect')} />)
  .add('IN PROGRESS', () => (
    <FilterTabs filter={Status.IN_PROGRESS} onSelect={action('onSelect')} />
  ))
  .add('TODO', () => <FilterTabs filter={Status.TODO} onSelect={action('onSelect')} />)
  .add('DONE', () => <FilterTabs filter={Status.DONE} onSelect={action('onSelect')} />);
