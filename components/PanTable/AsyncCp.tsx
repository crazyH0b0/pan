import React from 'react';
import DataTableDemo from './data-table';
import { useFolderStore } from '@/store/use-folder';

const AsyncCp = async () => {
  // const data = new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve('Data fetched successfully!');
  //   }, 3000);
  // });
  // const res = await data;
  return <DataTableDemo></DataTableDemo>;
};

export default AsyncCp;
