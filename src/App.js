import React, { Component } from 'react';

import UserRegister from './components/UserRegister.jsx';
import UserLogin from './components/UserLogin.jsx';
import UserProfile from './components/UserProfile.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <UserRegister baseUrl="http://www.your-drupal-8-backend.com" />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <UserLogin baseUrl="http://www.your-drupal-8-backend.com" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 offset-md-3">
            <UserProfile baseUrl="http://www.your-drupal-8-backend.com" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
