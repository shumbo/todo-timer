import * as React from 'react';
import { Pane, TextInputField } from 'evergreen-ui';

import { Task } from '../models/task.model';

interface Props {
  task?: Task;
  onChange?: (title: string) => void;
}
const AddTaskDialog: React.SFC<Props> = props => {
  const [title, setTitle] = React.useState(props.task ? props.task.title : '');
  return (
    <Pane>
      <TextInputField
        label="Title"
        placeholder="Buy eggs"
        value={title}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setTitle(event.currentTarget.value);
          props.onChange && props.onChange(event.currentTarget.value);
        }}
      />
    </Pane>
  );
};

export default AddTaskDialog;
