import React from 'react';
import { LineChart } from '@tremor/react';

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
