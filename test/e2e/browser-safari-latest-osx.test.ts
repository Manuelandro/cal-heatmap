// @ts-ignore
import Runner from './Runner';

Runner(
  'OS X Ventura / Safari Latest',
  'https://cal-heatmap.com/tests/index-d3v7-umd.html',
  {
    'bstack:options': {
      os: 'OS X',
      osVersion: 'Ventura',
      browserVersion: 'latest',
    },
    browserName: 'Safari',
  },
);
