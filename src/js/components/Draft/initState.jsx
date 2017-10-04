const initState = {
  entityMap: {
    0: {
      type: 'textInputBlock',
      mutability: 'IMMUTABLE',
      data: {}
    }
  },
  blocks: [{
    key: '9gm3s',
    text: '入  院  记  录',
    type: 'header-one',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [],
    data: {}
  }, {
    key: 'ov7r',
    text: '',
    // text: JSON.stringify(
    //   {
    //     department: {
    //       controlID: 'department',
    //       controlName: '科室',
    //       defaultVal: '骨伤科',
    //       describeVal: '请输入科室',
    //       dataType: 'string',
    //       tag: [1, 2, 3],
    //       fontColor: '#333'
    //     },
    //     bedNum: {
    //       controlID: 'bedNum',
    //       controlName: '床号',
    //       defaultVal: 'AE86',
    //       describeVal: '请输入床号',
    //       dataType: 'string',
    //       tag: [],
    //       fontColor: '#333'
    //     },
    //     userName: {
    //       controlID: 'userName',
    //       controlName: '姓名',
    //       defaultVal: '小明',
    //       describeVal: '请输入患者姓名',
    //       dataType: 'string',
    //       tag: [],
    //       fontColor: '#333'
    //     },
    //     hospitalNum: {
    //       controlID: 'hospitalNum',
    //       controlName: '住院号',
    //       defaultVal: '10086',
    //       describeVal: '请输入患者床号',
    //       dataType: 'string',
    //       tag: [],
    //       fontColor: '#333'
    //     },
    //   }
    // ),
    type: 'atomic',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [{
      offset: 0,
      length: 1,
      key: 0
    }],
    data: {},
  }, {
    key: 'e23a8',
    text: 'hello,world',
    type: 'unstyled',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [],
    data: {}
  }]
};

export default initState;
