import { Formik, Form, Field, ErrorMessage } from 'formik';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import useSignup from '@/hooks/useSignup';

export default function SignupComponent() {
    const { handleSignup, handleShow, show, validationSchema } = useSignup();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg p-6 space-y-8 bg-white dark:bg-dark border-2 dark:border-0 border-gray-700 dark:border-gray-700 rounded-md shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-dark dark:text-primary">Register</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Create your account to get started.</p>
                </div>

                <Formik
                    initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSignup}
                >
                    <Form className="space-y-6">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block ml-1 text-sm text-gray-700 dark:text-gray-300">
                                Name
                            </label>
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 p-2 h-[45px] placeholder:text-black-100 border-2 rounded-md border-gray-600"
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red text-sm mt-1"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block ml-1 text-sm text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 p-2 h-[45px] placeholder:text-black-100 border-2 rounded-md border-gray-600"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red text-sm mt-1"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="relative">
                                <label htmlFor="password" className="block ml-1 text-sm text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <Field
                                    id="password"
                                    name="password"
                                    type={show ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full px-4 p-2 h-[45px] placeholder:text-black-100 border-2 rounded-md border-gray-600"
                                />
                                <div className="absolute w-7 h-7 bottom-2 right-5">
                                    <button
                                        onClick={handleShow}
                                        type="button"
                                        className="bg-transparent p-1 w-full h-full flex items-center justify-center"
                                    >
                                        {show ? <EyeIcon className="text-gray-700" /> : <EyeOffIcon className="text-gray-700" />}
                                    </button>
                                </div>
                            </div>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red text-sm mt-1"
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <div className="relative">
                                <label htmlFor="confirmPassword" className="block ml-1 text-sm text-gray-700 dark:text-gray-300">
                                    Confirm Password
                                </label>
                                <Field
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={show ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className="w-full px-4 p-2 h-[45px] placeholder:text-black-100 border-2 rounded-md border-gray-600"
                                />
                            </div>
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="text-red text-sm mt-1"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="w-full flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-violet text-white font-semibold w-1/2 py-2 rounded-lg"
                            >
                                Sign Up
                            </button>
                        </div>
                    </Form>
                </Formik>

                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <a href="/login" className="font-medium text-primary dark:text-primary hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
