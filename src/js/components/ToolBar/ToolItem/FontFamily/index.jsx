/* 
    global
    window: false
    document: false
*/ 

import React from 'react';
import { Select } from 'antd';
import {
    getSelectionCustomInlineStyle,
    toggleCustomInlineStyle
} from 'draftjs-utils';

const Option = Select.Option;

export default class FontFamily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFontFamily: undefined,
            defaultFontFamily: undefined,
            fontFamilys: ['宋体', '微软雅黑', '楷体', '隶书', '黑体']
        };
    }

    componentWillMount() {
        const { editorState } = this.props;
        if (editorState) {
            this.setState({
                currentFontFamily: getSelectionCustomInlineStyle(
                    editorState,
                    ['FONTFAMILY']
                ).FONTFAMILY,
            });
        }
    }

    /* eslint-disable */ 

    componentDidMount() {
        const editorElm = document.querySelectorAll('.DraftEditor-root');
        if (editorElm && editorElm.length > 0) {
            const editorStyle = window.getComputedStyle(editorElm[0]);
            const defaultFontFamily = editorStyle.getPropertyValue('font-family');
            this.setState({
                defaultFontFamily
            });
        }
    }

    /* esline-enable */ 

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.editorState &&
            this.props.editorState !== nextProps.editorState
        ) {
            this.setState({
                currentFontFamily: getSelectionCustomInlineStyle(
                    nextProps.editorState,
                    ['FONTFAMILY']
                ).FONTFAMILY,
            });
        }
    }

    onToggleFontFamily = (fontFamily) => {
        const { editorState, onEditorStateChange } = this.props;
        const newState = toggleCustomInlineStyle(
            editorState,
            'fontFamily',
            fontFamily
        );
        if (newState) {
            onEditorStateChange(newState);
        }
    }

    render() {
        const { currentFontFamily, defaultFontFamily, fontFamilys } = this.state;
        const { editorState, onEditorStateChange } = this.props;
        const fontFamily = currentFontFamily ? currentFontFamily.substring(11) : defaultFontFamily;
        return (
            <Select
                size="small"
                editorState={editorState}
                value={fontFamily}
                onSelect={value => this.onToggleFontFamily(value)}
                style={{ width: '100%' }}
            >
                {
                    fontFamilys.map(fontFamily => (
                        <Option
                            key={fontFamily}
                            value={fontFamily}
                        >
                            {fontFamily}
                        </Option>
                    ))
                }
            </Select>
        );
    }
}
