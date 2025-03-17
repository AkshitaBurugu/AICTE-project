
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { Edit, MoreHorizontal, Plus, Trash } from 'lucide-react';

const Categories = () => {
  const categories = [
    { id: 'food', name: 'Food & Dining', icon: '🍕', expenses: 42, amount: 1234.56 },
    { id: 'transport', name: 'Transportation', icon: '🚗', expenses: 28, amount: 756.30 },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', expenses: 36, amount: 1567.89 },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬', expenses: 12, amount: 345.50 },
    { id: 'utilities', name: 'Utilities', icon: '💡', expenses: 8, amount: 890.45 },
    { id: 'health', name: 'Health & Medical', icon: '⚕️', expenses: 5, amount: 567.20 },
    { id: 'travel', name: 'Travel', icon: '✈️', expenses: 3, amount: 2345.67 },
    { id: 'other', name: 'Other', icon: '📦', expenses: 15, amount: 432.10 },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Manage expense categories and track spending patterns
          </p>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={itemVariants}>
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-card-hover">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-primary/10 text-xl">
                      {category.icon}
                    </div>
                    <CardTitle className="text-base">{category.name}</CardTitle>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Category
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Expenses</div>
                    <div className="font-medium">{category.expenses}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="font-medium">₹{category.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Categories;
