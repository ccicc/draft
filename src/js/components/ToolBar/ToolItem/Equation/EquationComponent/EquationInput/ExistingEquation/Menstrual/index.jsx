import React from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  DatePicker
} from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

class Menstrual extends React.Component {
  getFields = () => {
    const { getFieldDecorator } = this.props.form;
    const fields = [
      { label: '初潮年龄', field: 'menarcheAge' },
      { label: '经期(天)', field: 'menstrualPeriod' },
      { label: '周期(天)', field: 'menstrualCycle' },
    ];
    const children = [];
    fields.forEach((item, index) => {
      children.push(
        <Col
          span={12}
          key={index}
        >
          <FormItem
            label={item.label}
          >
            {
              getFieldDecorator(`${item.field}`, {
                rules: [{ required: true, message: '该字段不能为空' }]
              })(
                <Input size="small" />
              )
            }
          </FormItem>
        </Col>
      );
    });
    return children;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className={styles.root}>
        <Row gutter={20}>
          {this.getFields()}
          <Col
            span={12}
          >
            <FormItem
              label="末次月经日期"
            >
              {
                getFieldDecorator('lastMenstrual')(
                  <DatePicker
                    placeholder="请选择日期"
                    size="small"
                  />
                )
              }
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrapperMenstrual = Form.create({
  mapPropsToFields(props) {
    return {
      menarcheAge: {
        value: props.menarcheAge.value
      },
      menstrualPeriod: {
        value: props.menstrualPeriod.value
      },
      menstrualCycle: {
        value: props.menstrualCycle.value
      },
      lastMenstrual: {
        value: props.lastMenstrual.value
      }
    };
  },
  onFieldsChange(props, fields) {
    props.onChange(fields);
  }
})(Menstrual);

export default WrapperMenstrual;
