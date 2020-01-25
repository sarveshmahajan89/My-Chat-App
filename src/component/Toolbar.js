import React from "react";
import Settings from "./Settings";
import services from "./services";

const defaultClassChat = 'col-md-2 col-sm-2 col-2 mb-2 text-right toolbar p-1';
const defaultClassSettings = 'col-md-3 col-sm-3 col-3 mb-2 text-right toolbar p-1';

let getTheme = () => {
    let theme = {};
    if(services.IS_SETTINGS_CHANGED) {
        theme = services.THEME_COLOR[services.UPDATED_SETTINGS.theme];
    } else {
        theme = services.THEME_COLOR[services.DEFAULT_SETTINGS.theme]
    }
    return theme
};

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSettings: false,
            theme: getTheme()
        };
        this.optionSelection = this.optionSelection.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
        this.goChatBoxPage = this.goChatBoxPage.bind(this);
    };

    updateSettings = (setting) => {
        if(setting === 'reset') {
            for (let item in services.DEFAULT_SETTINGS ) {
                services.UPDATED_SETTINGS[item] = services.DEFAULT_SETTINGS[item];
            }
            services.IS_SETTINGS_CHANGED = true;
            this.setState({
                theme: getTheme()
            });
        }
        else {
            for (var item in services.DEFAULT_SETTINGS ) {
                if (setting.hasOwnProperty(item)) {
                    services.UPDATED_SETTINGS[item] = setting[item];
                    services.IS_SETTINGS_CHANGED = true;
                    this.setState({
                        theme: getTheme()
                    });
                }
            }
        }
    };

    goChatBoxPage = (flag) => {
        this.props.goChatBoxPage(flag);
    };

    optionSelection = (flag) => {
        this.setState({
            openSettings: flag
        });
        this.props.updateSettings(flag);
    };

    render() {
        return (
            <div className="row mt-3">
                <div style={this.state.theme.header} className="col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-12 pt-2 rounded-top header">
                    <ul className="p-0">
                        <li>
                            <div className="row comments mb-2">
                                <div onClick={()=> this.goChatBoxPage(true)} className="col-md-7 col-sm-7 col-7 user-img">
                                    <span><img id="icon" src="./images/chatting.png" alt="profile icon" className="rounded-circle"/></span>
                                </div>
                                <div onClick={()=> this.optionSelection(false)} className={!this.state.openSettings ? defaultClassChat + ' option-selected' : defaultClassChat}>
                                    <span className="options">Chat</span>
                                </div>
                                <div onClick={()=> this.optionSelection(true)} className={this.state.openSettings ? defaultClassSettings + ' option-selected' : defaultClassSettings}>
                                    <span className="options">Settings</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                {
                 this.state.openSettings && <Settings updateSettings={this.updateSettings} loginUser={this.props.loginUser} />
                }
            </div>
        );
    }
}

export default Toolbar;