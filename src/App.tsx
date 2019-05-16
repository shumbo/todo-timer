import * as React from 'react';
import { Pane } from 'evergreen-ui';

import Tasks from './containers/Tasks';
import Toolbar from './containers/Toolbar';

const App = () => (
  <Pane display="flex" justifyContent="center">
    <Pane maxWidth="100%" width="640px">
      <Toolbar />
      <Tasks />
    </Pane>
  </Pane>
);

export default App;
