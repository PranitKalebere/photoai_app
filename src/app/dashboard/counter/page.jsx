'use client';

import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { increment, decrement, incrementByAmount } from '@/redux/features/counterSlice';
import { useState } from 'react';

export default function CounterPage() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(2);

  return (
    <div className="max-w-lg mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Redux Counter</h1>
        
        <div className="flex justify-center items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-2 bg-red-500 text-white rounded-l-lg hover:bg-red-600 focus:outline-none"
            onClick={() => dispatch(decrement())}
          >
            -
          </motion.button>
          
          <motion.div 
            key={count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-8 py-2 bg-gray-100 font-bold text-2xl"
          >
            {count}
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 focus:outline-none"
            onClick={() => dispatch(increment())}
          >
            +
          </motion.button>
        </div>
        
        <div className="flex items-center justify-center space-x-2 mb-4">
          <input
            className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(Number(e.target.value) || 0)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-1 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none"
            onClick={() => dispatch(incrementByAmount(incrementAmount))}
          >
            Add Amount
          </motion.button>
        </div>
        
        <p className="text-gray-600 text-center mt-6">
          This counter is managed by Redux. The current value is stored in the Redux store and can be accessed from any component.
        </p>
      </motion.div>
    </div>
  );
}