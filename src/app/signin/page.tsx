'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'
import './page.css'

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/') // ✅ Redirect to homepage after email login
    }
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    })
  }

  return (
    <div className="background">
      <div className="floating-div">
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
      </div>

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-pink-100">
        <div className="text-center">
          <div className="logo-container">
            <circle className="logo-circle">
              <img src="/healthBroken.svg" alt="Logo" className="logo" />
            </circle>
          </div>
          <div className="heading">
            <h1 className="welcome">Welcome to Cards for Mental Health</h1>
            <p className="text-gray-600 mb-6">
              <strong>Login</strong> in or <strong>Register</strong> with your email
            </p>
          </div>

          <div className="googleButton">
            <button onClick={handleGoogleLogin} className="google-login">
              <img src="/google.svg" alt="Google logo" className="w-5 h-5" />
              Continue with Google
            </button>
          </div>
        </div>

        {/* <form onSubmit={handleEmailSignIn} className="form-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: '#f7aece' }}
            className="w-64 px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ backgroundColor: '#f7aece' }}
            className="w-64 px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            required
          />
          <button
            type="submit"
            className="w-64 bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
          >
            Sign In
          </button>
        </form> */}
      </div>
    </div>
  )
}

export default SignInPage