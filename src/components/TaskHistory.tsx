import * as React from 'react';
import { Pane, Paragraph, Heading } from 'evergreen-ui';
import {
  format,
  distanceInWordsStrict,
  differenceInMilliseconds,
} from 'date-fns';

import { Task } from '../models/task.model';

interface Props {
  task: Task;
}

const TaskHistory: React.SFC<Props> = ({ task }) => (
  <Pane>
    <Heading size={400}>Overview</Heading>
    <Pane marginTop="0.2rem">
      {task.history.length > 0 ? (
        <Paragraph>
          You worked {task.history.length} time
          {task.history.length !== 1 && 's'} and spent{' '}
          {distanceInWordsStrict(
            0,
            task.history.reduce(
              (accm, curr) =>
                accm + differenceInMilliseconds(curr.end, curr.start),
              0
            )
          )}{' '}
          on this task.
        </Paragraph>
      ) : (
        <Paragraph>You have not worked no this task. </Paragraph>
      )}
    </Pane>
    <Heading size={400} marginTop="0.6rem">Details</Heading>
    {task.history.length > 0 ? task.history.map(history => (
      <Paragraph key={history.id} marginTop="0.2rem">
        {format(history.start, 'MM/DD HH:mm:ss')} ~{' '}
        {format(history.end, 'MM/DD HH:mm:ss')}{' '}
        {distanceInWordsStrict(history.end, history.start)}
      </Paragraph>
    )): <Paragraph marginTop="0.2rem">
      Nothing to show. Click "start" to track your time spending.
    </Paragraph>}
  </Pane>
);

export default TaskHistory;
