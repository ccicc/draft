/* eslint-disable */ 

const initState = {
  entityMap: {
    0: {
      type: "IMAGE",
      mutability: "IMMUTABLE",
      data: {
        imageUrl: "http://www.tlzzu.com/EMR/img/1.png",
        imageAlt: "text",
        imageAlign: "center"
      }
    },
    1: {
      type: "TEXTINPUT",
      mutability: "IMMUTABLE",
      data: {
        controlID: "TextInput",
        controlName: "科室",
        defaultVal: "骨伤科",
        describeVal: "骨伤科",
        dataType: "普通文本",
        isRequired: true,
        isReadOnly: false
      }
    },
    2: {
      type: "TEXTINPUT",
      mutability: "IMMUTABLE",
      data: {
        controlID: "TextInput",
        controlName: "床号",
        defaultVal: "F00198",
        describeVal: "床号",
        dataType: "普通文本",
        isRequried: true,
        isReadOnly: false
      }
    },
    3: {
      type: "TEXTINPUT",
      mutability: "IMMUTABLE",
      data: {
        controlID: "TextInput",
        controlName: "姓名",
        defaultVal: "小明",
        describeVal: "姓名",
        dataType: "普通文本",
        isRequired: true,
        isReadOnly: false
      }
    },
    4: {
      type: "TEXTINPUT",
      mutability: "IMMUTABLE",
      data: {
        controlID: "TextInput",
        controlName: "住院号",
        defaultVal: "000000011",
        describeVal: "住院号",
        dataType: "普通文本",
        isRequired: true,
        isReadOnly: false
      }
    }
  },
  blocks: [
    {
      key: "e23a8",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "ea0h",
      text: " ",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0
        }
      ],
      data: {}
    },
    {
      key: "es1p3",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "9j8q0",
      text: "科室: [ 骨伤科 ]                    床号: [ F00198 ]                       姓名: [ 小明 ]                         住院号: [ 000000011 ] ",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 11,
          key: 1
        },
        {
          offset: 31,
          length: 14,
          key: 2
        },
        {
          offset: 68,
          length: 10,
          key: 3
        },
        {
          offset: 103,
          length: 18,
          key: 4
        }
      ],
      data: {
        "text-align": "center"
      }
    }
  ]
};

export default initState;
