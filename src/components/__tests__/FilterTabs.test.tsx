import * as React from 'react';
import { shallow, render, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Tab, TabNavigation } from 'evergreen-ui';
import FilterTabs from '../FilterTabs';
import { Status } from '../../models/task.model';

describe('FilterTabs', () => {
  it('should render without throwing an error', () => {
    expect(
      shallow(<FilterTabs filter={null} onSelect={jest.fn()} />)
    ).toBeTruthy();
  });
  it('should highlight the selected tab', () => {
    let wrapper = shallow(<FilterTabs filter={null} onSelect={jest.fn()} />);
    expect(wrapper.find({ name: 'ALL' }).prop('isSelected')).toBe(true);
    wrapper.setProps({filter: Status.IN_PROGRESS});
    expect(wrapper.find({ name: 'IN_PROGRESS' }).prop('isSelected')).toBe(true);
    wrapper.setProps({filter: Status.TODO});
    expect(wrapper.find({ name: 'TODO' }).prop('isSelected')).toBe(true);
    wrapper.setProps({filter: Status.DONE});
    expect(wrapper.find({ name: 'DONE' }).prop('isSelected')).toBe(true);
  });
  it('should call onSelect with appropriate arguments', () => {
    let onSelect = jest.fn();
    let wrapper = shallow(<FilterTabs filter={Status.TODO} onSelect={onSelect} />);
    wrapper.find({ name: 'ALL' }).prop('onSelect')();
    expect(onSelect).toHaveBeenCalledWith(null);

    wrapper.find({ name: 'IN_PROGRESS' }).prop('onSelect')();
    expect(onSelect).toHaveBeenCalledWith(Status.IN_PROGRESS);

    wrapper.find({ name: 'TODO' }).prop('onSelect')();
    expect(onSelect).toHaveBeenCalledWith(Status.TODO);

    wrapper.find({ name: 'DONE' }).prop('onSelect')();
    expect(onSelect).toHaveBeenCalledWith(Status.DONE);
  });
});
