import { FC } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

const RegisterPage: FC = () => (
 <div className="min-h-screen flex items-center justify-center bg-gray-50">
   <div className="w-full max-w-md bg-white rounded-lg shadow">
     <h1 className="text-2xl font-bold text-center p-6">Create Account</h1>
     <AuthForm />
   </div>
 </div>
);

export default RegisterPage;