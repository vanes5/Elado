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
