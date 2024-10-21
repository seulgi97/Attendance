import * as moment from 'moment';
import { createHmac } from 'crypto';
import { PASSWORD_LIMIT_DATE } from './const';


export enum ExceptionType400 {
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  ALREADY_REQUESTED = 'ALREADY_REQUESTED',
  CONFLICT = 'CONFLICT',
  EXPIRED = 'EXPIRED',
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  FORBIDDEN = 'FORBIDDEN',
  MALFORMED_DATA_TYPE = 'MALFORMED_DATA_TYPE',
  MALFORMED_FILE = 'MALFORMED_FILE',
  NOT_FOUND = 'NOT_FOUND', // RESOURCE_NOT_FOUND, USER_NOT_FOUND => NOT_FOUND
  UNMATCHED_LOGIN_TYPE = 'UNMATCHED_LOGIN_TYPE',
  UNMATCHED_REQUEST_DATA = 'UNMATCHED_REQUEST_DATA',
}

export enum ExceptionAssociatedEntity {
  COUNTRY = 'COUNTRY',
  LIBRARY = 'LIBRARY',
  LIBRARY_PROJECT = 'LIBRARY_PROJECT',
  MOTIVE = 'MOTIVE',
  MUSIC = 'MUSIC',
  PROJECT = 'PROJECT',
  PROMOTION = 'PROMOTION',
  SAVE_MUSIC = 'SAVE_MUSIC',
  USER = 'USER',
  USER_LOGIN_HISTORY = 'USER_LOGIN_HISTORY',
  TOKEN = 'TOKEN',
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  LIKE = 'LIKE',
  FAVORITE = 'FAVORITE',
  PARAMETER = 'PARAMETER',
  HEADER = 'HEADER',
  GIFT = 'GIFT',
  EMAIL = 'EMAIL',
  CODE = 'CODE',
  SEED = 'SEED',
}

export enum ExceptionType401 {
  EXPIRED = 'EXPIRED',
  MALFORMED_DATA_TYPE = 'MALFORMED_DATA_TYPE', // MALFORMED_TOKEN => MALFORMED_DATA_TYPE
  NOT_FOUND = 'NOT_FOUND', // TOKEN_NOT_FOUND => NOT_FOUND
  PAYLOAD_FAILED_VERIFICATION = 'PAYLOAD_FAILED_VERIFICATION',
}

export enum ExceptionType500 {
  FAILED_SENDING_MAIL = 'FAILED_SENDING_MAIL',
  FAILED_SENDING_SMS = 'FAILED_SENDING_SMS',
  SERVER_BAD_GATEWAY = 'SERVER_BAD_GATEWAY',
  SERVER_ERROR = 'SERVER_ERROR',
}

export enum TimeZone {
  ASIA_SEOUL = 'Asia/Seoul',
  UTC = 'UTC',
}

export enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}

export const QueryFailedErrorToExceptionType = (driveErrorCode: string) => {
  let error;
  switch (driveErrorCode) {
    case 'ER_DUP_ENTRY':
      error = ExceptionType400.ALREADY_EXISTS;
      break;
    default:
      error = driveErrorCode;
  }

  return error;
};

export const convertTimeStringFormat = (datetime: Date | string): string => {
  if (typeof datetime === 'string') {
    return datetime;
  }
  return datetime ? moment(datetime).format('YYYY-MM-DD HH:mm:ss') : null;
};

export const currentDateString = (timeZone?: TimeZone.UTC | TimeZone.ASIA_SEOUL): string => {
  return new Date().toLocaleString('en-US', { timeZone: timeZone ? timeZone : TimeZone.UTC });
};

export const adjustTime = (
  unit: 'hour' | 'minute' | 'second',
  datetime: Date,
  times: number
): Date => {
  switch (unit) {
    case 'hour':
      datetime.setHours(datetime.getHours() + times);
      break;
    case 'minute':
      datetime.setMinutes(datetime.getMinutes() + times);
      break;
    case 'second':
      datetime.setSeconds(datetime.getSeconds() + times);
  }

  return datetime;
};

export const checkPasswordUpdatedAt = (passwordUpdatedAt: Date): boolean => {
  const updatedAt = moment(passwordUpdatedAt);
  const today = moment(new Date());
  const diff = moment.duration(today.diff(updatedAt)).asDays();

  if (diff > PASSWORD_LIMIT_DATE) {
    return true;
  } else {
    return false;
  }
};


export function makeNcpApiSignature(
  url: string,
  timestamp: string,
  accessKey: string,
  secretKey: string
) {
  const space = ' '; // one space
  const newLine = '\n'; // new line
  const method = 'POST'; // method
  const hmac = createHmac('sha256', secretKey);
  const signature = hmac
    .update(method + space + url + newLine + timestamp + newLine + accessKey)
    .digest('base64');

  return signature.toString();
}

// NOTE 인사이트에 노출되는 데이터가 0이 너무 많아서 SaaS 발표/시연을 위해 각 날짜별 데이터에 랜덤 숫자를 더해주기 위한 함수
// TODO SaaS 발표/시연 종료 후 함수 전체 삭제
export function getRandomNumberFromArray() {
  const minNumber: number = 1000;
  const maxNumber: number = 1500;
  const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber) + 1;

  return randomNumber;
}

export function changeMessageByCountryCode(verificationCode: string, countryCode: string) {
  const messageObject = [
    {
      key: '82',
      message: `[인증번호: ${verificationCode}] KEENEAT 휴대폰 인증번호 입니다.`,
    },
    {
      key: '1',
      message: `[Verification code: ${verificationCode}] This is your KEENEAT mobile verification code.`,
    },
  ];

  const findMessage = messageObject.find((item) => item.key === countryCode);

  return findMessage ? findMessage.message : messageObject[0].message;
}
