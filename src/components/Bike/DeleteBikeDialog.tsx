import React, { useState } from 'react';
import { TBike } from '@/types';
import { useDeleteABikeMutation } from '@/redux/features/bike/bikeApi';
import toast from 'react-hot-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteBikeDialogProps {
  bike: TBike;
  onDelete?: (id: string) => void;
}

const DeleteBikeDialog: React.FC<DeleteBikeDialogProps> = ({ bike, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteABike] = useDeleteABikeMutation();

  const handleDelete = async () => {
    try {
      await deleteABike({ id: bike._id }).unwrap();
      if (onDelete) {
        onDelete(bike._id);
      }
      toast.success("Deleted Successfully", {
        position: "top-right",
        duration: 2000,
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to delete bike:', error);
      toast.error("Something Wrong Happened ", {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="text-xl py-3 px-6">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='roboto-condensed'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-2xl'>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className='text-xl'>
            This action cannot be undone. This will permanently delete the bike
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBikeDialog;