import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { S3, SharedIniFileCredentials } from 'aws-sdk';
import { GraphQLError, GraphQLFormattedError } from 'graphql/error';
import { omit } from 'lodash';
import { AwsSdkModule } from 'nest-aws-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmarks/bookmark.module';
import { CONFIG_OPTION } from './common/config/config-option.schema';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import { TradePostModule } from './trade-posts/trade-post.module';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_OPTION),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      autoTransformHttpErrors: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }) => ({ req, res }),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
          extensions: omit(error.extensions, ['stacktrace']),
        };
        return graphQLFormattedError;
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
          dbName: configService.get<string>('MONGODB_DATABASE'),
        };
      },
    }),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: (configService: ConfigService) => ({
          region: configService.get<string>('AWS_REGION'),
          credentials: new SharedIniFileCredentials({ profile: configService.get<string>('AWS_PROFILE') }),
        }),
        imports: [ConfigModule],
        inject: [ConfigService],
      },
      services: [S3],
    }),
    AuthModule,
    TradePostModule,
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes({
      path: 'graphql',
      method: RequestMethod.ALL,
    });
  }
}
