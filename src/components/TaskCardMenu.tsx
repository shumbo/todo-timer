import * as React from 'react';
import { Position, IconButton, Popover, Menu } from 'evergreen-ui';

interface Props {
  onEdit: () => void;
  openHistory: () => void;
  onDelete: () => void;
}

const TaskCardMenu: React.FC<Props> = ({ onEdit, onDelete, openHistory }) => (
  <Popover
    position={Position.BOTTOM_LEFT}
    content={
      <Menu>
        <Menu.Group>
          <Menu.Item icon="edit" onSelect={onEdit}>
            Edit...
          </Menu.Item>
          <Menu.Item icon="timeline-bar-chart" onSelect={openHistory}>
            View History
          </Menu.Item>
        </Menu.Group>
        <Menu.Divider />
        <Menu.Group>
          <Menu.Item icon="trash" intent="danger" onSelect={onDelete}>
            Delete...
          </Menu.Item>
        </Menu.Group>
      </Menu>
    }
  >
    <IconButton icon="menu" />
  </Popover>
);

export default TaskCardMenu;
