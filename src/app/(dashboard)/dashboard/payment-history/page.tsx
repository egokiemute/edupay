"use client";
import React, { useEffect, useState } from 'react';
import PaymentHistory from '../_component/PaymentHistory';

// Define the payment interface
interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  currency: string;
  paymentDate: string;
  referenceId: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  semester: string;
  feeType: string;
}

// Sample payment data
const samplePayments: Payment[] = [
  {
    id: '1',
    studentId: 'STU001',
    studentName: 'John Doe',
    amount: 5000,
    currency: 'usd',
    paymentDate: '2025-03-15T10:30:00Z',
    referenceId: 'TRX12345678',
    status: 'completed',
    paymentMethod: 'Credit Card',
    semester: 'Spring 2025',
    feeType: 'Tuition Fee',
  },
  {
    id: '2',
    studentId: 'STU002',
    studentName: 'Jane Smith',
    amount: 2500,
    currency: 'usd',
    paymentDate: '2025-03-10T14:45:00Z',
    referenceId: 'TRX87654321',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    semester: 'Spring 2025',
    feeType: 'Accommodation Fee',
  },
  {
    id: '3',
    studentId: 'STU003',
    studentName: 'Michael Johnson',
    amount: 1000,
    currency: 'usd',
    paymentDate: '2025-04-01T09:15:00Z',
    referenceId: 'TRX98765432',
    status: 'pending',
    paymentMethod: 'Stripe',
    semester: 'Spring 2025',
    feeType: 'Lab Fee',
  },
  {
    id: '4',
    studentId: 'STU001',
    studentName: 'John Doe',
    amount: 500,
    currency: 'usd',
    paymentDate: '2025-02-28T16:20:00Z',
    referenceId: 'TRX23456789',
    status: 'failed',
    paymentMethod: 'Credit Card',
    semester: 'Spring 2025',
    feeType: 'Library Fee',
  },
  {
    id: '5',
    studentId: 'STU004',
    studentName: 'Emily Davis',
    amount: 3500,
    currency: 'usd',
    paymentDate: '2025-03-25T11:10:00Z',
    referenceId: 'TRX34567890',
    status: 'completed',
    paymentMethod: 'Stripe',
    semester: 'Spring 2025',
    feeType: 'Tuition Fee',
  },
];

const PaymentHistoryPage: React.FC = () => {
  // State to control whether to use sample data or fetch from API
  const [useSampleData, setUseSampleData] = useState<boolean>(true);
  const [payments, setPayments] = useState<Payment[]>(samplePayments);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch from API if not using sample data
    if (!useSampleData) {
      fetchPaymentHistory();
    }
  }, [useSampleData]);

  // Function to fetch payment history from API
  const fetchPaymentHistory = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('/api/payments/history');
      
      if (!response.ok) {
        throw new Error('Failed to fetch payment history');
      }
      
      const data = await response.json();
      setPayments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching payment history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewReceipt = (paymentId: string) => {
    console.log(`View receipt for payment: ${paymentId}`);
    window.open(`/receipts/${paymentId}`, '_blank');
  };

  const handleExportCSV = () => {
    console.log('Exporting payment history to CSV');
    
    const headers = [
      'Student Name',
      'Student ID',
      'Amount',
      'Fee Type',
      'Semester',
      'Payment Date',
      'Reference ID',
      'Status',
      'Payment Method',
    ];
    
    const csvRows = [
      headers.join(','),
      ...payments.map(payment => [
        `"${payment.studentName}"`,
        payment.studentId,
        payment.amount,
        `"${payment.feeType}"`,
        `"${payment.semester}"`,
        `"${new Date(payment.paymentDate).toLocaleString()}"`,
        payment.referenceId,
        payment.status,
        `"${payment.paymentMethod}"`
      ].join(','))
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `payment_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toggle between sample data and API data
  const toggleDataSource = () => {
    setUseSampleData(!useSampleData);
  };

  return (
    <div className="max-w-7xl w-full mr-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Student Fee Payments</h1>
        
        {/* Toggle button for development purposes */}
        <button 
          onClick={toggleDataSource}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium"
        >
          {useSampleData ? "Switch to API Data" : "Switch to Sample Data"}
        </button>
      </div>
      
      {/* Source indicator */}
      <div className="mb-4 text-sm text-gray-500">
        Currently using: <span className="font-medium">{useSampleData ? "Sample Data" : "API Data"}</span>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : (
        <PaymentHistory
          payments={payments}
          onViewReceipt={handleViewReceipt}
          onExportCSV={handleExportCSV}
        />
      )}
    </div>
  );
};

export default PaymentHistoryPage;