'use client';
import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { File, Share } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { CancelFileShare } from '@/actions/manage-file';
import { toast } from 'sonner';

interface ShareTableProps {
  files: (Share & { file: File })[];
}

const ShareTable = ({ files }: ShareTableProps) => {
  const onCancelShare = async (file: Share & { file: File }) => {
    try {
      await CancelFileShare(file as Share);
      toast.success('取消分享成功~');
    } catch (error) {
      toast.error('取消分析失败!');
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">文件名</TableHead>
          <TableHead>文件类型</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => {
          const suffixArr = file.file.name.split('.');
          const type = suffixArr[suffixArr.length - 1];
          return (
            <TableRow key={file.fileId}>
              <TableCell className="font-medium">{file.file.name}</TableCell>
              <TableCell>{type}</TableCell>
              <TableCell className="text-left">
                <Button variant="ghost" size={'sm'} className="text-left" onClick={() => onCancelShare(file)}>
                  取消分享
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      {/* <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        <TableCell className="text-right">$2,500.00</TableCell>
      </TableRow>
    </TableFooter> */}
    </Table>
  );
};

export default ShareTable;
