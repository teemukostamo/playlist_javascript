import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getOneReport } from '../../reducers/reportReducer';
import { useField } from '../../hooks';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const ReportFilterForm = props => {
  const [reportid, setReportid] = useState('');
  const [selectMonthValue, setSelectMonthValue] = useState('Select month...');
  const [selectYearValue, setSelectYearValue] = useState('Select year...');
  console.log(selectMonthValue);
  console.log(selectYearValue);

  const idchange = event => {
    setReportid(event.target.value);
  };
  const onGetReportByIdClick = () => {
    console.log('klik', reportid);

    props.getOneReport(reportid);
  };
  const monthOptions = [
    { value: '01', label: 'Tammikuu' },
    { value: '02', label: 'Helmikuu' },
    { value: '03', label: 'Maaliskuu' },
    { value: '04', label: 'Huhtikuu' },
    { value: '05', label: 'Toukokuu' },
    { value: '06', label: 'Kesäkuu' },
    { value: '07', label: 'Heinäkuu' },
    { value: '08', label: 'Elokuu' },
    { value: '09', label: 'Syyskuu' },
    { value: '10', label: 'Lokakuu' },
    { value: '11', label: 'Marraskuu' },
    { value: '12', label: 'Joulukuu' }
  ];

  const yearOptions = ['2020', '2019', '2018', '2017', '2016'];

  return (
    <div>
      <input onChange={idchange} />
      <button onClick={() => onGetReportByIdClick()}>get report</button>
      <Dropdown
        options={monthOptions}
        value={selectMonthValue}
        onChange={value => setSelectMonthValue(value)}
      />
      <Dropdown
        options={yearOptions}
        value={selectYearValue}
        onChange={value => setSelectYearValue(value)}
      />
    </div>
  );
};

const mapStateToProps = state => {
  console.log('reportfilterform state to props', state);
  return {
    reports: state.reports,
    notification: state.notification,
    users: state.users,
    login: state.login
  };
};

const mapDispatchToProps = {
  getOneReport
};

const connectedReportFilterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportFilterForm);

export default connectedReportFilterForm;
