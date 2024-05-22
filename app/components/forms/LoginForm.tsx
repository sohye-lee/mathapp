'use  client';
import React, { useEffect, useState } from 'react';
import FormItem from '../ui/FormItem';
import { useForm } from 'react-hook-form';
import useMutation from '@/app/lib/useMutation';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

interface LoginForm {
  username: string;
  password: string;
}
export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // const [login, { data, isLoading, error }] = useMutation(
  //   '/api/auth/signin',
  //   'POST'
  // );

  const onValid = async (validForm: LoginForm) => {
    try {
      const res = await signIn('credentials', { ...validForm });
      if (res?.error) {
        setMessage(res?.error);
        return;
      }
      router.replace('/');
      setMessage(`Welcome back}!`);
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  return (
    <div>
      {message && <p className="text-purple-600 text-center mb-5">{message}</p>}
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

        <button type="submit">Login</button>
        <Link href="/register" className="btn bg-amber-500">
          Sign Up
        </Link>
      </form>
    </div>
  );
}
