
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md px-4"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="text-9xl font-display font-bold text-primary/10">404</div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold">
              Page not found
            </div>
          </div>
        </div>
        <p className="text-muted-foreground mb-8">
          We couldn't find the page you were looking for. It might have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">Return to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/expenses">View Expenses</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
