
import React, { useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Search, Filter, FileText, Download, ChevronRight, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const Receipts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateRange, setDateRange] = useState('all');

  // Sample receipts data
  const receipts = [
    {
      id: 'rec1',
      title: 'Grocery Shopping',
      vendor: 'SuperMart',
      amount: 1250.75,
      date: new Date('2023-05-10'),
      category: 'food',
      categoryName: 'Food & Dining',
      hasAttachment: true
    },
    {
      id: 'rec2',
      title: 'Phone Bill - May',
      vendor: 'Airtel',
      amount: 499.00,
      date: new Date('2023-05-05'),
      category: 'utilities',
      categoryName: 'Utilities',
      hasAttachment: true
    },
    {
      id: 'rec3',
      title: 'Movie Tickets',
      vendor: 'PVR Cinemas',
      amount: 650.00,
      date: new Date('2023-04-28'),
      category: 'entertainment',
      categoryName: 'Entertainment',
      hasAttachment: false
    },
    {
      id: 'rec4',
      title: 'Office Supplies',
      vendor: 'Staples',
      amount: 850.50,
      date: new Date('2023-04-22'),
      category: 'shopping',
      categoryName: 'Shopping',
      hasAttachment: true
    },
    {
      id: 'rec5',
      title: 'Taxi Fare',
      vendor: 'Uber',
      amount: 320.00,
      date: new Date('2023-04-18'),
      category: 'transport',
      categoryName: 'Transportation',
      hasAttachment: false
    },
  ];

  // Filter receipts
  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         receipt.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? receipt.category === categoryFilter : true;
    
    let matchesDate = true;
    const today = new Date();
    const receiptDate = new Date(receipt.date);
    
    if (dateRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      matchesDate = receiptDate >= weekAgo;
    } else if (dateRange === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);
      matchesDate = receiptDate >= monthAgo;
    } else if (dateRange === 'quarter') {
      const quarterAgo = new Date();
      quarterAgo.setMonth(today.getMonth() - 3);
      matchesDate = receiptDate >= quarterAgo;
    }
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  const categories = [
    { id: '', name: 'All Categories' },
    { id: 'food', name: 'Food & Dining' },
    { id: 'transport', name: 'Transportation' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'utilities', name: 'Utilities' },
    { id: 'health', name: 'Health & Medical' },
  ];

  const dateRanges = [
    { id: 'all', name: 'All Time' },
    { id: 'week', name: 'Past Week' },
    { id: 'month', name: 'Past Month' },
    { id: 'quarter', name: 'Past 3 Months' },
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Receipts</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your expense receipts and invoices
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search receipts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px] h-9">
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
          
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              {dateRanges.map((range) => (
                <SelectItem key={range.id} value={range.id}>
                  {range.name}
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
        {filteredReceipts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No receipts found</h3>
            <p className="text-muted-foreground mt-1">
              Try changing your search query or filters
            </p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="divide-y rounded-lg border"
          >
            {filteredReceipts.map((receipt, index) => (
              <motion.div
                key={receipt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    
                    <div>
                      <div className="font-medium">{receipt.title}</div>
                      <div className="text-sm text-muted-foreground">{receipt.vendor}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={cn("font-normal", categoryColors[receipt.category])}>
                          {receipt.categoryName}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(receipt.date, 'MMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="font-medium">₹{receipt.amount.toFixed(2)}</div>
                      {receipt.hasAttachment && (
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Receipt
                        </Button>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Receipts;
