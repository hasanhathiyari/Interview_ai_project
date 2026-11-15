import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../Hooks/useAuth'
import '../auth.form.scss'

const Login = () => {
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const success = await handleLogin({ email, password })
    setSubmitting(false)
    if (success) navigate('/')
    else setError('We couldn’t sign you in. Check your details and try again.')
  }

  if (loading) {
    return <main className="auth-page"><div className="auth-loading">Checking your account…</div></main>
  }

  return (
    <main className="auth-page">
      <section className="auth-layout">
        <aside className="auth-story">
          <Link className="auth-brand" to="/" aria-label="Prepwise home"><span className="auth-brand-mark">P</span> prepwise</Link>
          <div className="story-copy">
            <p className="auth-eyebrow">YOUR NEXT CHAPTER</p>
            <h1>Make your next interview <span>your best one.</span></h1>
            <p>Personalized preparation, built around your experience and the role you want.</p>
          </div>
          <div className="story-note"><span>✦</span> A little preparation goes a long way.</div>
          <span className="story-orbit orbit-one" /><span className="story-orbit orbit-two" />
        </aside>

        <section className="auth-panel" aria-labelledby="login-title">
          <div className="auth-form-wrap">
            <p className="auth-eyebrow">WELCOME BACK</p>
            <h2 id="login-title">Sign in</h2>
            <p className="auth-subtitle">Pick up where your preparation left off.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-field" htmlFor="email">
                <span>Email address</span>
                <input autoComplete="email" required type="email" id="email" name="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <label className="auth-field" htmlFor="password">
                <span>Password</span>
                <input autoComplete="current-password" required type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} />
              </label>
              {error && <p className="auth-error" role="alert">{error}</p>}
              <button className="auth-submit" type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'} <span aria-hidden="true">→</span></button>
            </form>

            <p className="auth-switch">New to Prepwise? <Link to="/register">Create an account</Link></p>
            <p className="auth-privacy">Your information stays private and secure.</p>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Login
