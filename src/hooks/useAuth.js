'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginUser, logout } from '@/redux/features/authSlice';
import { saveUserToLocalStorage, removeUserFromLocalStorage, getUserFromLocalStorage } from '@/lib/auth';

export default function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated, status, error } = useSelector((state) => state.auth);
  
  useEffect(() => {
    // If user is authenticated, save to localStorage
    if (isAuthenticated && user) {
      saveUserToLocalStorage(user);
    }
  }, [isAuthenticated, user]);

  const login = async (email, password) => {
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      router.push('/dashboard');
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    dispatch(logout());
    removeUserFromLocalStorage();
    router.push('/login');
  };

  return {
    user,
    isAuthenticated,
    isLoading: status === 'loading',
    error,
    login,
    logout: logoutUser,
  };
}