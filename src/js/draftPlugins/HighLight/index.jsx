import { RichUtils } from 'draft-js';

/**
 * 
 * 按下alt按键后，高亮书写文字
 * 
 */
function highLight() {
  return {
    customStyleMap: {
      HIGHLIGHT: {
        background: 'yellowgreen',
        padding: '0 5px',
        color: '#fff',
      }
    },
    keyBindingFn(e) {
      if (e.keyCode === 18) {
        return 'highlight';
      }
      return null;
    },
    handleKeyCommand(command, editorState, { setEditorState }) {
      if (command === 'highlight') {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
        return true;
      }
      return null;
    }
  };
}

export default highLight;
