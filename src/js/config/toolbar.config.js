/**
 * 
 * toolbar configuration
 * 
 * */ 

export default {
  options: [
    'inline',
    'block',
    'fontSize',
    'fontFamily',
    'list',
    'colorPicker'
  ],
  inline: {
    component: 'Inline',
    options: [
      { type: 'bold', icon: 'bold', title: '字体加粗' },
      { type: 'italic', icon: 'italic', title: '斜体' },
      // { type: 'strikethrough', icon: 'strikethrough', title: '删除线' },
      { type: 'subscript', icon: 'subscript', title: '下标' },
      { type: 'superscript', icon: 'superscript', title: '上标' },
      { type: 'code', icon: 'code', title: '等宽字形' },
      { type: 'underline', icon: 'underline', title: '下划线' },
    ]
  },
  block: {
    component: 'Block',
    options: [
      { type: 'Normal', style: 'unstyled' },
      { type: 'H1', style: 'header-one' },
      { type: 'H2', style: 'header-two' },
      { type: 'H3', style: 'header-three' },
      { type: 'H4', style: 'header-four' },
      { type: 'list-ul', style: 'unordered-list-item' },
      { type: 'list-ol', style: 'ordered-list-item' }
    ]
  },
  fontFamily: {
    component: 'FontFamily',
    options: ['宋体', '微软雅黑', '楷体', '隶书', '黑体']
  },
  fontSize: {
    component: 'FontSize',
    options: ['12px', '14px', '16px', '20px', '22px', '24px', '36px']
  },
  colorPicker: {
    component: 'ColorPicker',
    options: {
      icon: 'eyedropper',
      fontColors: ['#FF6900', '#FCB900', '#EB144C', '#F78DA7', '#7BDCB5', '#ccc', '#0693E3', '#666', '#333', '#363'],
      entityColors: ['#FF6900', '#FCB900', '#EB144C', '#F78DA7', '#7BDCB5', '#ccc', '#0693E3', '#666', '#333'],
      bgColors: ['#FF6900', '#FCB900', '#EB144C', '#F78DA7', '#7BDCB5', '#ccc', '#0693E3', '#f5f5f5', '#333', '#363']
    }
  },
  textAlign: {
    component: 'TextAlign',
    options: [
      { type: 'left', icon: 'align-left', title: '向左对齐' },
      { type: 'center', icon: 'align-center', title: '居中对齐' },
      { type: 'right', icon: 'align-right', title: '向右对齐' },
      { type: 'flex', icon: 'align-justify', title: '两端对齐' }
    ],
  },
  list: {
    component: 'List',
    options: [
      { type: 'ordered', icon: 'list-ol', title: '有序列表' },
      { type: 'unordered', icon: 'list-ul', title: '无序列表' },
      { type: 'indent', icon: 'indent', title: '向右缩进(仅适用于列表)' },
      { type: 'outdent', icon: 'outdent', title: '向左缩进(仅适用于列表)' }
    ]
  },
  remove: {
    component: 'Remove',
    options: {
      buildInStyles: [
        'BOLD', 'ITALIC', 'UNDERLINE', 'MONOSPACE', 'SUPERSCRIPT', 'SUBSCRIPT', 'STRIKETHROUGH'
      ],
      customStyles: [
        'FONTSIZE', 'FONTFAMILY', 'COLOR', 'BGCOLOR'
      ],
      icon: 'eraser',
      title: '清除格式'
    }
  },
  history: {
    component: 'History',
    options: [
      { type: 'undo', icon: 'undo', title: '撤销' },
      { type: 'redo', icon: 'repeat', title: '重做' }
    ]
  },
  link: {
    component: 'Link',
    options: {
      link: { icon: 'link', title: '添加链接', target: '_blank' },
      unlink: { icon: 'unlink', title: '移除链接' }
    }
  },
  copy: {
    component: 'Copy',
    options: {
      copy: { icon: 'copy', title: '复制' },
      cut: { icon: 'cut', title: '剪切' },
      paste: { icon: 'paste', title: '粘贴' }
    }
  },
  postil: {
    component: 'Postil',
    options: {
      addPostil: { icon: 'commenting', title: '添加批注' },
      removePostil: { icon: 'comment-o', title: '移除批注' }
    }
  }
};
