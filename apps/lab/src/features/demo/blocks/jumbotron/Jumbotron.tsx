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
    console.log('interval');
    setCount((count) => (count >= titles.length - 1 ? 0 : count + 1));
  }, 1000);

  return (
    <div>
      One of many possibles
      <br /> made with
      {titles.map((title, idx) => {
        const [label, grad] = title;
        const curr = idx === count;
        return (
          <div
            key={grad}
            className={curr ? 'fadeIn' : 'fadeOut'}
            style={{
              background: grad
            }}
          >
            {label} - {grad} - {curr} - {count} - {idx}
          </div>
        );
      })}
    </div>
  );
};
