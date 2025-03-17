
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, MoreHorizontal, Search, Trash, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AddExpenseForm } from './AddExpenseForm';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Sample expense data - removed location property
const sampleExpenses = [
  {
    id: 'exp1',
    amount: 42.99,
    description: 'Weekly Grocery Shopping',
    category: 'food',
    categoryName: 'Food & Dining',
    paymentMethod: 'credit',
    paymentMethodName: 'Credit Card',
    date: new Date('2023-05-01T10:30:00')
  },
  {
    id: 'exp2',
    amount: 29.99,
    description: 'Monthly Netflix Subscription',
    category: 'entertainment',
    categoryName: 'Entertainment',
    paymentMethod: 'credit',
    paymentMethodName: 'Credit Card',
    date: new Date('2023-05-01T14:15:00')
  },
  {
    id: 'exp3',
    amount: 85.75,
    description: 'New Shoes',
    category: 'shopping',
    categoryName: 'Shopping',
    paymentMethod: 'debit',
    paymentMethodName: 'Debit Card',
    date: new Date('2023-04-30T15:45:00')
  },
  {
    id: 'exp4',
    amount: 12.50,
    description: 'Lunch with Colleagues',
    category: 'food',
    categoryName: 'Food & Dining',
    paymentMethod: 'cash',
    paymentMethodName: 'Cash',
    date: new Date('2023-04-30T12:30:00')
  },
  {
    id: 'exp5',
    amount: 165.00,
    description: 'Electric Bill - April',
    category: 'utilities',
    categoryName: 'Utilities',
    paymentMethod: 'bank',
    paymentMethodName: 'Bank Transfer',
    date: new Date('2023-04-29T09:10:00')
  },
];

const categoryColors: Record<string, string> = {
  food: 'bg-emerald-100 text-emerald-800',
  entertainment: 'bg-purple-100 text-purple-800',
  shopping: 'bg-blue-100 text-blue-800',
  utilities: 'bg-orange-100 text-orange-800',
  health: 'bg-red-100 text-red-800',
  transport: 'bg-yellow-100 text-yellow-800',
  travel: 'bg-indigo-100 text-indigo-800',
  other: 'bg-gray-100 text-gray-800'
};

const paymentMethodIcons: Record<string, string> = {
  credit: '💳',
  debit: '💳',
  cash: '💵',
  bank: '🏦',
  mobile: '📱'
};

export const ExpensesList: React.FC = () => {
  const [expenses] = useState(sampleExpenses);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  
  // Filter expenses based on search query and category
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? expense.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });
  
  // Sort expenses based on sort option
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return b.date.getTime() - a.date.getTime();
      case 'date-asc':
        return a.date.getTime() - b.date.getTime();
      case 'amount-desc':
        return b.amount - a.amount;
      case 'amount-asc':
        return a.amount - b.amount;
      default:
        return 0;
    }
  });
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'food', name: 'Food & Dining' },
    { id: 'transport', name: 'Transportation' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'utilities', name: 'Utilities' },
    { id: 'health', name: 'Health & Medical' },
    { id: 'travel', name: 'Travel' },
    { id: 'other', name: 'Other' },
  ];
  
  const sortOptions = [
    { id: 'date-desc', name: 'Newest First' },
    { id: 'date-asc', name: 'Oldest First' },
    { id: 'amount-desc', name: 'Highest Amount' },
    { id: 'amount-asc', name: 'Lowest Amount' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <AnimatePresence>
          {sortedExpenses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No expenses found</h3>
              <p className="text-muted-foreground mt-1">
                Try changing your search query or filters
              </p>
            </motion.div>
          ) : (
            sortedExpenses.map((expense) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-card-hover">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="p-4 md:p-5 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                          <div className="font-medium text-xl">
                            ₹{expense.amount.toFixed(2)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground truncate">
                              {expense.description}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <Badge variant="outline" className={cn("font-normal", categoryColors[expense.category])}>
                                {expense.categoryName}
                              </Badge>
                              
                              <span className="flex items-center">
                                <span className="mr-1">{paymentMethodIcons[expense.paymentMethod]}</span>
                                {expense.paymentMethodName}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 px-4 md:px-5 border-t md:border-t-0 md:border-l border-border bg-muted/30">
                        <div className="text-sm">
                          <div className="font-medium">{format(expense.date, 'MMM d, yyyy')}</div>
                          <div className="text-muted-foreground">{format(expense.date, 'h:mm a')}</div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Expense
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
