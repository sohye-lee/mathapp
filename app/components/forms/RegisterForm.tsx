'use  client';
import React, { useEffect, useState } from 'react';
import FormItem from '../ui/FormItem';
import { useForm } from 'react-hook-form';
import { User } from '@/types/types';
import useMutation from '@/app/lib/useMutation';
import { avatars } from '@/app/lib/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface RegisterFormProps {
  username: string;
  password: string;
  email?: string;
  firstname?: string;
  lastname?: string;
}
export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>();

  const [avatar, setAvatar] = useState<string>();
  const [registerUser, { data, isLoading, error }] = useMutation(
    '/api/users/register',
    'POST'
  );

  const onValid = (validForm: RegisterFormProps) => {
    registerUser({ ...validForm, avatar });
  };
  useEffect(() => {
    data && data?.ok && router.push('/');
  }, [data, router]);
  return (
    <div>
      {data && !data?.ok && (
        <p className="text-purple-600 text-center mb-5">{data?.message}</p>
      )}
      <form
        onSubmit={handleSubmit(onValid)}
        className="w-full flex flex-col gap-3"
      >
        <h1 className="text-2xl font-semibold">Register</h1>
        <FormItem
          name="username"
          label={'Username'}
          type="text"
          formType="input"
          register={register}
          required={true}
          errors={errors?.username?.message}
        />
        <FormItem
          name="password"
          label={'Password'}
          type="password"
          formType="input"
          register={register}
          required={true}
          errors={errors?.password?.message}
        />
        <FormItem
          name="email"
          label={'Email'}
          type="email"
          formType="input"
          register={register}
          required={false}
          errors={errors?.email?.message}
        />
        <div className="flex items-stretch space-between gap-2">
          <FormItem
            name="firstname"
            label={'First Name'}
            type="text"
            formType="input"
            register={register}
            required={false}
            errors={errors?.firstname?.message}
          />
          <FormItem
            name="lastname"
            label={'Last Name'}
            type="text"
            formType="input"
            register={register}
            required={false}
            errors={errors?.lastname?.message}
          />
        </div>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          {avatars.map((item, i) => (
            <div
              key={i}
              className={`aspect-square relative overflow-hidden cursor-pointer border-2 rounded-sm ${
                avatar == item.url ? 'border-purple-400' : 'border-transparent'
              }`}
              onClick={() => setAvatar(item.url)}
            >
              <Image src={item.url} fill alt="avatar image" />
            </div>
          ))}
        </div>
        <button type="submit">{isLoading ? 'Loading...' : 'Sign Up'}</button>
      </form>
    </div>
  );
}
