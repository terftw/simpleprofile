import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import BasicForm from './form/BasicForm';
import ExperienceForm from './form/ExperienceForm';
import Profile from './profile/Profile';

const App = () => {
    return (
        <div>
          <BrowserRouter>
            <div>
              <Route path="/" component={Profile} />
              <Route path="/basic_edit" component={BasicForm} />
              <Route path="/experience_add" component={ExperienceForm} />
            </div>
          </BrowserRouter>
        </div>
    );
}

export default App;
