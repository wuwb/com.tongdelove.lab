import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

export async function setupSwagger(app: INestApplication, swaggerConfig): Promise<void> {
    const swaggerPath = `${swaggerConfig.root}`;
    console.log('swaggerPath: ', swaggerPath);
    const swaggerDocumentConfig = new DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setTermsOfService('https://docs.nestjs.cn/8/introduction')
        .setLicense('MIT', 'https://www.baidu.com')
        .setVersion(swaggerConfig.version)
        // .addTag('users')
        // 方便在 swagger 中测试登录
        .addBearerAuth({
            description: `Please enter token`,
            bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
            scheme: 'Bearer',
            type: 'http', // I`ve attempted type: 'apiKey' too
            in: 'Header',
            // name: 'token',
        })
        .build();
    const swaggerDocumentOptions: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) => `${methodKey}`,
    };
    const document = SwaggerModule.createDocument(app, swaggerDocumentConfig, swaggerDocumentOptions);
    // restful API 文檔
    const swaggerSetupOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customCssUrl: './utils/swagger/swagger.css',
        customfavIcon: './utils/swagger/favicon.png',
        customSiteTitle: 'Dowu',
    };
    // 打開 http://localhost:3000/api/docs 就會連結到 swagger 服務。
    SwaggerModule.setup(swaggerPath, app, document, swaggerSetupOptions);
}
