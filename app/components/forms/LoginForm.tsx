'use  client';
import React, { useEffect, useState } from 'react';
import FormItem from '../ui/FormItem';
import { useForm } from 'react-hook-form';
import useMutation from '@/app/lib/useMutation';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface LoginForm {
  username: string;
  password: string;
}
export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [login, { data, isLoading, error }] = useMutation(
    '/api/auth/signin',
    'POST'
  );

  const onValid = async (validForm: LoginForm) => {
    // login({ ...validForm });
    const res = await signIn('credentials', { ...validForm });
    if (res?.error) return;
    router.replace('/');
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
        <h1 className="text-2xl font-semibold text-slate-700">Login</h1>
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

        <button type="submit">{isLoading ? 'Loading...' : 'Login'}</button>
      </form>
    </div>
  );
}
