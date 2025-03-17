
import React, { useState } from 'react';
import { Bell, Search, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AddExpenseForm } from '@/components/expenses/AddExpenseForm';
import { cn } from '@/lib/utils';

interface TopBarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  return (
    <header className={cn(
      "h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      "sticky top-0 z-20 flex items-center justify-between px-4 transition-all duration-300"
    )}>
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="search" 
            placeholder="Search..." 
            className="h-9 w-64 rounded-md border border-input bg-background pl-10 text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <AddExpenseForm onSuccess={() => setIsAddExpenseOpen(false)} />
          </DialogContent>
        </Dialog>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
        </Button>

        <Avatar className="h-9 w-9 transition-transform hover:scale-105">
          <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
