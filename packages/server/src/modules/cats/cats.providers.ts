import { Cat } from './entities/cat.entity';

export const catsProviders = [
  {
    provide: 'CatsRepository',
    useValue: Cat,
  },
];
