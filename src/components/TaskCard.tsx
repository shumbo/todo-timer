import * as React from 'react';
import {
  distanceInWords,
  differenceInSeconds,
  distanceInWordsStrict,
} from 'date-fns';
import { Pane, Text, Button } from 'evergreen-ui';

import { Task, Status } from '../models/task.model';

const duration = (seconds: number) => distanceInWordsStrict(0, seconds * 1000);

interface Props {
  task: Task;
  onComplete?: () => void;
  onStart?: () => void;
  onStop?: () => void;
}
const TaskCard: React.SFC<Props> = ({ task, onComplete, onStart, onStop }) => (
  <Pane
    elevation={1}
    marginTop="0.6rem"
    padding="1em"
    display="flex"
    justifyContent="space-between"
  >
    <Pane flex={1} display="flex" flexDirection="column">
      <Pane>
        <Text>{task.title}</Text>
      </Pane>
      {task.history.length > 0 && (
        <Pane>
          <Text>
            Spent
            {' ' +
              duration(
                task.history.reduce(
                  (a, { start, end }) => a + differenceInSeconds(end, start),
                  0
                )
              )}
          </Text>
        </Pane>
      )}
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
          case Status.IN_PROGRESS:
            return (
              <>
                <Button intent="danger" onClick={onStop} marginRight=".6rem">
                  Stop
                </Button>
                <Button
                  intent="success"
                  appearance="primary"
                  onClick={() => {
                    onStop && onStop();
                    onComplete && onComplete();
                  }}
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
            );
        }
      })()}
    </Pane>
  </Pane>
);

export default TaskCard;
