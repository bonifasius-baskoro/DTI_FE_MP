// components/auth/AuthForm.tsx
'use client'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { API_URL, BASE_URL } from '@/constant/url';

const getValidationSchema = (isLogin: boolean) => {
 const baseSchema = {
   email: Yup.string().email().required(),
   password: Yup.string().min(6).required(),
 };
 
 return isLogin ? Yup.object().shape(baseSchema) : Yup.object().shape({
   ...baseSchema,
   name: Yup.string().required(),
   role: Yup.string().oneOf(['user', 'organizer']).required(),
 });
};

export const AuthForm = ({ isLogin = false }) => {
 const router = useRouter();
 const initialValues = isLogin ? {
   email: '',
   password: ''
 } : {
   email: '',
   password: '',
   role: 'user',
   name: ''
 };

 const handleSubmit = async (values: typeof initialValues) => {
   if (isLogin) {
     const result = await signIn('credentials', {
       email: values.email,
       password: values.password,
       redirect: false
     });

     if (result?.ok) {
       router.push('/events');
     }
   } else {
     const endpoint = values.role === 'organizer' 
       ? `${BASE_URL}${API_URL.auth.registerEO}`
       : `${BASE_URL}${API_URL.auth.register}`;

     try {
       const res = await fetch(endpoint, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           email: values.email,
           password: values.password,
           name: values.name
         }),
       });
       
       if (res.ok) router.push('/login');
     } catch (error) {
       console.error('Registration failed:', error);
     }
   }
 };

 return (
   <Formik
     initialValues={initialValues}
     validationSchema={getValidationSchema(isLogin)}
     onSubmit={handleSubmit}
   >
     {({ errors, touched }) => (
       <Form className="space-y-4 p-6">
         <div>
           <Field
             name="email"
             placeholder="Email"
             className="w-full rounded-md border p-2"
           />
           {touched.email && errors.email && (
             <div className="text-red-500 text-sm">{errors.email}</div>
           )}
         </div>

         {!isLogin && (
           <div>
             <Field
               name="name"
               placeholder="Name"
               className="w-full rounded-md border p-2"
             />
             {touched.name && errors.name && (
               <div className="text-red-500 text-sm">{errors.name}</div>
             )}
           </div>
         )}

         <div>
           <Field
             name="password"
             type="password"
             placeholder="Password" 
             className="w-full rounded-md border p-2"
           />
           {touched.password && errors.password && (
             <div className="text-red-500 text-sm">{errors.password}</div>
           )}
         </div>

         {!isLogin && (
           <Field
             as="select"
             name="role"
             className="w-full rounded-md border p-2"
           >
             <option value="user">User</option>
             <option value="organizer">Event Organizer</option>
           </Field>
         )}

         <button 
           type="submit"
           className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
         >
           {isLogin ? 'Login' : 'Register'}
         </button>
       </Form>
     )}
   </Formik>
 );
};