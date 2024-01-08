import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CONFIG_OPTION } from './common/config/config-option.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectIdScalar } from './graphql/scalars/object-id.scalar';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import { TradePostModule } from './trade-posts/trade-post.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql/error';
import { omit } from 'lodash';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_OPTION),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      autoTransformHttpErrors: true,
      playground: false,
      resolvers: { ObjectId: ObjectIdScalar },
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
    AuthModule,
    TradePostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('graphql');
  }
}
