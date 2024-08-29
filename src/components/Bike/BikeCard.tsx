
// import React, { useState } from 'react';
// import { TBike } from '@/types';
// import bikeIcon from "../../assets/bycicle.png";
// import { Link } from 'react-router-dom';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import toast, { Toaster } from 'react-hot-toast';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { useDeleteABikeMutation } from '@/redux/features/bike/bikeApi';

// interface BikeCardProps {
//   bike: TBike;
//   status: 'view' | 'delete';
//   onDelete?: (id: string) => void;
// }

// const BikeCard: React.FC<BikeCardProps> = ({ bike, status, onDelete }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [deleteABike] = useDeleteABikeMutation()
//   const handleDelete = async () => {
//     try {
//       const id = bike._id
//       console.log(id, 'id');
//       await deleteABike({ id: id }).unwrap();
//       if (onDelete) {
//         onDelete(bike._id);
//       }
//       toast.success("Deleted Successfully", {
//         position: "top-right",
//         duration: 2000,
//       })
//       setIsOpen(false);


//     } catch (error) {
//       console.error('Failed to delete bike:', error);
//       toast.error("Something Wrong Happened ", {
//         position: "top-right",
//         duration: 3000,
//       })
//     }
//   };

//   return (
//     <div className="relative new-amsterdam-regular flex flex-col mt-6 text-gray-700 bg-white shadow-md rounded-xl w-full">
//       <div className="relative h-56 mx-4 -mt-6 overflow-hidden rounded-xl bg-blue-gray-500 shadow-lg">
//         <LazyLoadImage
//           src={bike.imageUrl}
//           alt={bike.name}
//           effect="blur"
//           width="100%"
//           height="100%"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="p-6">
//         <h5 className="block mb-2 text-3xl font-extralight leading-snug text-gray-900">
//           {bike.name} ({bike.cc}cc)
//         </h5>
//         <p className="block text-2xl font-light md:h-44 leading-relaxed text-gray-700">
//           {bike.description}
//         </p>
//         <div className="mt-4 flex justify-between items-center">
//           <span className="text-2xl font-semibold text-gray-800">
//             {bike.pricePerHour.toFixed(2)} BDT / hour
//           </span>
//           <span
//             className={`px-2 py-1 text-lg font-semibold rounded-full ${bike.isAvailable ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
//               }`}
//           >
//             {bike.isAvailable ? 'Available' : 'Unavailable'}
//           </span>
//         </div>
//       </div>
//       <div className="p-6 pt-0 flex justify-between items-center">
//         {status === 'view' ? (
//           bike.isAvailable ? (
//             <Link
//               to={`/bikes/${bike._id}`}
//               className="font-bold text-center uppercase duration-300 transition-colors hover:bg-blue-500 text-lg py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:outline-none"
//             >
//               View Details
//             </Link>
//           ) : (
//             <button
//               className="bg-gray-900 text-white text-lg font-bold py-3 px-6 rounded-lg opacity-50 cursor-not-allowed"
//             >
//               View Details
//             </button>
//           )
//         ) : (
//           <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
//             <AlertDialogTrigger asChild>
//               <Button variant="destructive" className="text-xl  py-3 px-6">
//                 Delete
//               </Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent className='roboto-condensed'>
//               <AlertDialogHeader>
//                 <AlertDialogTitle className='text-2xl'>Are you absolutely sure?</AlertDialogTitle>
//                 <AlertDialogDescription className='text-xl'>
//                   This action cannot be undone. This will permanently delete the bike
//                   from our servers.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>Cancel</AlertDialogCancel>
//                 <AlertDialogAction onClick={handleDelete}>
//                   Delete
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         )}
//         <span className='text-3xl flex justify-between gap-2 items-center'>
//           <img src={bikeIcon} alt="" />
//           {bike.brand}
//         </span>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default BikeCard;


import React from 'react';
import { TBike } from '@/types';
import bikeIcon from "../../assets/bycicle.png";
import { Toaster } from 'react-hot-toast';
import BikeImage from './BikeImage';
import BikeDetails from './BikeDetails';
import ViewDetailsButton from './ViewDetailsButton';
import DeleteBikeDialog from './DeleteBikeDialog';

interface BikeCardProps {
  bike: TBike;
  status: 'view' | 'delete';
  onDelete?: (id: string) => void;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike, status, onDelete }) => {
  return (
    <div className="relative new-amsterdam-regular flex flex-col mt-6 text-gray-700 bg-white shadow-md rounded-xl w-full">
      <BikeImage imageUrl={bike.imageUrl} name={bike.name} />
      <BikeDetails bike={bike} />
      <div className="p-6 pt-0 flex justify-between items-center">
        {status === 'view' ? (
          <ViewDetailsButton bike={bike} />
        ) : (
          <DeleteBikeDialog bike={bike} onDelete={onDelete} />
        )}
        <span className='text-3xl flex justify-between gap-2 items-center'>
          <img src={bikeIcon} alt="" />
          {bike.brand}
        </span>
      </div>
      <Toaster />
    </div>
  );
};

export default BikeCard;