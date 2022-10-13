import './Register.scss'
import React, { useMemo, useState } from 'react'
import { Error } from '../Error/Error'
import { addUser, isLoginFree } from '../../api/users'
import { useNavigate } from 'react-router'

export const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const canSubmit = useMemo((): boolean => {
    return !login.trim() || !password.trim()
  }, [login, password])

  const createAccount = async (): Promise<void> => {
    return await addUser(login, password)
      .then(() => navigate('/dasboard'))
      .catch(() => setError('Something went wrong'))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)

    try {
      const canRegister = await isLoginFree(login)

      if (canRegister) {
        await createAccount()
      } else {
        setError('Login has already been taken')
      }
    } catch (error) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="register page__section">
        <form className="register__form" onSubmit={handleSubmit}>
          <input
            id="login"
            type="text"
            className="register__input"
            placeholder="Choose your login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <input
            id="password"
            type={`${showPassword ? 'text' : 'password'}`}
            className="register__input"
            placeholder="Choose your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="checkbox" className="register__label">
            <input
              id="checkbox"
              type="checkbox"
              className="register__check"
              onClick={() => setShowPassword((prev) => !prev)}
            />
            Show password
          </label>
          <button
            type="submit"
            className="register__button"
            disabled={canSubmit}
          >
           { loading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>

      {error && (
        <div className="register__error error">
          <Error errorText={error} setError={setError} />
        </div>
      )}
    </>
  )
}
