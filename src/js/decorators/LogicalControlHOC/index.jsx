import React from 'react';
import PropTypes from 'prop-types';

const getDisplayName = WrapperComponent => {
  return WrapperComponent.displayName ||
    WrapperComponent.name ||
    'Component';
};

const logicalControlHOC = Component =>
  class extends React.Component {
    static displayName = `HOC-${getDisplayName(Component)}`
    static propTypes = {
      entityKey: PropTypes.string,
      children: PropTypes.array,
      contentState: PropTypes.object
    };

    onLogicalControl = () => {
      const { entityKey, contentState } = this.props;
      const {
        isLogicalControl,
        logicalControl
      } = contentState.getEntity(entityKey).getData();
      if (!isLogicalControl) return;
      const {
        conditionGroup, // 判断条件组
        isShow, // 是否展示
        targetKeys // 目标key值集合
      } = logicalControl;

      const result = conditionGroup.some(controlConditions => {
        return this.onConditionJudgment(controlConditions, contentState, entityKey);
      });
      console.log(`root result: ${result}`);
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

    onConditionJudgment = (controlConditions, contentState, entityKey) => {
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

          // 复选框实体值
          if (entityID === 'CheckBoxInput') {
            itselfVal = contentState.getEntity(item.itselfEntityKey)
              .getData().selectTodos.selectedValues.join(',');
          } else if (entityID === 'RadioBoxInput') {
            // 单选框实体值
            itselfVal = contentState.getEntity(item.itselfEntityKey)
              .getData().selectTodos.currentValue;
          } else if (entityID === 'DateInput') {
            // 日期输入框
            itselfVal = contentState.getEntity(item.itselfEntityKey)
              .getData().defaultVal.valueOf();
          } else if (entityID === 'SelectionMultipleInput') {
            // 下拉多选输入框
            itselfVal = contentState.getEntity(item.itselfEntityKey)
              .getData().defaultVal.split(',')
              .filter(val => val !== '未知').join(',');
          } else {
            itselfVal = contentState.getEntity(item.itselfEntityKey)
              .getData().defaultVal;
          }
        } else if (item.itselfEntityKey === '' || item.itselfEntityKey === undefined) {
          const entityID = contentState.getEntity(entityKey).getData().controlID;
          // 为空时默认为当前控件值, 反之为用户输入值
          if (entityID === 'CheckBoxInput') {
            // 复选框实体值
            itselfVal = contentState.getEntity(entityKey)
              .getData().selectTodos.selectedValues.join(',');
          } else if (entityID === 'RadioBoxInput') {
            // 单选框实体值
            itselfVal = contentState.getEntity(entityKey)
              .getData().selectTodos.currentValue;
          } else if (entityID === 'DateInput') {
            // 日期输入框
            itselfVal = contentState.getEntity(entityKey).getData().defaultVal.valueOf();
          } else if (entityID === 'SelectionMultipleInput') {
            itselfVal = contentState.getEntity(entityKey).getData()
              .defaultVal.split(',').filter(val => val !== '未知')
              .join(',');
          } else {
            itselfVal = contentState.getEntity(entityKey).getData().defaultVal;
          }
        } else {
          itselfVal = item.itselfEntityKey;
        }

        /* 合并为判断表达式 */
        let expression;
        console.log(itselfVal);
        console.log(targetVal);
        if (item.condition === 'in') {
          // 包含
          expression = itselfVal.split(',').includes(targetVal);
        } else if (item.condition === 'not') {
          // 不包含
          expression = !itselfVal.split(',').includes(targetVal);
        } else {
          expression = `'${itselfVal}' ${item.condition} '${targetVal}'`;
        }
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
      return result;
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
