
import React, { useState } from 'react';
import { TBike } from '@/types';
import { useDeleteABikeMutation, useUpdateABikeInformationMutation } from '@/redux/features/bike/bikeApi';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import DeleteBikeAlert from './DeleteBikeAlert';
import UpdateBikeDialog from './UpdateBikeDialog';

interface ManageBikeDialogProps {
  bike: TBike;
  onDelete?: (id: string) => void;
}

const ManageBikeDialog: React.FC<ManageBikeDialogProps> = ({ bike, onDelete }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [deleteABike] = useDeleteABikeMutation();
  const [updateABike] = useUpdateABikeInformationMutation();

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
      setIsDeleteOpen(false);
    } catch (error) {
      console.error('Failed to delete bike:', error);
      toast.error("Something Wrong Happened ", {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  const handleUpdate = async (formData: TBike) => {
    try {
      const bikeInfo = {
        id: formData._id,
        name: formData.name,
        imageUrl: formData.imageUrl,
        pricePerHour: Number(formData.pricePerHour),
        cc: Number(formData.cc),
        year: Number(formData.year),
        model: formData.model,
        brand: formData.brand,
        description: formData.description,
        isAvailable: formData.isAvailable,
      };
      console.log(formData, 'form data')
      const res = await updateABike(bikeInfo).unwrap();
      console.log(res);
      setIsUpdateOpen(false);
      toast.success('Updated Successfully', {
        position: "top-right",
        duration: 2500,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something Wrong happened", {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <DeleteBikeAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        onDelete={handleDelete}
      />

      <UpdateBikeDialog
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        bike={bike}
        onUpdate={handleUpdate}
      />

      <Button variant="destructive" className="text-xl py-3 px-6" onClick={() => setIsDeleteOpen(true)}>
        Delete
      </Button>
      <Button variant="default" className="text-xl" onClick={() => setIsUpdateOpen(true)}>
        Update
      </Button>
    </>
  );
};

export default ManageBikeDialog;
