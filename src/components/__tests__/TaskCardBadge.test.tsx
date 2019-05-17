import * as React from 'react';
import { shallow, render, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Badge } from 'evergreen-ui';
import TaskCardBadge from '../TaskCardBadge';
import { Status } from '../../models/task.model';

describe('TaskCardBadge', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<TaskCardBadge status={Status.TODO} />)).toBeTruthy();
  });
  it('should display correct state', () => {
    const wrapper = shallow(<TaskCardBadge status={Status.TODO} />);
    expect(
      wrapper
        .find(Badge)
        .render()
        .text()
    ).toEqual('Todo');
    wrapper.setProps({ status: Status.IN_PROGRESS });
    expect(
      wrapper
        .find(Badge)
        .render()
        .text()
    ).toEqual('In progress');
    wrapper.setProps({ status: Status.DONE });
    expect(
      wrapper
        .find(Badge)
        .render()
        .text()
    ).toEqual('Done');
    wrapper.setProps({ status: 'rando' });
    expect(wrapper).toEqual({});
  });
});
