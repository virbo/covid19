import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Layout from "./views/layouts";

function App() {
  return (
      <BrowserRouter>
        <Route path={'/'} name={'Index'} component={Layout} />
      </BrowserRouter>
  );
}

export default App;
