import { Injectable, HttpException } from '@nestjs/common';
import { BOX } from './data';

@Injectable()
export class AutohotboxService {
    boxes = BOX;

    getAll(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.boxes);
        });
    }

    get(btcode): Promise<any> {
        btcode = Number(btcode);
        return new Promise(resolve => {
            const box = this.boxes.find(box => box.btcode === btcode);
            if (!box) {
                throw new HttpException('box does not exist!', 404);
            }
            resolve(box);
        });
    }

    add(box): Promise<any> {
        return new Promise(resolve => {
            this.boxes.push(box);
            resolve(this.boxes);
        });
    }

    delete(btcode): Promise<any> {
        btcode = Number(btcode);
        return new Promise(resolve => {
            const index = this.boxes.findIndex(box => box.btcode === btcode);
            if (index === -1) {
                throw new HttpException('Box does not exist!', 404);
            }
            this.boxes.splice(1, index);
            resolve(this.boxes);
        });
    }
}
