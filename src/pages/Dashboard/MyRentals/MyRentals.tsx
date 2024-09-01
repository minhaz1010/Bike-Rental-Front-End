import { useState } from 'react';
import { format } from 'date-fns';
import Loading from '@/components/Shared/Loading';
import { useFullPaymentMutation, useGetStatusOfMyRentalBikeQuery } from '@/redux/features/bike/bikeApi';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';

const MyRentals = () => {
  const [activeTab, setActiveTab] = useState('unpaid');

  const { data, isError, isLoading } = useGetStatusOfMyRentalBikeQuery(undefined);
  const [sendData] = useFullPaymentMutation();

  if (isLoading) {
    return <Loading message='Loading' />;
  }
  if (isError) {
    return <Loading message='Some Error Occurred' />;
  }

  interface BookingData {
    _id: string;
    bikeId: {
      _id: string;
      name: string;
      imageUrl: string;
    };
    bookingStatus: string;
    transactionId: string;
    startTime: string;
    returnTime: string | null;
    totalCost: number;
    isReturned: boolean;
  }

  const rentals: BookingData[] = data?.data || [];
  const paidRentals = rentals.filter((rental) => rental.bookingStatus === "FULL_PAID");
  const unpaidRentals = rentals.filter((rental) => rental.bookingStatus === "INITIAL_PAID");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handlePayment = async (rentalId: string) => {
    try {
      const response = await sendData(rentalId).unwrap();
      console.log(response, 'response');
      window.location.href = response.data;
    } catch (error) {
      console.log(error);
      toast.error('Some Error', {
        position: "top-right",
        duration: 3000
      })
    }
  };

  const formatDate = (isoString: string | null) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return format(date, "PPpp");
  };

  return (
    <div className="my-rentals">
      <div className="mb-4 border-b roboto-condensed border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'unpaid' ? 'border-blue-600 text-blue-600' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
              type="button"
              role="tab"
              onClick={() => handleTabChange('unpaid')}
            >
              Unpaid
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'paid' ? 'border-blue-600 text-blue-600' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
              type="button"
              role="tab"
              onClick={() => handleTabChange('paid')}
            >
              Paid
            </button>
          </li>
        </ul>
      </div>
      <div id="default-tab-content ">
        {activeTab === 'unpaid' && (
          <div className="p-4 rounded-lg bg-gray-50 roboto-condensed dark:bg-gray-800">
            <h2 className="text-2xl font-semibold mb-8 text-center">Unpaid Rentals</h2>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black  uppercase tracking-wider">Bike Name</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black  uppercase tracking-wider">Start Time</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black  uppercase tracking-wider">Return Time</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black  uppercase tracking-wider">Total Cost</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black  uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {unpaidRentals.map((rental) => (
                  <tr key={rental._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 dark:text-white">{rental.bikeId.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 dark:text-gray-400">{formatDate(rental.startTime)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 dark:text-gray-400">{formatDate(rental.returnTime)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 dark:text-gray-400">{rental.totalCost}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                      <Button
                        variant="default"
                        className="text-white"
                        onClick={() => handlePayment(rental._id)}
                      >
                        Pay
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Paid Tab Content */}
        {activeTab === 'paid' && (
          <div className="p-4 rounded-lg roboto-condensed bg-gray-50 dark:bg-gray-800">
            <h2 className="text-2xl font-semibold mb-8 text-center">Paid Rentals</h2>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black uppercase tracking-wider">Bike Name</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black uppercase tracking-wider">Start Time</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black uppercase tracking-wider">Return Time</th>
                  <th className="px-6 py-3 text-left text-lg font-medium text-black uppercase tracking-wider">Total Cost</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {paidRentals.map((rental) => (
                  <tr key={rental._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 dark:text-white">{rental.bikeId.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 dark:text-gray-400">{formatDate(rental.startTime)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 dark:text-gray-400">{formatDate(rental.returnTime)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 dark:text-gray-400">{rental.totalCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default MyRentals;
