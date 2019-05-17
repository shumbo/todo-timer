import totalWorkTime from '../totalWorkTime';
import { History } from '../../../models/task.model';
import { addMinutes } from 'date-fns';

describe('totalWorkTime', () => {
  it('should return zero for an empty array', () => {
    expect(totalWorkTime([])).toEqual(0);
  });
  it('should correctly calculate the sum', () => {
    const now = new Date();
    const arr: History[] = [
      {
        id: 'id1',
        start: now,
        end: addMinutes(now, 10),
      },
      {
        id: 'id2',
        start: addMinutes(now, 20),
        end: addMinutes(now, 23),
      },
    ];
    expect(totalWorkTime(arr)).toEqual((10 + 3) * 60 * 1000);
  });
});
