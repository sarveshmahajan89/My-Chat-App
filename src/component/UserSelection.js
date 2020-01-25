import React from "react";
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

class UserSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginOptions: true,
            loginUser: [],
            theme: getTheme()
        };
        this.selectUser = this.selectUser.bind(this);
    };

    selectUser = (selectedUser) => {
        this.setState({
            loginUser: selectedUser
        });

        this.props.handleUserSelection(selectedUser);
    };

    renderUserList() {
        return this.props.contacts.map((user, index) => {
            return (
                <React.Fragment key={'userlist-'+index}>
                    <li onClick={()=>this.selectUser(user)} className={this.state.theme.container.background === '#fff' ? 'users-list-block' : 'users-list-block-dark'}>
                        <div className="row comments mb-2">
                            <div className="col-md-2 col-sm-2 col-3 user-img">
                                <img id="profile-photo+{index}" src={user.profileLink} alt="profile icon" className="rounded-circle"/>
                            </div>
                            <div className="col-md-8 col-sm-7 col-8 mb-2 users-list">
                                <h6 className="m-0">{user.userName}</h6>
                            </div>
                            <div className="col-md-2 col-sm-2 col-2 mb-2 users-list">
                                <svg id={'svg-'+index} height="20" width="20">
                                    <circle cx="10" cy="10" r="6" fill="#64b448"></circle>
                                </svg>
                            </div>
                        </div>
                    </li>
                </React.Fragment>
            );
        });
    }

    render() {
        return (
            <div className="row">
                <div style={this.state.theme.container} className="col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-12 comments-main pt-4 workarea">
                    <ul className="p-0">
                        <li>
                            <div className="col-md-12 col-sm-12 col-12 mb-2 text-center">
                                <h4 className="m-0">
                                    Welcome to My Chat app
                                </h4>
                            </div>
                        </li>
                        <li>
                            <div className="col-md-12 col-sm-12 col-12 mb-4 text-center">
                                <h6 className="m-0">
                                    Please select a user to sart the conversation
                                </h6>
                            </div>
                        </li>
                        {
                            this.renderUserList()
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default UserSelection;