import React from 'react';
import Helmet from 'react-helmet';
import { SmoothScrollCanvas } from './scroll/SmoothScrollCanvas';

function App() {
  return (
    <>
      <Helmet>
        <title>Chess Scroll Animation</title>
      </Helmet>
      <SmoothScrollCanvas />
    </>
  );
}

export default App;