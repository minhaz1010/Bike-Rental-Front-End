import React from 'react';
import { TBike } from '@/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '../ui/textarea';

interface BikeFormProps {
  formData: TBike;
  setFormData: React.Dispatch<React.SetStateAction<TBike>>;
}

const BikeForm: React.FC<BikeFormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
      <div className='space-y-3'>
        <Label htmlFor="name" className="text-left">Name</Label>
        <Input id="name" value={formData.name} onChange={handleInputChange} className="w-full" />
      </div>
      <div className='space-y-3'>
        <Label htmlFor="pricePerHour" className="text-left">Price per Hour</Label>
        <Input id="pricePerHour" type="number" value={formData.pricePerHour} onChange={handleInputChange} className="w-full" />
      </div>
      <div className='space-y-3'>
        <Label htmlFor="cc" className="text-left">CC</Label>
        <Input id="cc" type="number" value={formData.cc} onChange={handleInputChange} className="w-full" />
      </div>
      <div className='space-y-3'>
        <Label htmlFor="year" className="text-left">Year</Label>
        <Input id="year" type="number" value={formData.year} onChange={handleInputChange} className="w-full" />
      </div>
      <div className='space-y-3'>
        <Label htmlFor="model" className="text-left">Model</Label>
        <Input id="model" value={formData.model} onChange={handleInputChange} className="w-full" />
      </div>
      <div className='space-y-3'>
        <Label htmlFor="brand" className="text-left">Brand</Label>
        <Input id="brand" value={formData.brand} onChange={handleInputChange} className="w-full" />
      </div>
      <div className="space-x-4  space-y-3">
        <Label htmlFor="isAvailable" className="text-left">Available</Label>
        <input
          id="isAvailable"
          type="checkbox"
          checked={formData.isAvailable}
          onChange={handleInputChange}
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
      </div>
      <div className="col-span-1 sm:col-span-2 space-y-3">
        <Label htmlFor="description" className="text-left">Description</Label>
        <Textarea id="description" value={formData.description} onChange={handleInputChange} className="w-full" />
      </div>
    </div>
  );
};

export default BikeForm;
