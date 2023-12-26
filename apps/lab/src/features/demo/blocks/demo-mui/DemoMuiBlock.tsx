import {
    Button,
    Card,
    Image,
    Text
} from '@mantine/core';

import * as React from 'react';
import type { FC } from 'react';

type NoChildrenProps = {
    children?: never;
};

const MediaCard: FC<NoChildrenProps> = () => {
    return (
        <Card>
            <Card.Section>

                <Image
                    height="140"
                    src="/images/lizard.webp"
                    alt="green iguana"
                />
            </Card.Section>

            <Card.Section>
                <Text variant="h5" component="div">
                    Lizard
                </Text>
                <Text variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Text>
            </Card.Section>
            <Card.Section>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </Card.Section>
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
