import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import BasicForm from './form/BasicForm';
import Profile from './profile/Profile';
import AddExperience from './form/AddExperience';
import EditExperience from './form/EditExperience';

const App = () => {
    return (
        <div>
          <BrowserRouter>
            <div>
              <Route path="/" component={Profile} />
              <Route path="/basic_edit" component={BasicForm} />
              <Route path="/experience_add" component={AddExperience} />
              <Route path="/experience_edit/:entry" render={(props)=> <EditExperience {...props} />} /> 
            </div>
          </BrowserRouter>
        </div>
    );
}

export default App;
