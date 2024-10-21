export const MINIMUM_TEMPO: number = 1;

export const MAXIMUM_TEMPO: number = 999;

export const PASSWORD_LIMIT_DATE: number = 90;

export const REDIS_DB_INDEX: number = 1;

export const TITLE_INITIAL_NUMBER: string = '1';

export const TITLE_MAX_NUMBER: string = '999999999999999999999999999999999999999999999';

export const DEFAULT_COVER_IMG: string = `${process.env.AZURE_STORAGE_KEENEAT_ENDPOINT_PREFIX}/${process.env.AZURE_STORAGE_BACK_OFFICE_CONTAINER}/${process.env.AZURE_STORAGE_INSPECTED_IMAGE_BLOB}/amusing/P5nZwlbTngI.jpeg`;

export const PASSWORD_REGEX: RegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,20}$/;

export const ALGORITHM_KEY: string = 'aes-256-cbc';

export const COUNTRY_CODE_REGEX: RegExp = /^\+[0-9](?:[0-9])?$/;

