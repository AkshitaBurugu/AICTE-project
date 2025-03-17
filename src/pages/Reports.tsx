
import React, { useState } from 'react';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Reports = () => {
  const [period, setPeriod] = useState('monthly');

  // Sample data for charts
  const monthlyData = [
    { name: 'Jan', amount: 1200 },
    { name: 'Feb', amount: 900 },
    { name: 'Mar', amount: 1500 },
    { name: 'Apr', amount: 1000 },
    { name: 'May', amount: 1800 },
    { name: 'Jun', amount: 1300 },
  ];

  const categoryData = [
    { name: 'Food & Dining', value: 35 },
    { name: 'Transportation', value: 15 },
    { name: 'Shopping', value: 20 },
    { name: 'Entertainment', value: 10 },
    { name: 'Utilities', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  const renderLineChart = (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `₹₹{value}`} />
        <Tooltip formatter={(value) => [`₹₹{value}`, "Amount"]} />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `₹₹{value}`} />
        <Tooltip formatter={(value) => [`₹₹{value}`, "Amount"]} />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `₹{name} ₹{(percent * 100).toFixed(0)}%`}
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-₹{index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`₹{value}%`, "Percentage"]} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Expense Reports</h1>
          <p className="text-muted-foreground mt-1">
            Visualize your spending patterns
          </p>
        </div>
        
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Spending Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="line" className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
                <TabsTrigger value="line" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  <span>Trend</span>
                </TabsTrigger>
                <TabsTrigger value="bar" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  <span>Monthly</span>
                </TabsTrigger>
                <TabsTrigger value="pie" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  <span>Categories</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="line" className="mt-6">
                <div className="rounded-lg overflow-hidden">
                  {renderLineChart}
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>Trend analysis shows your spending patterns over time.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="bar" className="mt-6">
                <div className="rounded-lg overflow-hidden">
                  {renderBarChart}
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>Monthly breakdown helps you understand your spending by month.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="pie" className="mt-6">
                <div className="rounded-lg overflow-hidden">
                  {renderPieChart}
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>Category distribution shows where your money is going.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2"
      >
        <Card>
          <CardHeader>
            <CardTitle>Budget Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Food & Dining</div>
                  <div className="text-sm text-muted-foreground">₹1,200 / ₹1,500</div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Shopping</div>
                  <div className="text-sm text-muted-foreground">₹800 / ₹1,000</div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Transportation</div>
                  <div className="text-sm text-muted-foreground">₹600 / ₹800</div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Utilities</div>
                  <div className="text-sm text-muted-foreground">₹500 / ₹500</div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-destructive rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Spending Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="h-8 w-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                  <span>↓</span>
                </div>
                <div>
                  <div className="font-medium">Reduced spending</div>
                  <div className="text-sm text-muted-foreground">Entertainment expenses down by 15%</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="h-8 w-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center">
                  <span>↑</span>
                </div>
                <div>
                  <div className="font-medium">Increased spending</div>
                  <div className="text-sm text-muted-foreground">Food expenses up by 8%</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="h-8 w-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                  <span>!</span>
                </div>
                <div>
                  <div className="font-medium">Budget alert</div>
                  <div className="text-sm text-muted-foreground">Utilities budget almost reached</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Reports;
