import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../Hooks/useAuth'
import '../auth.form.scss'

const Register = () => {
  const navigate = useNavigate()
  const { loading, handleRegister } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const success = await handleRegister({ username, email, password })
    setSubmitting(false)
    if (success) navigate('/')
    else setError('We couldn’t create your account. Check your details and try again.')
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
            <p className="auth-eyebrow">START WITH A PLAN</p>
            <h1>Show up ready for <span>what’s next.</span></h1>
            <p>Create your account and turn your experience into a focused interview plan.</p>
          </div>
          <div className="story-note"><span>✦</span> Your next opportunity is worth preparing for.</div>
          <span className="story-orbit orbit-one" /><span className="story-orbit orbit-two" />
        </aside>

        <section className="auth-panel" aria-labelledby="register-title">
          <div className="auth-form-wrap">
            <p className="auth-eyebrow">GET STARTED</p>
            <h2 id="register-title">Create your account</h2>
            <p className="auth-subtitle">A few details and you’re ready to begin.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-field" htmlFor="username">
                <span>Your name</span>
                <input autoComplete="name" required type="text" id="username" name="username" placeholder="e.g. Rahul Sharma" value={username} onChange={(event) => setUsername(event.target.value)} />
              </label>
              <label className="auth-field" htmlFor="email">
                <span>Email address</span>
                <input autoComplete="email" required type="email" id="email" name="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <label className="auth-field" htmlFor="password">
                <span>Password</span>
                <input autoComplete="new-password" required minLength={8} type="password" id="password" name="password" placeholder="At least 8 characters" value={password} onChange={(event) => setPassword(event.target.value)} />
              </label>
              {error && <p className="auth-error" role="alert">{error}</p>}
              <button className="auth-submit" type="submit" disabled={submitting}>{submitting ? 'Creating account…' : 'Create account'} <span aria-hidden="true">→</span></button>
            </form>

            <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
            <p className="auth-privacy">Your information stays private and secure.</p>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Register
