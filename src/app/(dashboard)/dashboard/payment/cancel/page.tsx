"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import axiosInstance from "@/lib/Axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PaymentInfo {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  currency: string;
  referenceId: string;
  feeType: string;
  semester: string;
  status?: string;
}

interface CustomError {
  message?: string;
  response?: {
    data?: {
      error?: string;
    };
  };
}

const PaymentCancelContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [payment, setPayment] = useState<PaymentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const referenceId = searchParams.get("reference");

  // Format price as currency
  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      if (!referenceId) {
        setError("Missing reference ID");
        setLoading(false);
        return;
      }

      try {
        // Fetch payment details
        const response = await axiosInstance.get(`/api/payment/verify?reference=${referenceId}`);
        
        if (response.status === 200 && response.data.payment) {
          setPayment(response.data.payment);
          
          // Update payment status to failed if it was pending
          if (response.data.payment.status === 'pending') {
            await axiosInstance.post('/api/payment/update-status', {
              referenceId,
              status: 'failed'
            });
          }
        } else {
          setError("Could not retrieve payment information");
        }
      } catch (err: unknown) {
        const processedError = err as CustomError;
        console.error("Payment information error:", processedError);
        
        const errorMessage = 
          processedError.response?.data?.error || 
          processedError.message || 
          "Could not retrieve payment details. Please contact support.";
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentInfo();
  }, [referenceId]);

  const handleRetry = () => {
    if (payment) {
      // Navigate back to payment page or restart payment flow
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        <p className="mt-4 text-gray-600">Processing...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-red-500 text-center mb-6">
          <XCircle className="h-16 w-16 mx-auto" />
          <h2 className="text-2xl font-bold mt-2">Payment Cancelled</h2>
        </div>
        
        {payment ? (
          <div className="border-t border-b border-gray-200 py-4 my-4">
            <p className="text-center text-gray-600 mb-4">
              Your payment for the following was cancelled:
            </p>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Reference ID:</span>
              <span className="font-semibold">{payment.referenceId}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Student Name:</span>
              <span className="font-semibold">{payment.studentName}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Fee Type:</span>
              <span className="font-semibold">{payment.feeType}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Semester:</span>
              <span className="font-semibold">{payment.semester}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(payment.amount, payment.currency)}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 my-4">
            {error || "Your payment was not completed. No charges were made to your account."}
          </p>
        )}
        
        <div className="mt-6 flex justify-center space-x-4">
          <Button 
            variant="outline" 
            onClick={handleRetry}
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            Try Again
          </Button>
          
          <Link href="/">
            <Button className="bg-red-600 text-white hover:bg-red-700">
              Return Home
            </Button>
          </Link>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>No charges have been made to your account.</p>
          <p className="mt-1">For any questions, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelContent;