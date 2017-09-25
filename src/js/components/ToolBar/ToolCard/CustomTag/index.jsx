import React from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;
export default class CustomTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        };
    }

    onHandleChange = () => {
        this.setState(prevState => ({
            isChecked: !prevState.isChecked
        }));
    }

    render() {
        return (
            <CheckableTag
                {...this.props}
                checked={this.state.isChecked}
                onChange={this.onHandleChange}
            />
        );
    }
}
