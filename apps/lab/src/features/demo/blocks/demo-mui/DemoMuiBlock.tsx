import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mantine/core';

import * as React from 'react';
import type { FC } from 'react';

type NoChildrenProps = {
  children?: never;
};

const MediaCard: FC<NoChildrenProps> = () => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="/images/lizard.webp"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export const DemoMuiBlock: FC<NoChildrenProps> = () => {
  return (
    <div>
      <div className="lg:container lg:mx-auto">
        <h1 className="mb-2 text-4xl font-bold">Material-ui V5.</h1>
        <MediaCard />
      </div>
    </div>
  );
};
