import React, { Component } from 'react';

import UserRegister from './components/UserRegister.jsx';

class App extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <UserRegister baseUrl="http://www.your-drupal-8-backend.com" />
        </div>
      </div>
    );
  }
}

export default App;
