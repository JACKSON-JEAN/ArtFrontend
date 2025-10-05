import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { HANDLE_PAYMENT_CALLBACK } from '../graphql/payments';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [handlePaymentCallback] = useMutation(HANDLE_PAYMENT_CALLBACK);
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const processCallback = async () => {
      const orderTrackingId = searchParams.get('OrderTrackingId');
      const paymentMethod = searchParams.get('PaymentMethod');
      
      if (!orderTrackingId) {
        setStatus('error');
        setMessage('Invalid payment callback');
        return;
      }

      try {
        const result = await handlePaymentCallback({
          variables: {
            input: {
              orderTrackingId: orderTrackingId,
              paymentMethod: paymentMethod || 'UNKNOWN'
            }
          }
        });

        if (result.data.handlePaymentCallback.success) {
          setStatus('success');
          setMessage('Payment completed successfully!');
          // Redirect to order confirmation page after a delay
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('Payment failed: ' + result.data.handlePaymentCallback.message);
        }
      } catch (error: any) {
        setStatus('error');
        setMessage('Error processing payment: ' + error.message);
      }
    };

    processCallback();
  }, [searchParams, navigate, handlePaymentCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {status === 'processing' && 'Processing Payment...'}
          {status === 'success' && 'Payment Successful!'}
          {status === 'error' && 'Payment Failed'}
        </h2>
        <p>{message}</p>
        {status === 'processing' && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;