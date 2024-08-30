import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useAddABikeMutation } from '@/redux/features/bike/bikeApi';
import toast, { Toaster } from 'react-hot-toast';

const bikeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pricePerHour: z.coerce.number().positive("Price must be positive"),
  imageUrl: z.string(),
  isAvailable: z.boolean(),
  cc: z.coerce.number().positive("CC must be positive"),
  year: z.coerce.number().min(1950, "Year must be 1900 or later").max(new Date().getFullYear(), "Year cannot be in the future"),
  model: z.string().min(1, "Model is required"),
  brand: z.string().min(1, "Brand is required"),
});

export type BikeFormData = z.infer<typeof bikeSchema>;

const AddBike: React.FC = () => {
  const form = useForm<BikeFormData>({
    resolver: zodResolver(bikeSchema),
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

  const onSubmit = async (data: BikeFormData) => {
    try {
      await addBike(data).unwrap();
      toast.success("added successfully", {
        position: "top-right",
        duration: 2000
      })
    } catch (err) {
      toast.error("wrong", {
        position: "top-right",
        duration: 3000
      })
      console.log(err);
    }

  };

  return (
    <div className="max-w-4xl mx-auto roboto-condensed p-4 md:p-6 lg:p-8">
      <h1 className='text-teal-500 text-3xl md:text-4xl lg:text-5xl text-center mb-6'>Add New Bike</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="pricePerHour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (Hour)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CC</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Available for rent</FormLabel>
                  <FormDescription>
                    Check this if the bike is currently available for renting.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full py-3 text-lg">Add Bike</Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
};

export default AddBike;
