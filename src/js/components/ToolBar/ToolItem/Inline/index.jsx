import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import { getSelectionInlineStyle } from 'draftjs-utils';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import CustomBtn from './../CustomBtn';

export default class Inline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStyles: {},
            options: [
                { type: 'bold', title: '加粗' },
                { type: 'italic', title: '斜体' },
                { type: 'underline', title: '下划线' },
                { type: 'strikethrough', title: '删除线' },
                { type: 'subscript', title: '下标' },
                { type: 'superscript', title: '上标' },
                { type: 'code', title: '等宽字形' }
            ]
        };
    }

    componentWillMount() {
        const { editorState } = this.props;
        if (editorState) {
            this.setState({
                currentStyles: this.changeKey(getSelectionInlineStyle(editorState))
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editorState &&
            nextProps.editorState !== this.props.editorState
        ) {
            this.setState({
                currentStyles: this.changeKey(getSelectionInlineStyle(nextProps.editorState))
            });
        }
    }

    onAddInlineStyle = (style) => {
        const { editorState, onEditorStateChange } = this.props;
        const newStyle = style.toUpperCase();
        let newState = RichUtils.toggleInlineStyle(
            editorState,
            newStyle
        );
        if (style === 'subscript' || style === 'superscript') {
            const removeStyle = style === 'subscript' ? 'SUPERSCRIPT' : 'SUBSCRIPT';
            const contentState = Modifier.removeInlineStyle(
                newState.getCurrentContent(),
                newState.getSelection(),
                removeStyle
            );
            newState = EditorState.push(newState, contentState, 'change-inline-style');
        }

        if (newState) {
            onEditorStateChange(newState);
        }
    }

    onRemoveInlineStyle = (style) => {
        const { editorState, onEditorStateChange } = this.props;
        const removeStyle = style === 'monospace' ? 'CODE' : style.toUpperCase();
        const contentState = Modifier.removeInlineStyle(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            removeStyle
        );
        const newState = EditorState.push(editorState, contentState, 'change-inline-style');
        onEditorStateChange(newState);
    }

    onToggleInlineStyle = (style) => {
        const { currentStyles } = this.state;
        if (currentStyles[style]) {
            this.onAddInlineStyle(style);
        } else {
            this.onRemoveInlineStyle(style);
        }
    }

    changeKey = (style) => {
        if (style) {
            const st = {};
            for (const [key, val] of Object.entries(style)) {   // eslint-disable-line
                st[key.toLowerCase()] = val;
            }
            return st;
        }
        return undefined;
    }

    render() {
        const { options, currentStyles } = this.state;

        return (
            <Button.Group
                style={{ width: '100%' }}
            >
                {
                    options.map(item => (
                        <CustomBtn
                            key={item.type}
                            title={item.title}
                            type={item.type}
                            onToggleStyle={this.onToggleInlineStyle}
                            currentStyles={currentStyles}
                        >
                            <i
                                className={classnames({
                                    [`fa fa-${item.type} fa-lg`]: true
                                })}
                            />
                        </CustomBtn>
                    ))
                }
            </Button.Group>
        );
    }
}
