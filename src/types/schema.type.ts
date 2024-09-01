import z from "zod"
export const TSignUpschema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
});

export type TSignUpFormValues = z.infer<typeof TSignUpschema>;

export const TLoginschema = z.object({
  email: z.string({ message: "Email is required" }).email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Please Provide Your Password' }),
});

export type TLoginFormValues = z.infer<typeof TLoginschema>;

 export const TProfileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  address: z.string().optional(),
  mobileNumber: z.string().min(1, 'Mobile number is required').optional(),
});

export type TProfileFormInputs = z.infer<typeof TProfileSchema>;


export  const TPasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmNewPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});

export type TPasswordFormInputs = z.infer<typeof TPasswordSchema>;

export const TBikeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pricePerHour: z.coerce.number().positive("Price must be positive"),
  imageUrl: z.string().url("Must be a valid URL"),
  isAvailable: z.boolean(),
  cc: z.coerce.number().positive("CC must be positive"),
  year: z.coerce.number().min(1950, "Year must be 1950 or later").max(new Date().getFullYear(), "Year cannot be in the future"),
  model: z.string().min(1, "Model is required"),
  brand: z.string().min(1, "Brand is required"),
});


export type TBikeFormData = z.infer<typeof TBikeSchema>;

export const TContactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
});

export type TFormData = z.infer<typeof TContactSchema>;
