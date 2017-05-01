import React, {Component} from 'react';
import axios from 'axios';

class UserLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      keepLoggedIn: false,
      validationErrors: '',
      successMessages: ''
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    
    if (key === 'keepLoggedIn') {
      this.setState({
        keepLoggedIn: !this.state.keepLoggedIn
      });
    }
    else {
      this.setState({
        [key]: value
      });
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();

    let self = this;

    axios.post(this.props.baseUrl + '/user/login?_format=json', {
      name: self.state.username,
      pass: self.state.password
    })
    .then(function (response) {
      self.setState({
        successMessages: 'Login successful',
        validationErrors: ''
      });
      
      if (self.state.keepLoggedIn) {
        localStorage.setItem('username', response.data.current_user.name);
        localStorage.setItem('uid', response.data.current_user.uid);
        localStorage.setItem('csrf_token', response.data.csrf_token);
        localStorage.setItem('logout_token', response.data.logout_token);
        localStorage.setItem('auth', window.btoa(self.state.username + ':' + self.state.password)); 
      }
    })
    .catch(function (error) {
      let errorResponse = error.response.data.message.replace(/(?:\r\n|\r|\n)/g, '<br />');
      self.setState({
        successMessages: '',
        validationErrors: errorResponse
      });
    });
  }

  render() {
    return (
      <form className="user-register text-center" onSubmit={this.handleFormSubmit}>
        
        <div className="form-group">
          <input required type="text" name="username" value={this.state.username} onChange={this.handleFormChange} maxLength="100" className="form-control" id="user-register-username" placeholder="Username"/>
        </div>
        
        <div className="form-group">
          <input required type="password" name="password" value={this.state.password} onChange={this.handleFormChange} maxLength="100" className="form-control" id="user-register-password" placeholder="Password"/>
        </div>
        
        <div className="form-check">
          <label className="form-check-label">
            <input type="checkbox" name="keepLoggedIn" value={this.state.keepLoggedIn} onChange={this.handleFormChange} className="form-check-input" id="user-register-keep-logged-in" />
            Keep me logged in
          </label>
        </div>
        
        <div className="text-success">
          {this.state.successMessages}
        </div>
        
        <div className="text-danger" dangerouslySetInnerHTML={{__html: this.state.validationErrors}} />
        
        <button type="submit" className="btn btn-primary">Login</button>
        
        <div className="form-group">
          <a href="#">Don't have an account?</a>
        </div>
        
      </form>
    );
  }

}

export default UserLogin
