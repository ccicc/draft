/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import styles from './index.less';

const MedicalRecords = (props) => {
  const {
    medicalTitle,
    medicalNumber,
    medicalCategory,
    medicalCreater,
    medicalCreateTime
  } = props;
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{medicalTitle}</h2>
      <div className={styles.content}>
        <p className={styles.item}>
          编 码: <span className={styles.active}>{medicalNumber}</span>
        </p>
        <p className={styles.item}>
          类 别: <span className={styles.active}>{medicalCategory}</span>
        </p>
        <p className={styles.item}>
          创建人: <span className={styles.active}>{medicalCreater}</span>
        </p>
        <p className={styles.item}>
        创建日期:
        <span className={styles.active}>{moment(medicalCreateTime).format('YYYY-MM-DD HH:mm')}</span>
        </p>
      </div>
    </div>
  )
}

MedicalRecords.propTypes = {
  medicalTitle: PropTypes.string.isRequired,
  medicalNumber: PropTypes.string,
  medicalCategory: PropTypes.string,
  medicalCreater: PropTypes.string,
  medicalCreateTime: PropTypes.number
};

export default MedicalRecords;
