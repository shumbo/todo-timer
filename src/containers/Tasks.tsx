import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState, RootAction } from '../store';

import { Pane } from 'evergreen-ui';

import { Task, Filter, TaskId } from '../models/task.model';
import {
  completeTaskAction,
  startTaskAction,
  stopTaskAction,
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
}
type Props = PropsFromState & PropsToDispatch;

const Tasks: React.SFC<Props> = ({ tasks, complete, start, stop }) => {
  return (
    <>
      <Pane>
        <Pane>
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={() => complete(task.id)}
              onStart={() => start(task.id)}
              onStop={() => stop()}
            />
          ))}
        </Pane>
      </Pane>
    </>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
