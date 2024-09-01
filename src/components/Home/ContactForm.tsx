import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import DescriptionSection from '../Shared/DescriptionSection';
import { TContactSchema, TFormData } from '@/types/schema.type';




const ContactForm = () => {
  const { register, formState: { errors }, } = useForm<TFormData>({
    resolver: zodResolver(TContactSchema),
  });

  // const onSubmit = (data: FormData) => {
  //   reset();
  // };

  return (
    <section className="new-amsterdam-regular  px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <DescriptionSection title='contact us' />
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <form className="p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-2xl font-medium text-green-700">Name</label>
              <Input
                type="text"
                id="name"
                placeholder='Your Name'
                {...register("name")}
                className="mt-1 block w-full border-black rounded-md p-2 shadow-sm  sm:text-sm"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-2xl font-medium text-green-700">Email</label>
              <Input
                type="email"
                id="email"
                placeholder='YourEmail'
                {...register("email")}
                className="mt-1 block bg-gray-50  w-full p-2 rounded-md shadow-sm  sm:text-sm"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-2xl font-medium text-green-700">Message</label>
              <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                placeholder="Write your thoughts here..."
                {...register("message")}
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-green-600"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
