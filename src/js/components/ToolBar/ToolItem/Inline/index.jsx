import React from 'react';
import classnames from 'classnames';
import { getSelectionInlineStyle } from 'draftjs-utils';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import CustomTag from './../CustomTag';

export default class Inline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStyles: {
                bold: true
            },
            options: [
                { type: 'bold', title: '加粗' },
                { type: 'italic', title: '斜体' },
                { type: 'underline', title: '下划线' },
                { type: 'strikethrough', title: '删除线' }
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

    onToggleInlineStyle = (style) => {
        const { editorState, onEditorStateChange } = this.props;
        const newStyle = style === 'monospace' ? 'CODE' : style.toUpperCase();
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

    changeKey = (style) => {
        if (style) {
            const st = {};
            for (const [key, val] of Object.entries(style)) {   // eslint-disable-line
                st[key === 'CODE' ? 'monospace' : key.toLowerCase()] = val;
            }
            return st;
        }
        return undefined;
    }

    // 未完
    render() {
        const { options, currentStyles } = this.state;
        console.log(currentStyles);
        return (
            <div style={{ width: '100%' }}>
                {
                    options.map(item => (
                        <CustomTag
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
                        </CustomTag>
                    ))
                }
            </div>
        );
    }
}
