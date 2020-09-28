import * as ReportAPIUtil from '../util/user_api_util';

export const RECEIVE_REPORTS = 'RECEIVE_REPORTS';
export const RECEIVE_REPORT = 'RECEIVE_REPORT';
export const REMOVE_REPORT = 'REMOVE_REPORT';

const receiveReports = (reports) => {
  return {
    type: RECEIVE_REPORTS,
    reports
  };
};

const receiveReport = (report) => {
  return {
    type: RECEIVE_REPORT,
    report
  };
};

const removeReport = (reportId) => {
  return {
    type: REMOVE_REPORT,
    reportId
  };
};

/*
Export the following thunk action creators with the specified parameters:

1. `requestReports`
2. `requestReport(reportId)`
3. `createReport(report)`
4. `updateReport(report)`
5. `deleteReport(reportId)`
*/

export const requestReports = () => dispatch => {
  return (
    ReportAPIUtil.fetchReports().then(reports => dispatch(receiveReports(reports)))
  );
};

export const requestReport = (reportId) => dispatch => {
  return (
    ReportAPIUtil.fetchReport(reportId).then(report => dispatch(receiveReport(report)))
  );
};

export const createReport = (report) => dispatch => {
  return (
    ReportAPIUtil.createReport(report).then(report => dispatch(receiveReport(report)))
  );
};

export const updateReport = (report) => dispatch => {
  return (
    ReportAPIUtil.updateReport(report).then(report => dispatch(receiveReport(report)))
  );
};



export const deleteReport = (reportId) => dispatch => {
  return (
    ReportAPIUtil.deleteReport(reportId).then(() => dispatch(removeReport(reportId)))
  );
};