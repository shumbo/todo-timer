import * as React from 'react';
import { Pane, Paragraph, Heading } from 'evergreen-ui';
import { format, distanceInWordsStrict } from 'date-fns';

import { Task, History } from '../models/task.model';
import { totalWorkTime } from '../utils/totalWorkTime';

export function workSummary(history: History[]): string {
  if (history.length > 0) {
    return `You worked ${history.length} time${
      history.length !== 1 ? 's' : ''
    } and spent ${distanceInWordsStrict(
      0,
      totalWorkTime(history)
    )} on this task.`;
  }
  return 'You have not worked no this task.';
}

interface Props {
  task: Task;
}

const TaskHistory: React.FC<Props> = ({ task }) => (
  <Pane>
    <Heading size={400}>Overview</Heading>
    <Pane marginTop="0.2rem">
      <Paragraph>{workSummary(task.history)}</Paragraph>
    </Pane>
    <Heading size={400} marginTop="0.6rem">
      Details
    </Heading>
    {task.history.length > 0 ? (
      task.history.map(history => (
        <Paragraph
          className="historyListElement"
          key={history.id}
          marginTop="0.2rem"
        >
          {format(history.start, 'MM/DD HH:mm:ss')} ~{' '}
          {format(history.end, 'MM/DD HH:mm:ss')}{' '}
          {distanceInWordsStrict(history.end, history.start)}
        </Paragraph>
      ))
    ) : (
      <Paragraph marginTop="0.2rem">
        Nothing to show. Click "start" to track your time spending.
      </Paragraph>
    )}
  </Pane>
);

export default TaskHistory;
