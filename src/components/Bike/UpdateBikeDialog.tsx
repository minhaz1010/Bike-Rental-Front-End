import React, { useState } from 'react';
import { TBike } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BikeForm from './BikeForm';
// import BikeForm from './BikeForm';

interface UpdateBikeDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  bike: TBike;
  onUpdate: (formData: TBike) => void;
}

const UpdateBikeDialog: React.FC<UpdateBikeDialogProps> = ({ isOpen, setIsOpen, bike, onUpdate }) => {
  const [formData, setFormData] = useState<TBike>(bike);

  const handleUpdate = () => {
    onUpdate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] roboto-condensed sm:max-w-sm lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Bike</DialogTitle>
          <DialogDescription>
            Edit Bike Information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <BikeForm formData={formData} setFormData={setFormData} />
        <DialogFooter>
          <Button type="submit" onClick={handleUpdate}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBikeDialog;
