'use client';
import { CircularProgressbar } from 'react-circular-progressbar';

export default function Example({ chartdata }: { chartdata: any }) {
  const percentage = 66;

  return (
    <>
      <CircularProgressbar className="w-[180px] mt-12" value={4} text={`${4}%`} />;
    </>
  );
}
