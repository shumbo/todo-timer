import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState, RootAction } from '../store';

import { Pane, Alert } from 'evergreen-ui';

import { Task, Filter, TaskId } from '../models/task.model';
import {
  completeTaskAction,
  startTaskAction,
  stopTaskAction,
  editTaskAction,
  deleteTaskAction,
} from '../store/task';

import TaskCard from '../components/TaskCard';

interface PropsFromState {
  tasks: Task[];
  filter: Filter;
}
interface PropsToDispatch {
  complete: (taskId: TaskId) => void;
  start: (taskId: TaskId) => void;
  stop: () => void;
  edit: (task: Task) => void;
  remove: (taskId: TaskId) => void;
}
type Props = PropsFromState & PropsToDispatch;

const Tasks: React.FC<Props> = ({
  tasks,
  complete,
  start,
  stop,
  edit,
  remove,
}) => {
  return (
    <Pane>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={() => complete(task.id)}
            onStart={() => start(task.id)}
            onStop={() => stop()}
            onEdit={task => edit(task)}
            onDelete={() => remove(task.id)}
          />
        ))
      ) : (
        <Alert
          intent="none"
          title="No Applicable Tasks"
          marginTop="1rem"
        />
      )}
    </Pane>
  );
};

const mapStateToProps = (state: RootState): PropsFromState => ({
  tasks: state.task.tasks
    .filter(task =>
      state.task.filter !== null ? state.task.filter === task.status : task
    )
    .sort((a, b) => a.status - b.status),
  filter: state.task.filter,
});
const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): PropsToDispatch => ({
  complete: (taskId: TaskId) => dispatch(completeTaskAction(taskId)),
  start: (taskId: TaskId) => dispatch(startTaskAction(taskId)),
  stop: () => dispatch(stopTaskAction()),
  edit: (task: Task) => dispatch(editTaskAction(task)),
  remove: (taskId: TaskId) => dispatch(deleteTaskAction(taskId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
