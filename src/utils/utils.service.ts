import { BadRequestException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


import {
  ExceptionAssociatedEntity,
  ExceptionType400,
  TimeZone,
  adjustTime,
  convertTimeStringFormat,
  currentDateString,
} from './common';

interface Response {
  statusCode: number;
  message?: string;
  url?: string;
}

@Injectable()
export class UtilsService {



  generateNDigitVerificationCode = (digit: number): string => {
    return Math.floor(10 ** (digit - 1) + Math.random() * 9 * 10 ** (digit - 1)).toString();
  };

  convertCurrentDateFormat(date: string): string {
    const [ddmmyyyy, hhmmss] = date.split(', ');
    const [dd, mm, yyyy] = ddmmyyyy.split('/');

    return `${yyyy}.${mm}.${dd} ${hhmmss}`;
  }

  convertKoreaDateFormat(date: string): string {
    const utcTime = new Date(date); // UTC 기준 시간

    return utcTime.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  }


}
