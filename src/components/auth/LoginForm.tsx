"use client"
import { useState } from "react";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { LeftAuthPage } from "@/components/auth/RegisterForm";
import { useLogin } from '@/hooks/users/useLoginUser';
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function EmoHubSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { 
    formData,
    setFormData,
    handleSubmission,
    handleLoginInputField,
    errors,
    isLoading,
  } = useLogin();

  // OAuth login handler
  const handleOAuthLogin = async (provider: string) => {
    setLoading(true);
    await signIn(provider, { callbackUrl: "/onboarding" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <LeftAuthPage />

      <div className="flex-1 bg-white flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
        {/* Mobile logo - only show on mobile */}
        <div className="flex lg:hidden items-center justify-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-slate-400 rounded-full"></div>
          </div>
          <span className="text-slate-700 text-lg font-medium">emoHub</span>
        </div>

        <div className="max-w-sm mx-auto w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 sm:mb-14 text-center">
            Happy to have you back
          </h2>

          {/* Google Sign In Button */}
          <button 
            className="w-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-lg py-3 px-4 flex items-center justify-center space-x-3 mb-6 mt-6 sm:mt-8"
            onClick={() => handleOAuthLogin("google")}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center space-x-4 mb-12 sm:mb-16">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmission();
          }}>
            <div className="space-y-4 sm:space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleLoginInputField}
                  className="w-full px-3 py-2 sm:py-3 border-b border-gray-300 focus:border-orange-400 focus:outline-none bg-transparent text-sm sm:text-base"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password_hash"
                    value={formData.password_hash}
                    onChange={handleLoginInputField}
                    className="w-full px-3 py-2 sm:py-3 border-b border-gray-300 focus:border-orange-400 focus:outline-none bg-transparent pr-10 text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 sm:top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password_hash && (
                  <p className="text-red-500 text-sm mt-1">{errors.password_hash}</p>
                )}
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end mt-6">
              <Link 
                href="/forgot-password" 
                className="text-sm text-blue-600 hover:underline transition-colors duration-200"
              >
                forgot password
              </Link>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-400 hover:bg-orange-500 disabled:bg-orange-300 text-white font-semibold py-3 px-4 rounded-lg mt-6 transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'LOGIN'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-500">No Account Yet? </span>
            <Link 
              href="/register" 
              className="text-sm text-gray-700 font-medium hover:underline"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}