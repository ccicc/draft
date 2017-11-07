/* eslint-disable */ 

import React from 'react';
import PropTypes from 'prop-types';

import MedicalRecords from './MedicalRecord';
export default class SideBar extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <MedicalRecords 
          medicalTitle="首次就诊记录"
          medicalNumber="EMR07.00"
          medicalCreater="小明"
          medicalCategory="出院记录"
          medicalCreateTime={1510025784205}
        />
      </div>
    )
  }
}
