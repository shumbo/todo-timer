import * as React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { TextInputField } from 'evergreen-ui';

import AddTaskDialog from '../AddTaskDialog';

describe('AddTaskDialog', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<AddTaskDialog />)).toBeTruthy();
  });
  it('should call onChange on type', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<AddTaskDialog onChange={onChange} />);
    act(() => {
      wrapper.find(TextInputField).prop<Function>('onChange')({
        currentTarget: { value: 'poe' },
      });
    });
    expect(onChange).toHaveBeenCalledWith('poe');
  });
});
