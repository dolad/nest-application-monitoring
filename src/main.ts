import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import promMiddleware from "express-prometheus-middleware"

const port = process.env.PORT || 3002;

const metricsMiddleware = promMiddleware({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.use(metricsMiddleware)

  console.log(`application running at ${port}`)
  await app.listen(port);
}
bootstrap();


// eyJrIjoiMDE0MDdkNTIzZDYyOGZlZWEwYjAzMTc0NzI4ODQ5ODYzNGI4M2JkOSIsIm4iOiJhcHBsaWNhdGlvbi1tb25pdG9yaW5nLXByb20iLCJpZCI6NzU4NTg4fQ==