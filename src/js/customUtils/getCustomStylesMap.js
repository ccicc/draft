/**
 * 
 * 设置编辑器初始化的内联样式
 * 
 * */

const customInlineStyleMap = {
  color: {},
  background: {},
  fontSize: {},
  fontFamily: {},
  CODE: {
    fontFamily: 'monospace',
    wordWrap: 'break-wrod',
    borderRadius: 3,
    background: '#ccc',
    padding: '1px 3px'
  },
  SUPERSCRIPT: {
    fontSize: 11,
    position: 'relative',
    top: -8,
    display: 'inline-flex'
  },
  SUBSCRIPT: {
    fontSize: 11,
    position: 'relative',
    bottom: -8,
    display: 'inline-flex'
  },
  STRIKETHROUGH: {
    display: 'inline-block',
    position: 'relative',
    textDecoration: 'line-through',
    color: 'red',
  }
};

console.log(customInlineStyleMap);

const getCustomStylesMap = () => {
  return {
    ...customInlineStyleMap.color,
    ...customInlineStyleMap.background,
    ...customInlineStyleMap.fontSize,
    ...customInlineStyleMap.fontFamily,
    CODE: customInlineStyleMap.CODE,
    SUBSCRIPT: customInlineStyleMap.SUBSCRIPT,
    SUPERSCRIPT: customInlineStyleMap.SUPERSCRIPT,
    STRIKETHROUGH: customInlineStyleMap.STRIKETHROUGH
  };
};

export default getCustomStylesMap;
