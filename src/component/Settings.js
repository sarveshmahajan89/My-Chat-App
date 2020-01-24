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

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChatLink: true,
            themeRadio: services.IS_SETTINGS_CHANGED ? services.UPDATED_SETTINGS.theme : services.DEFAULT_SETTINGS.theme,
            timeFormat: services.IS_SETTINGS_CHANGED ? services.UPDATED_SETTINGS.timeFormat : services.DEFAULT_SETTINGS.timeFormat,
            sendMsgCtrlEntr: services.IS_SETTINGS_CHANGED ? services.UPDATED_SETTINGS.sendMsgCtrlEntr : services.DEFAULT_SETTINGS.sendMsgCtrlEntr,
            language: services.IS_SETTINGS_CHANGED ? services.UPDATED_SETTINGS.language : services.DEFAULT_SETTINGS.language,
            userName: props.loginUser.userName,
            theme: getTheme()
        };
        this.handleClick = this.handleClick.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeTheme = this.changeTheme.bind(this);
        this.changeTimeFormat = this.changeTimeFormat.bind(this);
        this.changeSendMethod = this.changeSendMethod.bind(this);
        this.updateSettingPage = this.updateSettingPage.bind(this);
        this.reset = this.reset.bind(this);
    };

    handleClick = (flag) => {
        this.setState({
            showChatLink: flag
        });
    };

    updateSettingPage = (setting) => {
        for (let item in services.DEFAULT_SETTINGS ) {
            if (setting.hasOwnProperty(item)) {
                services.UPDATED_SETTINGS[item] = setting[item];
                services.IS_SETTINGS_CHANGED = true;
                this.setState({
                    theme: getTheme()
                });
            }
        }
    };

    changeLanguage = (e) => {
        this.setState({
            language: e.target.value
        });
        this.props.updateSettings({'language': e.target.value});
    };

    reset = () => {
        this.props.updateSettings('reset');
        this.updateSettingPage({'theme': services.UPDATED_SETTINGS.theme});
    };
    changeName = (e) => {
        this.setState({
            userName: e.target.value
        });
    };
    changeTheme = (e) => {
        this.setState({
            themeRadio: e.target.value
        });
        this.props.updateSettings({'theme': e.target.value});
        this.updateSettingPage({'theme': e.target.value});
    };
    changeTimeFormat = (e) => {
        this.setState({
            timeFormat: e.target.value
        });
        this.props.updateSettings({'timeFormat': e.target.value});
        this.updateSettingPage({'timeFormat': e.target.value});
    };
    changeSendMethod = (e) => {
        this.setState({
            sendMsgCtrlEntr: e.target.value
        });
        this.props.updateSettings({'sendMsgCtrlEntr': e.target.value});
        this.updateSettingPage({'sendMsgCtrlEntr': e.target.value});
    };
    render() {
        return (
                <div style={this.state.theme.container} className="col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-12 comments-main pt-1 workarea">
                    <ul className="p-0">
                        <li>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-12 mb-2 text-center">
                                    <h4 className="m-0">
                                        Settings
                                    </h4>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row comments mb-2">
                                <div className="col-md-2 col-sm-2 col-3 user-img">
                                    <img id="profile-photo" src={this.props.loginUser.profileLink} alt="profile icon" className="rounded-circle"/>
                                </div>
                                <div className="col-md-9 col-sm-9 col-9 mb-2 users-list pt-3">
                                    <input type="text" id="user-name" name="username" className="" value={this.state.userName} onChange={this.changeName} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div className="col-12  pt-4">
                                    {/*<h6>Interface Color</h6>*/}
                                    <span className="label label-primary">Interface Color</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div className="col-12  ">
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input radio-opt" id="theme-light" value="light"
                                               checked={this.state.themeRadio === "light"} onChange={this.changeTheme} />
                                        <label className="custom-control-label radio-opt" htmlFor="theme-light">Light</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input radio-opt" id="theme-dark" value="dark"
                                               checked={this.state.themeRadio === "dark"} onChange={this.changeTheme} />
                                        <label className="custom-control-label radio-opt" htmlFor="theme-dark">Dark</label>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div className="col-12  pt-4">
                                    <span className="label label-primary">Clock display</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12  ">
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input radio-opt" id="clock12" value="12hrs"
                                               checked={this.state.timeFormat == "12hrs"} onChange={this.changeTimeFormat} />
                                        <label className="custom-control-label radio-opt" htmlFor="clock12">12 Hours</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input radio-opt" id="clock24" value="24hrs"
                                               checked={this.state.timeFormat == "24hrs"} onChange={this.changeTimeFormat} />
                                        <label className="custom-control-label radio-opt" htmlFor="clock24">24 Hours</label>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div className="col-12  pt-4">
                                    <span className="label label-primary">Send messages on CTRL + ENTER</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12  ">
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input radio-opt" id="send-opt-on" value='true'
                                               checked={this.state.sendMsgCtrlEntr == 'true'} onChange={this.changeSendMethod} />
                                        <label className="custom-control-label radio-opt" htmlFor="send-opt-on">On</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input radio-opt" id="send-opt-off" value='false'
                                               checked={this.state.sendMsgCtrlEntr == 'false'} onChange={this.changeSendMethod} />
                                        <label className="custom-control-label radio-opt" htmlFor="send-opt-off">Off</label>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div className="col-12  pt-4">
                                    <span className="label label-primary">Language</span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12  ">
                                    <div className="form-group dropdn" aria-labelledby="dropdownMenu2">
                                        <select className="form-control" value={this.state.language} onChange={this.changeLanguage} >
                                            <option>English</option>
                                            <option>Dutch</option>
                                            <option>German</option>
                                            <option>Spanish</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="row comments mb-2">
                                <div className="col-md-6 col-sm-12 col-6">
                                    <input onClick={this.reset} className="btn btn-primary" type="submit" value="Reset to default" />
                                </div>
                                <div className="col-md-6 col-sm-12 col-6">
                                    <input className="btn btn-primary" type="submit" value="Cancel" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

        );
    }
}

export default Settings;