import * as React from 'react';
import { Button, Modal } from 'antd';

const App = () => {
  const [s, setS] = React.useState<boolean>(false);
  return (
    <>
      <p>Hello, World.</p>
      <Button onClick={() => setS(!s)}>poe</Button>
      <Modal visible={s} onOk={() => setS(!s)}>モーダルの中身</Modal>
    </>
  );
};

export default App;
