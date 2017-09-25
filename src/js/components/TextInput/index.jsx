import React from 'react';

import EditorModal from './EditorModal';
import PopupMsg from './PopupMsg';

import styles from './index.less';

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                controlID: props.controlID,
                controlName: props.controlName,
                defaultVal: props.defaultVal,
                describeVal: props.describeVal,
                dataType: props.dataType,
                fontColor: props.fontColor,
                tag: []
            },
            isEditor: false,
            isLoading: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        this.setState({
            data: {
                ...this.state.data,
                ...data,
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps !== this.props || nextState !== this.state) return true;
        return false;
    }

    onEditorClick = () => {
        this.setState({
            isEditor: true
        });
    }

    onHandleOk = (err, changeData) => {
        if (err) {
            return false;
        }
        this.setState({
            data: {
                ...this.state.data,
                ...changeData
            },
            isLoading: true
        });
        setTimeout(() => {
            this.setState({
                isLoading: false,
                isEditor: false
            });
            return true;
        }, 0);
    }

    onHandleCancel = () => {
        this.setState({
            isEditor: false
        });
    }

    onSelectType = (value) => {
        this.setState({
            data: {
                ...this.state.data,
                dataType: value
            }
        });
    }

    onSelectFontColor = (color) => {
        this.setState({
            data: {
                ...this.state.data,
                fontColor: color
            }
        });
    }

    render() {
        const { data, isEditor, isLoading } = this.state;

        return (
            <div className={styles.root}>
                <PopupMsg
                    {...data}
                    onEditorClick={this.onEditorClick}
                />
                <EditorModal
                    isEditor={isEditor}
                    isLoading={isLoading}
                    onConfirm={this.onHandleOk}
                    onCancel={this.onHandleCancel}
                    onSelectDataType={this.onSelectType}
                    onSelectFontColor={this.onSelectFontColor}
                    {...data}
                />
            </div>
        );
    }
}
