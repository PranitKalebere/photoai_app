'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import useAuth from '@/hooks/useAuth';

export default function Layout({ children }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // This is a client-side check in addition to middleware
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return <DashboardLayout>{children}</DashboardLayout>;
}