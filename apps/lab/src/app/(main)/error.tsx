'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('@/components/Error').then((lib) => lib.Error));
