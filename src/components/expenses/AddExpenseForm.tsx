import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CreditCard, DollarSign, Tag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface AddExpenseFormProps {
  onSuccess: () => void;
}

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const currentDate = format(new Date(), 'MMMM d, yyyy');
  const currentTime = format(new Date(), 'h:mm a');
  
  const categories = [
    { id: 'food', name: 'Food & Dining' },
    { id: 'transport', name: 'Transportation' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'utilities', name: 'Utilities' },
    { id: 'health', name: 'Health & Medical' },
    { id: 'travel', name: 'Travel' },
    { id: 'other', name: 'Other' },
  ];
  
  const paymentMethods = [
    { id: 'cash', name: 'Cash' },
    { id: 'credit', name: 'Credit Card' },
    { id: 'debit', name: 'Debit Card' },
    { id: 'bank', name: 'Bank Transfer' },
    { id: 'mobile', name: 'Mobile Payment' },
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      // Success handler
      onSuccess();
    }, 800);
  };
  
  return (
    <div className="px-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Add New Expense</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Record a new expense with details
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onSuccess} className="rounded-full">
          <X size={18} />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10 text-xl font-medium"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-muted-foreground ml-4">₹</span>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="What was this expense for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="payment-method" className="text-sm font-medium">
                Payment Method
              </Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                <SelectTrigger id="payment-method" className="w-full">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
          
        <div className="rounded-lg bg-muted/40 p-3">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Date</span>
              </div>
              <span className="font-medium">{currentDate}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Time</span>
              </div>
              <span className="font-medium">{currentTime}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <motion.div
                  className="h-4 w-4 border-2 border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Saving...
              </>
            ) : (
              'Save Expense'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
