import { useState, type FC } from 'react';
import { useIntervalWhen } from 'rooks';

const titles = [
  ['Typescript', 'sky'],
  ['React', 'orange'],
  ['Nextjs', 'violet'],
  ['Prisma', 'yellow'],
  ['Emotion', 'fun'],
] as any

export const Jumbotron: FC = () => {
  const [count, setCount] = useState(0);
  useIntervalWhen(() => {
    setCount((count) => (count >= titles.length - 1 ? 0 : count + 1));
  }, 3500);

  return (
    <div>
      One of many possibles
      <br /> made with
      {titles.map((title, idx) => {
        const [label, grad] = title;
        const curr = idx === count;
        return (
          <div
            className={curr ? 'fadeIn' : 'fadeOut'}
            key={grad}
            bg={grad}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};
