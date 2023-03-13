import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AliossService } from './alioss.service';

interface SampleDto {
  name: string;
}

@Controller('alioss')
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
      // await this.uploadService.uploadPublicFile(file.buffer, fileKey);
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
}
