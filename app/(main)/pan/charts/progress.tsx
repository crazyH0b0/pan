'use client';
import { CircularProgressbar } from 'react-circular-progressbar';

export default function Example({ chartdata }: { chartdata: any }) {
  return (
    <>
      <CircularProgressbar className="w-[180px] mt-12" value={chartdata} text={`${chartdata}%`} />
    </>
  );
}
