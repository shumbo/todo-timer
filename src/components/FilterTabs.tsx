import * as React from 'react';
import { TabNavigation, Tab } from 'evergreen-ui';
import { Filter, Status } from '../models/task.model';

interface Props {
  filter: Filter;
  onSelect: (filter: Filter) => void;
}

const FilterTabs: React.SFC<Props> = ({ filter, onSelect }) => (
  <TabNavigation>
    <Tab
      name="ALL"
      isSelected={filter === null}
      onSelect={() => onSelect(null)}
    >
      ALL
    </Tab>
    <Tab
      name="IN_PROGRESS"
      isSelected={filter === Status.IN_PROGRESS}
      onSelect={() => onSelect(Status.IN_PROGRESS)}
    >
      IN PROGRESS
    </Tab>
    <Tab
      name="TODO"
      isSelected={filter === Status.TODO}
      onSelect={() => onSelect(Status.TODO)}
    >
      TODO
    </Tab>
    <Tab
      name="DONE"
      isSelected={filter === Status.DONE}
      onSelect={() => onSelect(Status.DONE)}
    >
      DONE
    </Tab>
  </TabNavigation>
);

export default FilterTabs;
