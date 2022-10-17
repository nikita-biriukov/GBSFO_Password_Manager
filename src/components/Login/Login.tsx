import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { getUser } from '../../api/users';
import { User } from '../../types/User';
import { Error } from '../Error/Error';
import './Login.scss';

interface Props {
  setUser: Dispatch<SetStateAction<User | null>>
}

export const Login: React.FC<Props> = ({ setUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = useMemo((): boolean => {
    return (!login.trim() || !password.trim());
  }, [login, password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    try {
      const user = await getUser(login, password);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setLoading(false);
      } else {
        setError('The username or password is incorrect');
        setLoading(false);
      }
    } catch (error) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <>
      <div className='login page__section'>
        <form className='login__form' onSubmit={handleSubmit}>
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
            {loading ? 'Loading...' : 'Sign in'}
          </button>
        </form>
      </div>

      {error && (
        <div className='login__error error'>
          <Error errorText={error} setError={setError} />
        </div>
      )}
    </>
  );
};
