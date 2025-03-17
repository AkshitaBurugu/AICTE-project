
import React from 'react';
import { ExpensesList } from '@/components/expenses/ExpensesList';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AddExpenseForm } from '@/components/expenses/AddExpenseForm';
import { PlusIcon } from 'lucide-react';

const Expenses = () => {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = React.useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your expenses
          </p>
        </div>
        
        <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <AddExpenseForm onSuccess={() => setIsAddExpenseOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <ExpensesList />
    </div>
  );
};

export default Expenses;
