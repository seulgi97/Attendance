import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
  @ApiProperty({
    example: true,
    description: '요청 처리 성공',
  })
  result: boolean;
}

export class ExceptionResponse {
  @ApiProperty({
    example: false,
    description: '요청 처리 실패(불가)',
  })
  result: boolean;
}

export class Exception400Response extends ExceptionResponse {
  @ApiProperty({
    example: 400,
    description: '에러 타입 코드',
  })
  code: number;

  @ApiProperty({
    example: 'MALFORMED_DATA_TYPE',
    description: '에러 타입 텍스트',
  })
  error: string;

  @ApiProperty({
    example: 'MUSIC',
    description: '에러와 연관된 엔티티',
  })
  resource: string;
}

export class Exception401Response extends ExceptionResponse {
  @ApiProperty({
    example: 401,
    description: '에러 타입 코드',
  })
  code: number;

  @ApiProperty({
    example: 'MALFORMED_TOKEN',
    description: '에러 타입 텍스트',
  })
  error: string;

  @ApiProperty({
    example: 'MUSIC',
    description: '에러와 연관된 엔티티',
  })
  resource: string;
}

export class Exception500Response extends ExceptionResponse {
  @ApiProperty({
    example: 500,
    description: '에러 타입 코드',
  })
  code: number;

  @ApiProperty({
    example: 'SERVER_ERROR',
    description: '에러 타입 텍스트',
  })
  error: string;
}
