import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Form from './form/Form';
import Profile from './profile/Profile';
import Modal from './Modal';

const App = () => {
    return (
        <div>
          <BrowserRouter>
            <div>
              <Route path="/" exact component={Profile} />
              <Route path="/edit" component={Modal} />
            </div>
          </BrowserRouter>
        </div>
    );
}

export default App;
