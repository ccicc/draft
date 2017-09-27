/**
 * 
 * toolbar configuration
 * 
 * */ 

export default {
  options: [
    'inline',
    'blockType',
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
      { type: 'underline', icon: 'underline', title: '下划线' },
      { type: 'strikethrough', icon: 'strikethrough', title: '删除线' },
      { type: 'subscript', icon: 'subscript', title: '下标' },
      { type: 'superscript', icon: 'superscript', title: '上标' },
      { type: 'code', icon: 'code', title: '等宽字形' }
    ]
  },
  block: {
    component: 'Block',
    options: [
      { type: 'Normal', style: 'unstyled' },
      { type: 'H1', style: 'header-one' },
      { type: 'H2', style: 'header-two' },
      { type: 'H3', style: 'header-three' },
      { type: 'h4', style: 'header-four' },
      { type: 'H5', style: 'header-five' },
      { type: 'H6', style: 'header-six' },
      { type: 'Blockquote', style: 'blockquote' }
    ]
  },
  fontFamily: {
    component: 'FontFamily',
    options: ['宋体', '微软雅黑', '楷体', '隶书', '黑体']
  },
  fontSize: {
    component: 'FontSize',
    options: ['12px', '14px', '15px', '16px', '18px', '20px', '22px', '24px', '36px']
  },
  colorPicker: {
    component: 'SelectColor',
    options: ['#FF6900', '#FCB900', '#EB144C', '#F78DA7', '#7BDCB5', '#00D084', '#0693E3', '#fff', '#333']
  }
};
