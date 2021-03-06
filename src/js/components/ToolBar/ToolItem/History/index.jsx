import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button } from 'antd';
import { EditorState } from 'draft-js';

export default class History extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      undoDisabled: false,
      redoDisabled: false
    };
  }

  componentWillMount() {
    const { editorState } = this.props;
    this.setState({
      undoDisabled: editorState.getUndoStack().size === 0,
      redoDisabled: editorState.getRedoStack().size === 0
    });
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = nextProps;
    if (editorState && editorState !== this.props.editorState) {
      this.setState({
        undoDisabled: editorState.getUndoStack().size === 0,
        redoDisabled: editorState.getRedoStack().size === 0
      });
    }
  }

  onHandleChange = (action) => {
    const { editorState, onEditorStateChange } = this.props;
    const newState = EditorState[action](editorState);
    if (newState) {
      onEditorStateChange(newState);
    }
  }

  render() {
    const { config } = this.props;
    const { undoDisabled, redoDisabled } = this.state;
    const options = config.history.options;

    return (
      <Button.Group>
        {
          options.map(item => (
            <Button
              disabled={item.type === 'undo' ? undoDisabled : redoDisabled}
              key={item.type}
              size="small"
              title={item.title}
              onClick={() => this.onHandleChange(item.type)}
            >
              <i
                className={classnames({
                  [`fa fa-${item.icon} fa-lg`]: true,
                  'iconFont': true
                })}
              />
            </Button>
          ))
        }
      </Button.Group>
    );
  }
}
