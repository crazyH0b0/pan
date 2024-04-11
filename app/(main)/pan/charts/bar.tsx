'use client';
import React from 'react';
import { BarChart } from '@tremor/react';

const dataFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString();
const Bar = ({ chartData }: { chartData: any }) => {
  return (
    <div className="w-full ">
      <BarChart
        className="mt-6 h-72"
        data={chartData}
        index="category"
        categories={['count']}
        colors={['blue']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
        autoMinValue={false}
        minValue={0}
        allowDecimals={false}
      />
    </div>
  );
};

export default Bar;
