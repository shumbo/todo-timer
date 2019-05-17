import { differenceInMilliseconds } from 'date-fns';
import { History } from '../../models/task.model';

/**
 * Return total work time from an array of history
 * @param logs An array of history objects
 */
export default function totalWorkTime(logs: History[]) {
  return logs.reduce(
    (accm, curr) => accm + differenceInMilliseconds(curr.end, curr.start),
    0
  );
}
