import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { WsAdapter } from './adaptor/ws-adapter';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';
import basicAuth from 'express-basic-auth';

const server: express.Express = express();
export const createNestServer = async (expressInstance: express.Express) => {
  const adapter = new ExpressAdapter(expressInstance);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
    {},
  );

  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useWebSocketAdapter(new WsAdapter(app));

  app.use(
    ['/api/v1/docs/'],
    basicAuth({
      challenge: true,
      users: {
        admin: '11223344',
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('EGV API')
    .setDescription('RESTFul API for Web Application EG EV by ECU-SHOP [EGV]')
    .setVersion('1.0')
    .addTag('Races')
    .addTag('DataLogs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme('v3');
  const options: SwaggerCustomOptions = {
    customCss: theme.getBuffer('dark'),
    swaggerOptions: {
      docExpansion: 'none',
    },
  };

  SwaggerModule.setup('api/v1/docs', app, document, options);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`WebSockets is running on: ${await app.getUrl()}/egv-datalog`);
};

createNestServer(server)
  .then(() => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));
