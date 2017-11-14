import React from 'react';
import PropTypes from 'prop-types';

const logicalControlHOC = Component =>
  class extends React.Component {
    static propTypes = {
      entityKey: PropTypes.string,
      children: PropTypes.array,
      contentState: PropTypes.object
    };

    onLogicalControl = () => {
      const { entityKey, contentState } = this.props;
      const {
        defaultVal,
        isLogicalControl,
        logicalControl
      } = contentState.getEntity(entityKey).getData();
      const {
        controlConditions, // 判断表达式集合
        targetKeys, // 受控实体的key值集合
        isShow
      } = logicalControl;
      if (!isLogicalControl) return;
      const resultItems = controlConditions.map(item => {
        let itselfVal;
        let targetVal;
        /* 获取目标实体值 */ 
        if (item.inputType === 'customVal') {
          // 自定义值
          targetVal = item.customVal;
        }
        if (item.inputType === 'targetKey') {
          // 目标控件值
          const entityID = contentState.getEntity(item.targetEntityKey).getData().controlID;
          if (entityID === 'CheckBoxInput') {
            targetVal = contentState.getEntity(item.targetEntityKey).getData()
              .selectTodos.selectedValues.join(',');
          } else if (entityID === 'RadioBoxInput') {
            targetVal = contentState.getEntity(item.targetEntityKey).getData()
              .selectTodos.currentValue;
          } else {
            targetVal = contentState.getEntity(item.targetEntityKey).getData().defaultVal;
          }
        }
        if (item.inputType === 'dateVal') {
          // 选择日期
          targetVal = item.dateVal.valueOf();
        }

        /* 获取当前实体值 */ 
        if (item.itselfEntityKey && /^\d+$/.test(item.itselfEntityKey)) {
          // 当值为数值时为目标实体key值
          const entityID = contentState.getEntity(item.itselfEntityKey).getData().controlID;
          if (entityID === 'CheckBoxInput') {
            // 复选框实体值
            itselfVal = contentState.getEntity(item.itselfEntityKey)
              .getData().selectTodos.selectedValues.join(',');
          }
          if (entityID === 'RadioBoxInput') {
            // 单选框实体值
            itselfVal = contentState.gettEntity(item.itselfEntityKey)
              .getData().selectTodos.currentValue;
          }
          itselfVal = contentState.getEntity(item.itselfEntityKey).getData().defaultVal;
        } else {
          // 为空时默认为当前控件值, 反之为用户输入值
          itselfVal = (item.itselfEntityKey === '' || item.itselfEntityKey === undefined)
            ?
            defaultVal
            :
            item.itselfEntityKey;
        }

        /* 合并为判断表达式 */ 
        let expression;
        if (item.condition === 'in') {
          // 包含
          expression = itselfVal.split(',').includes(targetVal);
        } else if (item.condition === 'not') {
          // 不包含
          expression = !itselfVal.split(',').includes(targetVal);
        } else {
          expression = `'${itselfVal}' ${item.condition} '${targetVal}'`;
        }
        console.log(expression);
        const result = eval(expression); // eslint-disable-line
        return {
          result,
          operator: item.logicalOperater // 逻辑操作符
        };
      });
      const resultExpression = resultItems.reduce((total, item, index) => {
        // 对每一项的逻辑进行合并
        if (index === resultItems.length - 1) {
          return `${total} (${item.result} === true)`;
        }
        return `${total} (${item.result} === true) ${item.operator}`;
      }, '');
      console.log(resultExpression);
      const result = eval(resultExpression); // eslint-disable-line
      if (result) {
        targetKeys.forEach(itemKey => {
          this.onUpdateEntityData(itemKey, isShow);
          console.log(`isShow: ${isShow}`);
        });
      } else {
        const newDisplay = isShow === 'show' ? 'hidden' : 'show';
        targetKeys.forEach(key => {
          this.onUpdateEntityData(key, newDisplay);
          console.log(`newDisplay: ${newDisplay}`);
        });
      }
    }

    onUpdateEntityData = (entityKey, isShow) => {
      // 更新目标实体数据
      const { contentState } = this.props;
      const otherEntityData = contentState.getEntity(entityKey).getData();
      contentState.replaceEntityData(
        entityKey,
        {
          ...otherEntityData,
          controlShow: isShow
        }
      );
    }

    render() {
      return (
        <Component
          {...this.props}
          onLogicalControl={this.onLogicalControl}
        />
      );
    }
  };

export default logicalControlHOC;
