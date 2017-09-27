import React from 'react';

import { TextInput } from './../../components';
import config from './../../config/toolbar.config';
import styles from './index.less';

/**
 * 
 * 循环控件数据并生成一个contentBlock
 * 
 * */
const ContentBlockOne = (props) => {
  const { blockTextObj } = props.blockProps;
  const blockTextArr = Object.values(blockTextObj);

  return (
    <div className={styles.root}>
      {
        blockTextArr && blockTextArr.map((item, index) => {
          return (
            <span key={index}>
              <TextInput
                data={item}
                config={config}
              />
            </span>
          );
        })
      }
    </div>
  );
};

/**
 * 
 * 基于生成的contentBlock构建draft-js-plugin
 * 
 * */
const createContentBlockOnePlugin = () => {
  const component = ContentBlockOne;
  return {
    blockRendererFn(block, { getEditorState }) {
      if (block.type === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        const text = block.getText();
        if (type === 'textInputBlock') {
          return {
            component,
            editable: true,
            props: {
              blockTextObj: JSON.parse(text)
            }
          };
        }
      }
      return null;
    }
  };
};

export default createContentBlockOnePlugin;
