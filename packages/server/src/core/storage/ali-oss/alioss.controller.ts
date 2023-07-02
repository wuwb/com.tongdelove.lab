import {
    Body,
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
    UseGuards,
    Res,
    Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AliossService } from './alioss.service';
import { MyHttpException } from '@/common/exceptions/my-http.exception';
import { ErrorCode } from '@/common/constants/error.constant';

interface SampleDto {
    name: string;
}

@Controller('api/common/storage/alioss')
@UseGuards(AuthGuard('jwt'))
export class AliossController {
    constructor(
        private readonly configService: ConfigService,
        private readonly aliossService: AliossService
    ) { }


    @UseInterceptors(FileInterceptor('file'))
    @Post('file/upload')
    uploadFile(
        @Body() body: SampleDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return {
            body,
            file: file.buffer.toString(),
        };
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFil2e(@UploadedFile() file: Express.Multer.File, @Res() res) {
        try {
            const mimeType = file.mimetype.split('/');
            if (file.size > Number(this.configService.get('FILE_IMAGE_SIZE'))) {
                return res.status(400).json({
                    message: 'file is too large to be uploaded',
                });
            }

            if (mimeType[0] !== 'image') {
                return res.status(400).json({
                    message: 'file should be an image',
                });
            }

            const fileKey = uuidv4();
            return res.status(201).json({
                fileUrl: `${this.configService.get('CLOUDFRONT_URL')}/${fileKey}`,
                message: `Successfully uploaded file ${file.originalname}`,
            });
        } catch (error) {
            return res.status(500).json({
                error: 'failed to upload file',
            });
        }
    }

    @Get(`policy`)
    // @UseGuards(ActiveGuard)
    async ossPolicy() {
        const uploadPolicy = await this.aliossService.requestPolicy();
        return {
            uploadPolicy,
        };
    }

    @Post(`callback`)
    async ossCallback(@Body() body, @Req() req) {
        if (body['callback-token'] !== this.configService.get('aliyunOSS.callbackSecretToken')) {
            return {
                Status: 'verdify not ok',
            };
        }
        console.log(JSON.stringify(body));

        const imgData = {
            mime: body.mimeType,
            size: body.size,
            url: body.filename,
            width: body.width,
            height: body.height,
            format: body.format,
        };
        const img: any = await this.aliossService.createImage(imgData);
        img.url = this.configService.get('static.uploadImgURL') + '/' + imgData.url;
        return img;
    }

    @Post(`createimg`)
    async createimg(@Body('path') path: string) {
        if (this.configService.get('env') !== this.configService.get('DEVELOPMENT')) {
            throw new MyHttpException(ErrorCode.NotFound.CODE);
        }
        if (!path) {
            throw new MyHttpException(ErrorCode.ParamsError.CODE);
        }
        const imgData = await this.aliossService.getImageInfo(path);
        if (!imgData) {
            throw new MyHttpException(ErrorCode.ParamsError.CODE);
        }
        const img: any = await this.aliossService.createImage({
            ...imgData,
            url: imgData.url,
        });
        img.url = this.configService.get('static.uploadImgURL') + imgData.url;
        return img;
    }
}
