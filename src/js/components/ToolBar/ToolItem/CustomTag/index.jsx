import React from 'react';
import { Tag } from 'antd';
/* eslint-disable */ 
const { CheckableTag } = Tag;
export default class CustomTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        };
    }

    onHandleChange = (isChecked) => {
        const { onToggleStyle, type } = this.props;
        this.setState({
            isChecked
        });
        let a = onToggleStyle(type);
        console.log(a);
    }

    render() {
        const { onHandleChange, type } = this.props;
        return (
            <CheckableTag
                checked={this.state.isChecked}
                onChange={() => this.onHandleChange(!this.state.isChecked)}
            >
                { this.props.children }
            </CheckableTag>
        );
    }
}
