'use client';
import { deleteCookieCredential } from '@/utils/getCookieCredential ';
import { Power } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Logout = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookieCredential();
    router.push('/login');
  };
  return <Power className="cursor-pointer" onClick={handleLogout} />;
};

export default Logout;
