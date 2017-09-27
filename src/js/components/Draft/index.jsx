/*
    global
    window: false
*/ 

import React from 'react';
import { Affix } from 'antd';
import {
    EditorState,
    RichUtils,
    convertFromRaw,
    convertToRaw
} from 'draft-js';
import { getCustomStyleMap } from 'draftjs-utils';
// draft-js-plugin插件导入
import Editor from 'draft-js-plugins-editor';
import { createContentBlockOnePlugin } from './../../draftPlugins';

import config from './../../config/toolbar.config';
import initState from './initState';
import Toolbar from './../ToolBar';
import styles from './index.less';

const textInputPlugin = createContentBlockOnePlugin();

const plugins = [
    textInputPlugin,
];

export default class Draft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // const contentState = window.localStorage.getItem('contentState');
        // if (
        //     convertFromRaw(JSON.parse(contentState)).hasText()
        // ) {
        //     this.state.editorState = EditorState.createWithContent(
        //         convertFromRaw(JSON.parse(contentState))
        //     );
        // } else {
        this.state.editorState = EditorState.createWithContent(convertFromRaw(initState));
        // }
    }

    onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        console.log(convertToRaw(contentState));
        this.onSaveContent(contentState);
        this.setState({
            editorState
        });
    }

    onSaveContent = (contentState) => {
        window.localStorage.setItem(
            'contentState',
            JSON.stringify(convertToRaw(contentState))
        );
    }

    onHandleFocus = () => {
        this.domEditor.focus();
    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    render() {
        const { editorState } = this.state;
        return (
            <div
                className={styles.root}
            >
                <Affix offsetTop={64}>
                    <div className={styles.toolbar}>
                        <Toolbar
                            config={config}
                            editorState={editorState}
                            onEditorStateChange={this.onChange}
                            onFocusClick={this.onHandleFocus}
                        />
                    </div>
                </Affix>
                <div
                    className={styles.editorWrapper}
                    onClick={this.onHandleFocus}
                >
                    <Editor
                        editorState={editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        ref={element => this.domEditor = element}
                        customStyleMap={getCustomStyleMap()}
                        plugins={plugins}
                    />
                </div>
            </div>
        );
    }
}
