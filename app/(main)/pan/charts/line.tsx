import React from 'react';
import { LineChart } from '@tremor/react';

const mockData = [
  {
    次数: 1,
    date: '2024-04-04',
  },
  {
    次数: 3,
    date: '2024-04-05',
  },
  {
    次数: 0,
    date: '2024-04-06',
  },
  {
    次数: 8,
    date: '2024-04-07',
  },
  {
    次数: 12,
    date: '2024-04-08',
  },
  {
    次数: 1,
    date: '2024-04-09',
  },
  {
    次数: 6,
    date: '2024-04-010',
  },
];

const Line = ({ chartData }: { chartData: any }) => {
  return (
    <>
      <LineChart
        className="mt-4 h-72"
        data={chartData}
        index="date"
        categories={['次数']}
        colors={['rose']}
        yAxisWidth={40}
        minValue={0}
        maxValue={20}
        showGridLines={true}
      />
    </>
  );
};

export default Line;
