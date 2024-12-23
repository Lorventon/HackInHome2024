import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseInterceptors(FileInterceptor('imageFile'))
  @Post('/upload')
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const params = {};  // Пример параметра, который может быть передан в функцию
    const result = await this.imageService.processImage(
      {
        buffer: file.buffer,
        originalname: file.originalname,
      },
      params,  // Передача второго параметра
    );
    console.log(result);
    return result;
  }
}
