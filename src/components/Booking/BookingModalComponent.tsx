import React, { useState } from 'react';
import { useRentABikeMutation } from '@/redux/features/bike/bikeApi';
import { TBike } from '@/types';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast, { Toaster } from 'react-hot-toast';

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bike: TBike;
};

export const BookingModalComponent: React.FC<BookingModalProps> = ({ isOpen, onClose, bike }) => {
  const [startTime, setStartTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rentABike] = useRentABikeMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const timestamp = new Date(startTime).toISOString();
      const bikeInformation = {
        bikeId: bike._id,
        startTime: timestamp
      };
      const response = await rentABike(bikeInformation).unwrap();
      window.location.href = response.data;
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error("Something Wrong Happened", {
        position: "top-right",
        duration: 3000
      })
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Book {bike.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="startTime" className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <Input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <p className="text-xl font-medium">Advance Booking Fee: 100 TK</p>
          <Button
            type="submit"
            className="w-full bg-green-500 text-white hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Pay 100 TK and Book'
            )}
          </Button>
        </form>
      </div>
      <Toaster />

    </div>
  );
};