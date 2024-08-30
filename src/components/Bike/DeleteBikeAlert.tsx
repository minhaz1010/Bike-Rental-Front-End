// DeleteBikeAlert.tsx
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteBikeAlertProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: () => void;
}

const DeleteBikeAlert: React.FC<DeleteBikeAlertProps> = ({ isOpen, setIsOpen, onDelete }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className='roboto-condensed'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-2xl'>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className='text-xl'>
            This action cannot be undone. This will permanently delete the bike from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBikeAlert;