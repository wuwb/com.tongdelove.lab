import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
// import { Cat } from '../../graphql.schema';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    { id: '1', name: 'Cat', age: 5 }
  ];

  create(cat: Cat): Cat {
    cat.id = `${this.cats.length + 1}`;
    this.cats.push(cat);
    return cat;
  }

  findOne(id: string): Cat {
    return this.cats[id];
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOneById(id: string) {
    // return this.cats.find(cat => cat.id === id);
  }
}
