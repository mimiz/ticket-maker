import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { AppConfigModule } from './common/config/config.module';

@Module({
  imports: [AppConfigModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
