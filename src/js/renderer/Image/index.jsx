import React from 'react';
import { is } from 'immutable';
import {
  Popover,
  Button
} from 'antd';
import { EditorState } from 'draft-js';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class ImageComponent extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
    contentState: PropTypes.object.isRequired,
    blockProps: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      imageAlign: undefined
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const thisState = this.state || {};
    const thisProps = this.props || {};

    if (
      Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length
    ) {
      return true;
    }
    for (const key in nextProps) {
      if (nextProps.hasOwnProperty(key) && !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }
    for (const key in nextState) {
      if (nextState.hasOwnProperty(key) && !is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }

  onHandleClick = () => {
    this.setState({
      isVisible: true
    });
  }

  onHandleVisibleChange = (visible) => {
    this.setState({
      isVisible: visible
    });
  }

  onSetAlignmentLeft = () => {
    this.setEntityAlignment('left');
  }

  onSetAlignmentCenter = () => {
    this.setEntityAlignment('center');
  }

  onSetAlignmentRight = () => {
    this.setEntityAlignment('right');
  }

  onSetEncircleLeft = () => {
    this.setEntityAlignment('encircleLeft');
  }

  onSetEncircleRight = () => {
    this.setEntityAlignment('encircleRight');
  }

  setEntityAlignment = (value) => {
    const { block, contentState } = this.props;
    const { getEditorState, onEditorStateChange } = this.props.blockProps.options;
    const editorState = getEditorState();
    const entityKey = block.getEntityAt(0);
    contentState.mergeEntityData(
      entityKey, {
        imageAlign: value
      }
    );
    onEditorStateChange(EditorState.push(editorState, contentState, 'change-block-data'));
    this.setState({
      imageAlign: value
    });
  }

  render() {
    const { isVisible } = this.state;
    const { block, contentState } = this.props;
    const entity = contentState.getEntity(block.getEntityAt(0));
    const { imageUrl, imageAlt, imageWidth, imageHeight, imageAlign } = entity.getData();

    const content = (
      <Button.Group>
        <Button
          size="small"
          title="向左对齐"
          onClick={this.onSetAlignmentLeft}
        >
          <i className="fa fa-align-left fa-lg iconFont" />
        </Button>
        <Button
          size="small"
          title="居中对齐"
          onClick={this.onSetAlignmentCenter}
        >
          <i className="fa fa-align-center fa-lg iconFont" />
        </Button>
        <Button
          size="small"
          title="向右对齐"
          onClick={this.onSetAlignmentRight}
        >
          <i className="fa fa-align-right fa-lg iconFont" />
        </Button>
        <Button
          size="small"
          title="左对齐文字环绕"
          onClick={this.onSetEncircleLeft}
        >
          <i className="fa fa-dedent fa-lg iconFont" />
        </Button>
        <Button
          size="small"
          title="右对齐文字环绕"
          onClick={this.onSetEncircleRight}
        >
          <i className="fa fa-indent fa-lg iconFont" />
        </Button>
      </Button.Group>
    );

    return (
      <span
        className={classnames({
          [styles.imageWrapper]: true,
          [styles.imageAlignLeft]: imageAlign === 'left',
          [styles.imageAlignCenter]: !imageAlign || imageAlign === 'center',
          [styles.imageAlignRight]: imageAlign === 'right',
          [styles.imageEncircleLeft]: imageAlign === 'encircleLeft',
          [styles.imageEncircleRight]: imageAlign === 'encircleRight'
        })}
      >
        <Popover
          content={content}
          placement="bottom"
          trigger="click"
          visible={isVisible}
          onVisibleChange={this.onHandleVisibleChange}
        >
          <img
            className={classnames({
              [styles.image]: isVisible
            })}
            src={imageUrl}
            alt={imageAlt}
            style={{
              width: `${imageWidth}px`,
              height: `${imageHeight}px`
            }}
          />
        </Popover>
      </span>
    );
  }
}
