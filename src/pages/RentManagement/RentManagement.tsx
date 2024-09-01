import React, { useState } from "react";
import Loading from "@/components/Shared/Loading";
import { useCalculateTotalCostMutation, useGetAllRentalDetailsQuery } from "@/redux/features/bike/bikeApi";
import { format, parseISO, isBefore } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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

const RentManagement = () => {
  const { data, isError, isLoading } = useGetAllRentalDetailsQuery(undefined, {
    pollingInterval: 10000
  });
  const [sendData] = useCalculateTotalCostMutation();
  const [returnTimes, setReturnTimes] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (isLoading) {
    return <Loading message="Loading" />;
  }

  if (isError) {
    return <Loading message="Some Error Occurred" />;
  }

  const handleReturnTimeChange = (id: string, value: string) => {
    setReturnTimes((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleCalculate = async (rental: BookingData) => {
    const returnTime = returnTimes[rental._id];

    if (!returnTime) {
      setErrors((prev) => ({ ...prev, [rental._id]: "Return time cannot be empty." }));
      return;
    }

    const startTime = parseISO(rental.startTime);
    const parsedReturnTime = parseISO(returnTime);

    if (isBefore(parsedReturnTime, startTime)) {
      setErrors((prev) => ({
        ...prev,
        [rental._id]: "Return time must be after the start time.",
      }));
      return;
    }

    const formattedReturnTime = new Date(returnTime).toISOString();

    const bookingInfo = {
      id: rental._id,
      returnTime: formattedReturnTime
    }

    try {
      const response = await sendData(bookingInfo).unwrap();
      toast.success("Calculated Successfully", {
        position: "top-right",
        duration: 2000
      });
      console.log(response, 'response');

      // Reset the calendar input
      setReturnTimes((prev) => ({ ...prev, [rental._id]: "" }));

    } catch (error) {
      console.error('Error calculating cost:', error);
      toast.error("Some Error Occurred", {
        position: "top-right",
        duration: 3000
      });
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto roboto-condensed">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Rent Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="px-2 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Image
                </TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"> Name</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Start Time</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Current Return Time</TableHead>

                <TableHead className="px-2 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">New Return Time</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Total Cost</TableHead>
                <TableHead className="px-2 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((rental: BookingData) => (
                <TableRow key={rental._id} className="bg-white border-b hover:bg-gray-50">

                  <TableCell className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                    <img src={rental.bikeId.imageUrl} alt={rental.bikeId.name} className="w-48 h-32" />

                  </TableCell>
                  <TableCell className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">{rental.bikeId.name}</TableCell>
                  <TableCell className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">{format(parseISO(rental.startTime), "PP HH:mm")}</TableCell>
                  <TableCell className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rental.returnTime ? format(parseISO(rental.returnTime), "PP HH:mm") : "Not set"}
                  </TableCell>
                  <TableCell className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                    {
                      !rental.returnTime ? <Input
                        type="datetime-local"
                        required
                        value={returnTimes[rental._id] || ""}
                        onChange={(e) => handleReturnTimeChange(rental._id, e.target.value)}
                        className="w-full text-xs md:text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      /> : "Return time has been set"
                    }
                    {errors[rental._id] && <p className="text-red-500 text-xs mt-1">{errors[rental._id]}</p>}
                  </TableCell>
                  <TableCell className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rental.totalCost} taka
                  </TableCell>
                  <TableCell className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Button
                      onClick={() => handleCalculate(rental)}
                      className="text-xs md:text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Calculate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Toaster />
    </Card>
  );
};

export default RentManagement;