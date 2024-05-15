import React from 'react';
import UserTable from './user-table';
import { getAllFiles } from '@/actions/get-all-files';
import { getUsers } from '@/actions/manage-file';

const SettingsPage = async ({ searchParams }: { searchParams?: { type: string; keyword: string } }) => {
  const { type, keyword } = searchParams || { type: '', keyword: '' };
  const userData = (await getAllFiles(keyword)) as any;
  const users = (await getUsers(keyword)) as any;

  return (
    <div className=" mx-auto w-full">
      <UserTable data={userData} users={users} />
    </div>
  );
};

export default SettingsPage;
