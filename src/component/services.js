let services = {
    DEFAULT_SETTINGS: {
        theme: 'light',
        timeFormat: '12hrs',
        sendMsgCtrlEntr: 'false',
        language: 'English',
    },
    UPDATED_SETTINGS: {
        theme: 'light',
        timeFormat: '12hrs',
        sendMsgCtrlEntr: 'false',
        language: 'English',
    },
    IS_SETTINGS_CHANGED: false,
    THEME_COLOR: {
        'light': {
            container: {background: '#fff', color: '#334D5C'},
            header: {background: '#b0dcf4', color: '#334D5C'}
        },
        'dark': {
            container: {background: '#334D5C', color: '#fff'},
            header: {background: '#112d3d', color: '#fff'}
        }
    }
};

export default services;