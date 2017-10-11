import React from 'react';
import katex from 'katex';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { EditorState, Modifier, SelectionState } from 'draft-js'; // eslint-disable-line
import {
  Popover,
  Button
} from 'antd';

import styles from './index.less';

export default class EquationComponent extends React.Component {
  static propTypes = {
    block: PropTypes.object.isRequired,
    contentState: PropTypes.object.isRequired,
    blockProps: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      equationAlign: undefined,
      removeEquation: false
    };
    this.timer = null;
  }

  componentDidMount() {
    this.renderEquation();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.block !== this.props.block) {
      this.renderEquation();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  onHandleClick = () => {
    this.setState(nextState => ({
      isVisible: !nextState.isVisible
    }));
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
      entityKey,
      { equationAlign: value }
    );

    onEditorStateChange(EditorState.push(editorState, contentState, 'change-block-data'));
    this.setState({
      equationAlign: value
    });
  }

  // removeEquation = () => {
  //   const { block, contentState } = this.props;
  //   const { getEditorState, onEditorStateChange } = this.props.blockProps.options;

  //   const editorState = getEditorState();
  //   const entityKey = block.getEntityAt(0);
  //   const blockKey = block.getKey();
  //   const targetRange = new SelectionState({
  //     anchorKey: blockKey,
  //     anchorOffset: 0,
  //     focusKey: blockKey,
  //     focusOffset: block.getLength()
  //   });

  //   const newContentState = Modifier.removeRange(
  //     contentState,
  //     targetRange,
  //     'backward'
  //   );

  //   const newState = EditorState.push(editorState, newContentState, 'remove-range');
  //   if (newState) {
  //     onEditorStateChange(newState);
  //   }
  // }

  renderEquation = () => {
    const { block, contentState } = this.props;
    const entity = contentState.getEntity(block.getEntityAt(0));
    const { equationData } = entity.getData();

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      katex.render(
        equationData,
        this.equationContainer
      );
    }, 0);
  }

  render() {
    const { isVisible } = this.state;
    const { block, contentState } = this.props;
    const entity = contentState.getEntity(block.getEntityAt(0));
    const { equationAlign } = entity.getData();

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
          [styles.equationAlignWrapper]: true,
          [styles.equationAlignLeft]: equationAlign === 'left',
          [styles.equationAlignCenter]: !equationAlign || equationAlign === 'center',
          [styles.equationAlignRight]: equationAlign === 'right',
          [styles.equationEncircleLeft]: equationAlign === 'encircleLeft',
          [styles.equationEncircleRight]: equationAlign === 'encircleRight'
        })}
      >
        <Popover
          placement="bottom"
          content={content}
          trigger="click"
          onVisibleChange={this.onHandleVisibleChange}
        >
          <span
            className={classnames({
              [styles.equation]: true,
              [styles.equationAction]: isVisible
            })}
            ref={element => this.equationContainer = element}
            onClick={this.onHandleClick}
          />
        </Popover>
      </span>
    );
  }
}
