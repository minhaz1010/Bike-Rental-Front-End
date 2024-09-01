


import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddABikeMutation } from '@/redux/features/bike/bikeApi';
import toast, { Toaster } from 'react-hot-toast';
import { TBikeFormData, TBikeSchema } from '@/types/schema.type';





const AddBike: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<TBikeFormData>({
    resolver: zodResolver(TBikeSchema),
    defaultValues: {
      name: '',
      description: '',
      pricePerHour: 0,
      imageUrl: '',
      isAvailable: true,
      cc: 0,
      year: new Date().getFullYear(),
      model: '',
      brand: '',
    },
  });

  const [addBike] = useAddABikeMutation();

  const onSubmit = async (data: TBikeFormData) => {
    try {
      await addBike(data).unwrap();
      toast.success("Bike added successfully", {
        position: "top-right",
        duration: 2000
      });
      reset();
    } catch (err) {
      toast.error("Error adding bike", {
        position: "top-right",
        duration: 3000
      });
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl roboto-condensed mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-center mb-6">Add New Bike</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <input {...field} id="name" className="w-full p-2 border rounded" />}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pricePerHour" className="block mb-1">Price (Hour)</label>
            <Controller
              name="pricePerHour"
              control={control}
              render={({ field }) => <input {...field} id="pricePerHour" type="number" className="w-full p-2 border rounded" />}
            />
            {errors.pricePerHour && <p className="text-red-500">{errors.pricePerHour.message}</p>}
          </div>

          <div>
            <label htmlFor="cc" className="block mb-1">CC</label>
            <Controller
              name="cc"
              control={control}
              render={({ field }) => <input {...field} id="cc" type="number" className="w-full p-2 border rounded" />}
            />
            {errors.cc && <p className="text-red-500">{errors.cc.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="model" className="block mb-1">Model</label>
            <Controller
              name="model"
              control={control}
              render={({ field }) => <input {...field} id="model" className="w-full p-2 border rounded" />}
            />
            {errors.model && <p className="text-red-500">{errors.model.message}</p>}
          </div>

          <div>
            <label htmlFor="brand" className="block mb-1">Brand</label>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => <input {...field} id="brand" className="w-full p-2 border rounded" />}
            />
            {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block mb-1">Image URL</label>
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => <input {...field} id="imageUrl" className="w-full p-2 border rounded" />}
          />
          {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <textarea {...field} id="description" className="w-full p-2 border rounded" rows={4} />}
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="year" className="block mb-1">Year</label>
          <Controller
            name="year"
            control={control}
            render={({ field }) => <input {...field} id="year" type="number" className="w-full p-2 border rounded" />}
          />
          {errors.year && <p className="text-red-500">{errors.year.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            name="isAvailable"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="isAvailable"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          <label htmlFor="isAvailable">Available for rent</label>
        </div>

        <button type="submit" className="w-full py-3 text-lg bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Bike
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddBike;