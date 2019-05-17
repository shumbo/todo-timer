import * as React from 'react';
import { differenceInSeconds, distanceInWordsStrict } from 'date-fns';
import { Pane, Text, Button, Dialog, Heading } from 'evergreen-ui';

import { Task, Status } from '../models/task.model';
import EditTaskDialog from './EditTaskDialog';
import TaskCardBadge from './TaskCardBadge';
import TaskCardMenu from './TaskCardMenu';
import TaskHistory from './TaskHistory';

const duration = (seconds: number) => distanceInWordsStrict(0, seconds * 1000);

interface Props {
  task: Task;
  onComplete?: () => void;
  onStart?: () => void;
  onStop?: () => void;
  onEdit?: (task: Task) => void;
  onDelete?: () => void;
}
const TaskCard: React.SFC<Props> = ({
  task,
  onComplete,
  onStart,
  onStop,
  onEdit,
  onDelete,
}) => {
  const [visibleEditDialog, setVisibleEditDialog] = React.useState(false);
  const [visibleHistoryDialog, setVisibleHistoryDialog] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task>(task);
  return (
    <>
      <Pane
        elevation={1}
        marginTop="0.6rem"
        padding="1em"
        display="flex"
        justifyContent="space-between"
      >
        <Pane flex={1} display="flex" flexDirection="column" marginRight="0.4rem">
          <Pane>
            <TaskCardBadge status={task.status} />
            <Heading marginTop="0.4rem">{task.title}</Heading>
          </Pane>
          {task.history.length > 0 && (
            <Pane marginTop="0.4rem">
              <Text>
                Spent
                {' ' +
                  duration(
                    task.history.reduce(
                      (a, { start, end }) =>
                        a + differenceInSeconds(end, start),
                      0
                    )
                  )}
              </Text>
            </Pane>
          )}
        </Pane>
        <Pane display="flex" alignItems="top">
          {(() => {
            switch (task.status) {
              case Status.TODO:
                return (
                  <>
                    <Button
                      intent="success"
                      onClick={onStart}
                      marginRight=".6rem"
                    >
                      Start
                    </Button>
                    <Button
                      intent="success"
                      appearance="primary"
                      onClick={onComplete}
                      marginRight=".6rem"
                    >
                      Complete
                    </Button>
                  </>
                );
              case Status.IN_PROGRESS:
                return (
                  <>
                    <Button
                      intent="danger"
                      onClick={onStop}
                      marginRight=".6rem"
                    >
                      Stop
                    </Button>
                    <Button
                      intent="success"
                      appearance="primary"
                      onClick={() => {
                        onStop && onStop();
                        onComplete && onComplete();
                      }}
                      marginRight=".6rem"
                    >
                      Complete
                    </Button>
                  </>
                );
            }
          })()}
          <TaskCardMenu
            openHistory={() => setVisibleHistoryDialog(true)}
            onEdit={() => setVisibleEditDialog(true)}
            onDelete={() => onDelete && onDelete()}
          />
        </Pane>
      </Pane>
      <Dialog
        isShown={visibleEditDialog}
        title="Edit Task"
        onCloseComplete={() => setVisibleEditDialog(false)}
        onConfirm={() =>
          onEdit && onEdit(editingTask) && setVisibleEditDialog(false)
        }
        isConfirmDisabled={editingTask.title === ''}
      >
        <EditTaskDialog task={task} onChange={task => setEditingTask(task)} />
      </Dialog>
      <Dialog
        isShown={visibleHistoryDialog}
        title="History"
        onCloseComplete={() => setVisibleHistoryDialog(false)}
        hasCancel={false}
        confirmLabel="OK"
      >
        <TaskHistory task={task} />
      </Dialog>
    </>
  );
};

export default TaskCard;
