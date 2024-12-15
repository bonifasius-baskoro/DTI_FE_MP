// app/(auth)/login/page.tsx
'use client'
import { AuthForm } from '@/components/auth/AuthForm';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const LoginPage = () => {
 const { data: session } = useSession();

 if (session) {
   redirect(session.user.scope === 'ORGANIZER' ? '/organizer/events' : '/events');
 }

 return (
   <div className="min-h-screen flex items-center justify-center bg-gray-50">
     <div className="w-full max-w-md bg-white rounded-lg shadow">
       <h1 className="text-2xl font-bold text-center p-6">Login</h1>
       <AuthForm isLogin />
     </div>
   </div>
 );
};

export default LoginPage;