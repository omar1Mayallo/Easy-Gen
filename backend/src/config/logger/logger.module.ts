import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './winston.config';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig), // Configure Winston globally
  ],
  exports: [WinstonModule], // Export for other modules to use
})
export class LoggerModule {}
