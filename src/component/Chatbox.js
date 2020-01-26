import React from "react";
import UserSelection from "./UserSelection";
import Messanger from "./Messanger";
import Toolbar from "./Toolbar";
import openSocket from 'socket.io-client';
import Toast from 'light-toast';

const socket = openSocket('http://localhost:3001');

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessanger: false,
            showSettings: false,
            selectedUser: [],
            availableUsers: []
        };
        this.handleUserSelection = this.handleUserSelection.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
        this.goChatBoxPage = this.goChatBoxPage.bind(this);
    };

    emit() {
        socket.emit('login', {userId: this.props.loginUser.email});
    }

    addAvailableUsers(users) {
        let availableUsersDetails = [];
        const usersExcludingLoginUser = users.filter((user) => user !== this.props.loginUser.email);
        for(let i in usersExcludingLoginUser) {
            availableUsersDetails.push(this.props.contacts.find((user) => user.email === usersExcludingLoginUser[i]));
        }

        this.setState({
            availableUsers: availableUsersDetails
        });
    }

    listen() {
        let self = this;
        socket.on('loginUsers', (users)=>{
            self.addAvailableUsers(users);
        });
        socket.on('userAlreadyLoggedIn', (user)=>{
            console.error(user.user + ' is already logged in');
            Toast.fail(user.user + ' is already logged in, please refresh and try again with different user', 2500);
        });
    }

    componentDidMount() {
        this.listen();
    }

    UNSAFE_componentWillMount() {
        this.emit();
    }
    updateSettings = (flag) => {
        this.setState({
            showSettings: flag
        });
    };

    goChatBoxPage = (flag) => {
        this.setState({
            showMessanger: !flag
        });
    };

    handleUserSelection = (selectedUser) => {
        if(selectedUser) {
            this.setState({
                showMessanger: true,
                selectedUser: selectedUser
            });
        }
    };

    render() {
        return (
            <div>
                <Toolbar loginUser={this.props.loginUser} updateSettings={this.updateSettings} goChatBoxPage={this.goChatBoxPage} />
                {!this.state.showSettings && (this.state.showMessanger ?
                    <Messanger loginUser={this.props.loginUser} selectedUser={this.state.selectedUser}/> :
                    <UserSelection contacts={this.state.availableUsers} handleUserSelection={this.handleUserSelection}/>)
                }
            </div>
        );
    }
}
export default Chatbox;