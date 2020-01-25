import React from "react";
import emojiObj from "./emoji.json";

class EmojiDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.selectEmoji = this.selectEmoji.bind(this);
    };

    selectEmoji = (e) => {
        const field = '<i contentEditable="false" class="'+e.target.className+'"></i>';
        document.querySelector('.input').insertAdjacentHTML('beforeend', field);

    };

    renderEmoji() {
        return emojiObj.map((emoji, index) => {
            return (
                <React.Fragment key={'emoji-'+index}>
                    <li onClick={this.selectEmoji} key={'emoji-'+index} className="emoji" data-clipboard-text={emoji.text}><i className={emoji.class}></i></li>
                </React.Fragment>
            );
        });
    }
    render() {
        return (
            <div className="emoji-dashboard">
                <ul className="emojis">
                    {
                        this.renderEmoji()
                    }
                </ul>
            </div>
        );
    }
}

export default EmojiDashboard;