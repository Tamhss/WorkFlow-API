import * as winston from 'winston';
const { combine, timestamp, label, printf } = winston.format;

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
const currentDate = date.getDate();

export function getWinstonFormat() {
  const myFormat = printf(({ level, message, label, timestamp }) => {
    console.log(label);
    return `[${level.toLocaleUpperCase()}] ${timestamp} Message: ${message}`;
  });
  return combine(label({}), timestamp(), myFormat);
}

export function getWinstonPathFile() {
  return new winston.transports.File({
    filename: `${process.cwd()}/logs/${currentYear}-${currentMonth}-${
      currentDate < 10 ? '0' + currentDate : currentDate
    }_file_log.json`,
    level: 'error',
  });
}









