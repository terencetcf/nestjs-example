import { PipeTransform, ValidationPipe } from '@nestjs/common';

export const globalPipes = (): PipeTransform[] => [
  new ValidationPipe({
    disableErrorMessages: false,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }),
];
