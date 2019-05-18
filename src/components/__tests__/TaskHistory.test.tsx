import * as React from 'react';
import { shallow } from 'enzyme';
import TaskHistory, { workSummary } from '../TaskHistory';
import { Status } from '../../models/task.model';
import { addMinutes } from 'date-fns';

describe('workSummary', () => {
  it('should return message for no history', () => {
    expect(workSummary([])).toEqual('You have not worked no this task.');
  });
  it('should summarize one work', () => {
    const now = new Date();
    expect(
      workSummary([
        {
          id: 'id1',
          start: now,
          end: addMinutes(now, 10),
        },
      ])
    ).toEqual('You worked 1 time and spent 10 minutes on this task.');
  });
  it('should summarize two or more work', () => {
    const now = new Date();
    expect(
      workSummary([
        {
          id: 'id1',
          start: now,
          end: addMinutes(now, 10),
        },
        {
          id: 'id2',
          start: addMinutes(now, 20),
          end: addMinutes(now, 30),
        },
        {
          id: 'id3',
          start: addMinutes(now, 60),
          end: addMinutes(now, 120),
        },
      ])
    ).toEqual('You worked 3 times and spent 1 hour on this task.');
  });
});

describe('TaskHistory', () => {
  it('should render without throwing an error', () => {
    expect(
      shallow(
        <TaskHistory
          task={{ id: 'id', title: 'demo', history: [], status: Status.TODO }}
        />
      )
    ).toBeTruthy();
  });
  it('should render history details', () => {
    const now = new Date();
    expect(
      shallow(
        <TaskHistory
          task={{
            id: 'id',
            title: 'demo',
            status: Status.TODO,
            history: [
              {
                id: 'id1',
                start: now,
                end: addMinutes(now, 10),
              },
              {
                id: 'id2',
                start: addMinutes(now, 20),
                end: addMinutes(now, 30),
              },
              {
                id: 'id3',
                start: addMinutes(now, 60),
                end: addMinutes(now, 120),
              },
            ],
          }}
        />
      ).find('.historyListElement').length
    ).toEqual(3);
  });
});
