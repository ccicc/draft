import React from 'react';
import { Popover } from 'antd';

import styles from './index.less';

export default class PopupMsg extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps !== this.props) return true;
        return false;
    }
    render() {
        const {
            controlName,
            fontColor,
            describeVal,
            defaultVal,
            onEditorClick
        } = this.props;
        const popupContent = (
            <div>
                <span className={styles.popupName}>{controlName}</span>
                文本输入框:
                <span
                    className={styles.editor}
                    title="编辑控件内容"
                    onClick={onEditorClick}
                >
                    编 辑
                </span>
                <span
                    className={styles.delete}
                    title="删除该控件"
                >
                    删 除
                </span>
            </div>
        );

        return (
            <div>
                <span
                    className={styles.controlName}
                >
                    {controlName}
                </span>
                <span>:</span>
                <Popover
                    arrowPointAtCenter
                    content={popupContent}
                    placement="bottomLeft"
                >
                    <span
                        className={styles.controlVal}
                        title={describeVal}
                        style={{ color: fontColor }}
                    >
                        <i className={styles.rim}> [ </i>
                        {defaultVal}
                        <i className={styles.rim}> ] </i>
                    </span>
                </Popover>
            </div>
        );
    }
}
