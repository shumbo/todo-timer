import * as React from 'react';
import { Pane, TextInputField, Select } from 'evergreen-ui';

import { Task, Status } from '../models/task.model';

interface Props {
  task: Task;
  onChange?: (task: Task) => void;
}
const EditTaskDialog: React.SFC<Props> = props => {
  const [task, setTask] = React.useState<Task>(props.task);
  React.useEffect(() => {
    props.onChange && props.onChange(task);
  }, [task]);
  return (
    <Pane>
      <TextInputField
        label="Title"
        placeholder="Buy eggs"
        required
        value={task.title}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setTask({ ...task, title: event.currentTarget.value });
        }}
      />
      {task.status !== Status.IN_PROGRESS && (
        <Select
          value={task.status}
          onChange={(event: React.FormEvent<HTMLSelectElement>) => {
            let newStatus: Status;
            switch (parseInt(event.currentTarget.value)) {
              case Status.TODO:
                newStatus = Status.TODO;
                break;
              case Status.DONE:
                newStatus = Status.DONE;
                break;
              default:
                return;
            }
            setTask({ ...task, status: newStatus });
          }}
        >
          <option value={Status.TODO}>TODO</option>
          <option value={Status.DONE}>DONE</option>
        </Select>
      )}
    </Pane>
  );
};

export default EditTaskDialog;
