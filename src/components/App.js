import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import BasicForm from './form/BasicForm';
import Profile from './profile/Profile';

const App = () => {
    return (
        <div>
          <BrowserRouter>
            <div>
              <Route path="/" component={Profile} />
              <Route path="/basic_edit" component={BasicForm} />
            </div>
          </BrowserRouter>
        </div>
    );
}

export default App;
