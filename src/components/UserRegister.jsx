import React, {Component} from 'react';
import axios from 'axios';

class UserRegister extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      validationErrors: '',
      successMessages: ''
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  handleFormChange(event) {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({
      [key]: value
    })
  }

  handleFormSubmit(event) {
    event.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        validationErrors: 'Passwords do not match'
      });
    }
    else {
      this.setState({
        validationErrors: ''
      });

      this.createAccount();
    }
  }

  createAccount() {
    let self = this;

    axios.post(this.props.baseUrl + '/user/register?_format=json', {
      name: [{"value": self.state.username}],
      mail: [{"value": self.state.email}],
      pass: [{"value": self.state.password}]
    })
    .then(function () {
      self.setState({
        successMessages: 'Account created',
        validationErrors: ''
      });
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
          <input required type="email" name="email" value={this.state.email} onChange={this.handleFormChange} maxLength="100" className="form-control" id="user-register-email" placeholder="Email Address"/>
        </div>
        
        <div className="form-group">
          <input required type="password" name="password" value={this.state.password} onChange={this.handleFormChange} maxLength="100" className="form-control" id="user-register-password" placeholder="Password"/>
        </div>
        
        <div className="form-group">
          <input required type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleFormChange} maxLength="100" className="form-control" id="user-register-confirm-password" placeholder="Confirm Password"/>
        </div>
        
        <div className="text-success">
          {this.state.successMessages}
        </div>
        
        <div className="text-danger" dangerouslySetInnerHTML={{__html: this.state.validationErrors}} />
        
        <button type="submit" className="btn btn-primary">Create Account</button>
        
        <div className="form-group">
          <a href="#">Already have an account?</a>
        </div>
        
      </form>
    );
  }

}

export default UserRegister
