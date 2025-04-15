'use client';

import { motion } from 'framer-motion';
import useAuth from '@/hooks/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        <div className="flex items-center mb-8">
          <div className="h-20 w-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          
          <div className="ml-6">
            <h2 className="text-xl font-semibold">{user?.name || 'User'}</h2>
            <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Account Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p>{user?.name || 'User'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{user?.email || 'user@example.com'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p>User</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p>April 9, 2025</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <p className="text-gray-600 text-sm">
            This profile information is stored in the Redux store and is available across the application.
            In a real application, this would be fetched from a backend server.
          </p>
        </div>
      </motion.div>
    </div>
  );
}