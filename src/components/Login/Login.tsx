import React, { useMemo, useState } from 'react'
import { Error } from '../Error/Error'
import './Login.scss'

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const canSubmit = useMemo((): boolean => {
    return (!login.trim() || !password.trim())
  }, [login, password])

  return (
    <>
      <div className='login page__section'>
        <form className='login__form' onSubmit={e => e.preventDefault()}>
          <input
            id='login'
            type='text'
            className='login__input'
            placeholder='Enter your login'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <input
            id='password'
            type={`${showPassword ? 'text' : 'password'}`}
            className='login__input'
            placeholder='Enter your password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label htmlFor='checkbox' className='login__label'>
            <input
              id='checkbox'
              type='checkbox'
              className='login__check'
              onClick={() => setShowPassword(prev => !prev)}
            />
            Show password
          </label>
          <button
            type='submit'
            className='login__button'
            disabled={canSubmit}
          >
            Sign in
          </button>
        </form>
      </div>

      {error && (
        <div className='login__error error'>
          <Error errorText={error} setError={setError}/>
        </div>
      )}
    </>
  )
}
