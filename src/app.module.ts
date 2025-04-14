import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { AppConfigModule } from './common/config/config.module';
import { DatabaseModule } from './common/database/database.module';
import { CrudModule } from './modules/crud/crud.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, ApiModule, CrudModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
