import * as React from 'react';
import { Pane, Badge } from 'evergreen-ui';

import { Status } from '../models/task.model';

interface Props {
  status: Status;
}

const TaskCardBadge: React.SFC<Props> = ({ status }) => (
  <Pane>
    {(() => {
      switch (status) {
        case Status.TODO:
          return <Badge color="red">Todo</Badge>;
        case Status.IN_PROGRESS:
          return (
            <Badge color="blue">
              In progress
            </Badge>
          );
        case Status.DONE:
          return (
            <Badge color="green">
              Done
            </Badge>
          );
        default:
          return null;
      }
    })()}
  </Pane>
);

export default TaskCardBadge;
