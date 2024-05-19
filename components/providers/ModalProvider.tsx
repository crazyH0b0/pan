'use client';
import React from 'react';
import CreateFolderModal from '../modals/create-folder-modal';
import RenameFileModal from '../modals/rename-file-modal';
import InviteModal from '../modals/invite-modal';
import FileDetailModal from '../modals/file-detail-modal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return;
  return (
    <>
      <CreateFolderModal />
      <RenameFileModal />
      <InviteModal />
      <FileDetailModal />
    </>
  );
};

export default ModalProvider;
