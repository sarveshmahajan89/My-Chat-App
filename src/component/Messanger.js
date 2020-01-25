import React from "react";
import EmojiDashboard from './EmojiDashboard';
import openSocket from 'socket.io-client';
import services from "./services";

let getTheme = () => {
    let theme = {};
    if(services.IS_SETTINGS_CHANGED) {
        theme = services.THEME_COLOR[services.UPDATED_SETTINGS.theme];
    } else {
        theme = services.THEME_COLOR[services.DEFAULT_SETTINGS.theme]
    }
    return theme
};

const socket = openSocket('http://localhost:3001');

class Messanger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userChat: [{'sent': 'hello', 'timestamp': '1579895783855'}, {'recieve': 'how are you', 'timestamp': '1579895833460'}],
            message: '',
            showEmojiDashboard: false,
            theme: getTheme()
        };
        this.submitMessage = this.submitMessage.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleEmojiDashboard = this.handleEmojiDashboard.bind(this);
        this.getSelectedEmoji = this.getSelectedEmoji.bind(this);
    }

    sendMsgCtrlEntr(e) {
        return (JSON.parse(services.UPDATED_SETTINGS.sendMsgCtrlEntr) && e.type === 'keypress' && e.ctrlKey && e.which === 13);
    }

    submitMessage = (e) => {
        if(e.type === 'click' || this.sendMsgCtrlEntr(e)) {
            const newMessage = {'sent': document.getElementById('input-chat').innerHTML};
            if(newMessage) {
                var reqObj = {'sourceUser': this.props.loginUser.email, 'destinationUser': this.props.selectedUser.email, 'message': newMessage.sent};
                this.setState({
                    userChat: [...this.state.userChat, newMessage]
                });
                socket.emit('chat message', reqObj);
                document.getElementById('input-chat').innerHTML = '';
            }
        }
    };

    componentWillMount() {
        this.listen();
    }

    handleEmojiDashboard() {
        this.setState(prevState => ({
            showEmojiDashboard: !prevState.showEmojiDashboard
        }));
    }

    getSelectedEmoji = (target) => {

    };

    handleValueChange(event) {
        this.setState({
            message: event.target.value
        });
    }

    addChat(newMessage) {
        this.setState({
            userChat: [...this.state.userChat, newMessage]
        });
    }

    listen() {
        let self = this;

        socket.on(this.props.loginUser.email, (msg)=>{
            const newMessage = {'recieve': msg.message};
            self.addChat(newMessage);
        });
    }

    updateTime(k) {
        if (k < 10) {
            return "0" + k;
        }
        else {
            return k;
        }
    }

    getTime(timestamp) {
        let date = new Date(Number(timestamp)),
            hour = date.getHours(),
            min = date.getMinutes(),
            day = date.getDate(),
            month = date.getMonth()+1 ,
            midday = "AM",
            time;

        let timeFormat = services.IS_SETTINGS_CHANGED ? services.UPDATED_SETTINGS.timeFormat : services.DEFAULT_SETTINGS.timeFormat

        if(timeFormat === '12hrs') {
            midday = "AM";
            midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
            hour = (hour === 0) ? 12 : ((hour > 12) ? (hour - 12): hour); /* assigning hour in 12-hour format */
        }

        hour = this.updateTime(hour);
        min = this.updateTime(min);
        time = timeFormat === '12hrs' ? (day + '/' +  month + ', ' + hour + " : " + min + " : " + midday) : (day + '/' +  month + ', ' + hour + " : " + min);
        return time;
    }
    createMarkup(text) { return {__html: text}; };

    renderUserChat(newMessage) {
        let self = this;
        const loginUser = self.props.loginUser;

        return this.state.userChat.map((chat, index) => {
            return (
                <React.Fragment key={'message-'+index}>
                    {chat.recieve && <li>
                        <div className="row comments mb-2">
                            <div className="col-md-2 col-sm-2 col-2 text-center user-img">
                                <img id="profile-photo" src={this.props.selectedUser.profileLink} alt="profile icon" className="rounded-circle"/>
                            </div>
                            <div className="col-md-7 col-sm-7 col-8 comment rounded mb-2">
                                <h4 className="m-0"><a >{this.props.selectedUser.userName}</a></h4>
                                <time className="text-white ml-3">{this.getTime(chat.timestamp)}</time>
                                <p className="mb-0 text-white" dangerouslySetInnerHTML={this.createMarkup(chat.recieve)}></p>
                            </div>
                        </div>
                    </li>}
                    {chat.sent && <ul className="p-0">
                        <li>
                            <div className="row comments mb-2">
                                <div className="col-md-7 offset-md-2 col-sm-7 offset-sm-1 col-8 offset-1 comment rounded mb-2">
                                    <h4 className="m-0"><a >{loginUser.userName}</a></h4>
                                    <time className="text-white ml-3">{this.getTime(chat.timestamp)}</time>
                                    <p className="mb-0 text-white" dangerouslySetInnerHTML={this.createMarkup(chat.sent)}></p>
                                </div>
                                <div className="col-md-2 col-sm-2 col-2 text-center user-img">
                                    <img id="profile-photo" src={loginUser.profileLink} alt="profile icon" className="rounded-circle"/>
                                </div>
                            </div>
                        </li>
                    </ul>}
                </React.Fragment>
            );
        });
    }

    render() {
        return (
                <div className="row">
                    <div style={this.state.theme.container} className="col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-12 comments-main pt-4 workarea">
                        <div className="chat-box-area">
                            <ul className="p-0">
                            {this.renderUserChat()}
                            </ul>
                        </div>
                        <div className="row comment-box-main p-3 rounded-bottom chat-inp">
                            <div onClick={()=> this.handleEmojiDashboard()} className="emoji">
                                {this.state.showEmojiDashboard && <EmojiDashboard getSelectedEmoji={this.getSelectedEmoji} />}
                            </div>
                            <div className="chat-input">
                                <div id="input-chat" onKeyPress={this.submitMessage} className="input" contentEditable="true"></div>
                            </div>
                            <div className=" opts">
                                <a onClick={this.submitMessage} className="send"></a>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
export default Messanger;