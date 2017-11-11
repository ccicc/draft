import React from 'react';
import PropTypes from 'prop-types';

const logicalControlHOC = Component =>
  class extends React.Component {
    static propTypes = {
      entityKey: PropTypes.string,
      children: PropTypes.array,
      contentState: PropTypes.object
    };

    onLogicalControl = (value) => {
      // 逻辑质控
      const { entityKey, contentState } = this.props;
      // 从实体中获取控制条件
      const { logicalControl } = contentState.getEntity(entityKey).getData();

      let result;
      if (logicalControl) {
        const { controlConditions, isShow, targetKeys } = logicalControl;
        const expression = controlConditions.reduce((total, item, index, current) => {
          // 只有一项控制条件或多个控制条件的最后一项不加逻辑运算符
          if (current.length !== 1 && (index !== current.length - 1)) {
            // 包含(in)
            if (item.condition === 'in') return `${total} ${value.split(',').includes(item.judgeVal)} ${item.logicalOperater}`;
            // 不包含(not in)
            if (item.condition === 'notIn') return `${total} ${!value.split(',').includes(item.judgeVal)} ${item.logicalOperater}`;
            const judgeVal = item.judgeVal === '' ? ' ' : item.judgeVal;
            return `${total} '${value}' ${item.condition} '${judgeVal}' ${item.logicalOperater}`;
          }
          if (item.condition === 'in') return `${total} ${value.split(',').includes(item.judgeVal)}`;
          if (item.condition === 'notIn') return `${total} ${value.split(',').includes(item.judgeVal)}`;
          return `${total} '${value}' ${item.condition} '${item.judgeVal}'`;
        }, '');

        result = eval(expression); // eslint-disable-line
        if (result) {
          // 满足条件
          targetKeys.forEach(key => {
            this.onUpdateEntityData(key, isShow);
            console.log(`conditionTrue: ${isShow}`);
          });
        } else {
          const newDisplay = isShow === 'show' ? 'hidden' : 'show';
          targetKeys.forEach(key => {
            this.onUpdateEntityData(key, newDisplay);
            console.log(`conditionFalse: ${newDisplay}`);
          });
        }
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
