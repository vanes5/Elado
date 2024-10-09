import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { promises as fsPromises } from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
@Injectable()
export class FileService {
  async writeFile(fileName: string, data: string): Promise<void> {
    const directoryPath = join(__dirname, '..', 'files');
    const filePath = join(directoryPath, fileName);
    await this.ensureDirectoryExists(directoryPath);
    return fsPromises.writeFile(filePath, data, 'utf8');
  }

  private async ensureDirectoryExists(path: string): Promise<void> {
    if (!fs.existsSync(path)) {
      await fsPromises.mkdir(path, { recursive: true });
    }
  }
}

