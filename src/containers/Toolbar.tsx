import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState, RootAction } from '../store';

import { Pane, TabNavigation, Tab, Button, Dialog } from 'evergreen-ui';

import { Filter, Status } from '../models/task.model';
import { addTaskAction, setFilterAction } from '../store/task';
import AddTaskDialog from '../components/AddTaskDialog';

interface PropsFromState {
  filter: Filter;
}
interface PropsToDispatch {
  add: (title: string) => void;
  setFilter: (filter: Filter) => void;
}
type Props = PropsFromState & PropsToDispatch;

interface State {
  addDialogVisible: boolean;
  newTaskTitle: string;
}
const initialState: State = {
  addDialogVisible: false,
  newTaskTitle: '',
};

const Toolbar: React.SFC<Props> = ({ add, filter, setFilter }) => {
  const [state, setState] = React.useState<State>(initialState);
  return (
    <>
      <Pane marginTop="1rem" display="flex" justifyContent="space-between">
        <TabNavigation>
          <Tab isSelected={filter === null} onSelect={() => setFilter(null)}>
            ALL
          </Tab>
          <Tab
            isSelected={filter === Status.IN_PROGRESS}
            onSelect={() => setFilter(Status.IN_PROGRESS)}
          >
            IN PROGRESS
          </Tab>
          <Tab
            isSelected={filter === Status.TODO}
            onSelect={() => setFilter(Status.TODO)}
          >
            TODO
          </Tab>
          <Tab
            isSelected={filter === Status.DONE}
            onSelect={() => setFilter(Status.DONE)}
          >
            DONE
          </Tab>
        </TabNavigation>
        <Button onClick={() => setState({ ...state, addDialogVisible: true })}>
          Add Task
        </Button>
      </Pane>
      <Dialog
        isShown={state.addDialogVisible}
        onCloseComplete={() => setState({ ...state, addDialogVisible: false })}
        onConfirm={() => {
          add(state.newTaskTitle);
          setState({ ...state, addDialogVisible: false });
        }}
        isConfirmDisabled={state.newTaskTitle === ''}
        title="New Task"
      >
        <AddTaskDialog
          onChange={title => setState({ ...state, newTaskTitle: title })}
        />
      </Dialog>
    </>
  );
};

const mapStateToProps = (state: RootState): PropsFromState => ({
  filter: state.task.filter,
});
const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): PropsToDispatch => ({
  add: (title: string) => dispatch(addTaskAction({ title })),
  setFilter: (filter: Filter) => dispatch(setFilterAction(filter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
