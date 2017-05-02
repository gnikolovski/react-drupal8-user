import React, {Component} from 'react';
import axios from 'axios';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      date: '',
      picture: ''
    };
  }

  componentDidMount() {
    let self = this;
    let auth = localStorage.getItem('auth');
    let uid = localStorage.getItem('uid');
    
    if (auth === undefined && uid === undefined) {
      return false;
    }
    
    axios.get(this.props.baseUrl + '/user/' + uid + '?_format=json', {
      headers: {"Authorization":"Basic " + auth}
    })
    .then(function(result){
      var userDate = new Date(parseInt(result.data.created["0"].value, 10)*1000);
      self.setState({
        'username': result.data.name["0"].value,
        'email': result.data.mail["0"].value,
        'date': userDate.toISOString(),
        'picture': result.data.user_picture["0"] ? result.data.user_picture["0"].url : 'https://dummyimage.com/85x85/000/fff&text=User+Image'
      });
    })
  }

  render() {
    return (
      <ul className="list-group">
        <li className="list-group-item"><img className="rounded-circle" src={this.state.picture} /></li>
        <li className="list-group-item"><span className="badge badge-success">Username:</span> {this.state.username}</li>
        <li className="list-group-item"><span className="badge badge-success">Email:</span> {this.state.email}</li>
        <li className="list-group-item"><span className="badge badge-success">Date:</span> {this.state.date}</li>
      </ul>
    );
  }

}

export default UserProfile
