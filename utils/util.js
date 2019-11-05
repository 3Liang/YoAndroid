/**
 * Format the date
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/** 
 * Format the timestamp
 * number: timestamp 
 * format：return format, custom with the parameter inside formateArr.
 */
function formatTimestamp(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

function getArticleTime(number) {

  var date = new Date(number);
  const curDate = new Date();
  const value = curDate.getTime() - number;

  if (number > curDate.getTime()) {
    return '刚刚'
  } else if (value < 60 * 60 * 1000) {
    return Math.ceil(value / (60 * 1000)) + '分钟前'
  } else if (value < 24 * 60 * 60 * 1000) {
    return Math.floor(value / (60 * 60 * 1000)) + '小时前'
  } else if (value < 3 * 24 * 60 * 60 * 1000) {
    return Math.floor(value / (24 * 60 * 60 * 1000)) + '天前'
  } else {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isEmptyString(value) {
  return value == null || value == "";
}

module.exports = {
  formatTime: formatTime,
  formatTimestamp: formatTimestamp,
  isEmptyString: isEmptyString,
  getArticleTime: getArticleTime
}