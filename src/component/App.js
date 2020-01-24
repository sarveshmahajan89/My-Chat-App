import React from "react";
import "./App.scss";
import LoginSelection from "./LoginSelection";
import Chatbox from "./Chatbox";
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loginUser: '',
        contacts: []
    };
    this.handleUserLogin = this.handleUserLogin.bind(this);
  }

  addAvailableUsers(users) {
      this.setState({
          contacts: users
      });
  }

  listen() {
        let self = this;
        socket.on('contactlist', (users)=>{
            self.addAvailableUsers(users);
        });
  }

  componentDidMount() {
      this.listen();
  }

  handleUserLogin = (loginUser) => {
    const availableUsers = this.state.contacts.filter((user) => user.email !== loginUser.email);
    this.setState({
        loginUser: loginUser,
        contacts: availableUsers
    });
  };

  render() {
    return (
      <div className="container">
          {this.state.loginUser ?
              <Chatbox loginUser={this.state.loginUser} contacts={this.state.contacts} /> :
              <LoginSelection loginUser={this.state.loginUser} contacts={this.state.contacts} handleUserLogin={this.handleUserLogin} />
          }
      </div>
    );
  }
}
export default App;