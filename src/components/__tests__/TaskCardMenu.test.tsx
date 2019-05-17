import * as React from 'react';
import { shallow, mount } from 'enzyme';
import TaskCardMenu from '../TaskCardMenu';

describe('TaskCardMenu', () => {
  it('should render without throwing an error', () => {
    expect(
      shallow(
        <TaskCardMenu
          openHistory={jest.fn()}
          onDelete={jest.fn()}
          onEdit={jest.fn()}
        />
      )
    ).toBeTruthy();
  });
});
