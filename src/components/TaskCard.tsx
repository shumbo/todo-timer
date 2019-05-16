import * as React from 'react';
import { Pane, Text, Button } from 'evergreen-ui';

import { Task, Status } from '../models/task.model';

interface Props {
  task: Task;
  onComplete?: React.MouseEventHandler;
  onStart?: React.MouseEventHandler;
}
const TaskCard: React.SFC<Props> = ({ task, onComplete, onStart }) => (
  <Pane
    elevation={1}
    marginTop="0.6rem"
    padding="1em"
    display="flex"
    justifyContent="space-between"
  >
    <Pane flex={1} display="flex" alignItems="center">
      <Text>{task.title}</Text>
    </Pane>
    <Pane display="flex">
      {(() => {
        switch (task.status) {
          case Status.TODO:
            return (
              <>
                <Button intent="success" onClick={onStart} marginRight=".6rem">
                  Start
                </Button>
                <Button
                  intent="success"
                  appearance="primary"
                  onClick={onComplete}
                >
                  Complete
                </Button>
              </>
            );
          case Status.DONE:
              return (
                <>
                  <Button disabled>Done</Button>
                </>
              )
        }
      })()}
    </Pane>
  </Pane>
);

export default TaskCard;
