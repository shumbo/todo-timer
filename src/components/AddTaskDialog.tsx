import * as React from 'react';
import { Pane, TextInputField } from 'evergreen-ui';

interface Props {
  onChange?: (title: string) => void;
}
const AddTaskDialog: React.FC<Props> = props => {
  const [title, setTitle] = React.useState('');
  return (
    <Pane>
      <TextInputField
        label="Title"
        placeholder="Buy eggs"
        required
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
