'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form';
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Loader from './Loader';

const passwordRequirements = [
  { label: 'At least 8 characters', test: (pw: string) => pw.length >= 8 },
  { label: 'One capital letter', test: (pw: string) => /[A-Z]/.test(pw) },
  { label: 'One or more numbers', test: (pw: string) => /\d/.test(pw) },
  { label: 'Four or more lowercase letters', test: (pw: string) => (pw.match(/[a-z]/g) || []).length >= 4 },
];

const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'Must contain a capital letter')
    .regex(/\d/, 'Must contain a number')
    .refine((val) => (val.match(/[a-z]/g) || []).length >= 4, 'Must contain at least 4 lowercase letters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const signInSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
  confirmPassword: z.string().optional(),
});

const authFormSchema = (type: FormType) => (type === 'sign-up' ? signUpSchema : signInSchema);

const emailIsValid = (email: string) => /.+@.+\..+/.test(email);

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const isSignIn = type === 'sign-in';
  const passwordsMatch = password === confirmPassword;
  const allRequirementsMet = passwordRequirements.every((req) => req.test(password));

  const canSubmit = isSignIn
    ? emailIsValid(form.watch('email')) && password.length >= 8
    : (allRequirementsMet && passwordsMatch && !!password && !!confirmPassword);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSignInError(null);
    try {
      if (type === 'sign-up') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (data.success) {
          toast.success('Account created successfully!');
          router.push('/sign-in');
        } else {
          toast.error(data.message || 'Failed to create account.');
        }
      } else {
        const res = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (res?.ok) {
          router.push('/');
          toast.success('Signed in successfully!');
        } else if (res?.error) {
          setSignInError('Invalid email or password.');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(`There was an error: ${error instanceof Error ? error.message : 'Something went wrong'}`)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-border lg:min-w-[566px] min-h-[500px] max-h-[90vh] overflow-y-auto">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.png" alt="logo" height={38} width={60} />
          <h2 className="text-primary-100">InSight AI</h2>
        </div>
        <h3 className="text-center">Practice Job interview with AI</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {isSignIn && signInError && (
              <div className="text-red-500 text-center text-sm font-medium mb-2">{signInError}</div>
            )}
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email Address"
            />
            <div className="relative">
              <input
                className={`input w-full pr-10 ${!isSignIn && password && !allRequirementsMet ? 'border-red-500' : ''}`}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your Password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  form.setValue('password', e.target.value);
                }}
                autoComplete="new-password"
                name="password"
                id="password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-700/30 transition-colors"
                tabIndex={-1}
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {!isSignIn && (
              <>
                <ul className="mb-6 -mt-4 ml-2 space-y-1 text-sm">
                  {passwordRequirements.map((req) => (
                    <li key={req.label} className="flex items-center gap-2 transition-colors">
                      <span className={req.test(password) ? 'text-green-500' : 'text-red-500'}>{req.test(password) ? '✔' : '✗'}</span>
                      <span className={req.test(password) ? '' : 'opacity-70'}>{req.label}</span>
                    </li>
                  ))}
                </ul>
                <div className="relative">
                  <input
                    className={`input w-full pr-10 ${confirmPassword && !passwordsMatch ? 'border-red-500' : ''}`}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your Password"
                    value={confirmPassword}
                    onChange={e => {
                      setConfirmPassword(e.target.value);
                      form.setValue('confirmPassword', e.target.value);
                    }}
                    autoComplete="new-password"
                    name="confirmPassword"
                    id="confirmPassword"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-700/30 transition-colors"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {/* Passwords Match Error */}
                <div className="text-sm ml-2 min-h-[1.5em] transition-colors" style={{ color: confirmPassword && !passwordsMatch ? 'red' : 'inherit' }}>
                  {confirmPassword && !passwordsMatch ? 'Passwords do not match' : ''}
                </div>
              </>
            )}
            <Button className="btn" type="submit" disabled={!canSubmit || loading} style={{ opacity: canSubmit && !loading ? 1 : 0.6, cursor: canSubmit && !loading ? 'pointer' : 'not-allowed' }}>{isSignIn ? 'Sign in' : 'Create an Account'}</Button>
            {loading && <Loader />}
            <p className="text-center">
              {isSignIn ? 'New to InSight AI?' : 'Already have an account?'}
              <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
                {!isSignIn ? "Sign in" : 'Sign up'}</Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default AuthForm;