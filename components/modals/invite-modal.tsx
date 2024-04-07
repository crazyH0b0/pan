"use client"
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModalStore } from '@/store/use-modal';
import { useOrigin } from '@/hooks/use-origin';
import { updateShareCode } from '@/actions/gen-share-code';

const InviteModal = () => {
  const origin = useOrigin();
  const [isLoading, setIsLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const {data, onClose, isOpen, type, OnOpen} = useModalStore()
  const {file, code} = data
  const inviteUrl = `${origin}/share/${code}`;  
  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const onNew = async () => {
    try {
      setIsLoading(true);
      const code = await updateShareCode(file);      
      OnOpen('inviteModal', {file,code})
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  const isOpenModal = isOpen && type === 'inviteModal';

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
 
    <DialogContent className="bg-white text-black p-0 overflow-hidden">
      <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-xl text-center font-bold">
          分享文件
        </DialogTitle>
      </DialogHeader>
      <div className="p-6">
        <Label
          className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
        >
          分享链接
        </Label>
        <div className="flex items-center mt-2 gap-x-2">
          <Input
            disabled={isLoading}
            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
            value={inviteUrl}
          />
          <Button disabled={isLoading} onClick={onCopy} size="icon">
            {copied 
              ? <Check className="w-4 h-4" /> 
              : <Copy className="w-4 h-4" />
            }
          </Button>
        </div>
        <Button
          onClick={onNew}
          disabled={isLoading}
          variant="link"
          size="sm"
          className="text-xs text-zinc-500 mt-4"
        >
          重新生成链接
          <RefreshCw className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default InviteModal