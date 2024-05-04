import React from 'react';
import UserTable, { UserTableProps } from './user-table';
import { getAllFiles } from '@/actions/get-all-files';

const SettingsPage = async () => {
  const userData = (await getAllFiles()) as any;
  if (userData.length === 0) {
    return <div>暂无数据</div>;
  }
  return (
    <div className=" mx-auto w-full">
      <UserTable data={userData} />
    </div>
  );
};

export default SettingsPage;
