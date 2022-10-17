import './Dashboard.scss';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../types/User';
import { getPasswords, createPassword, deletePassword, updatePassword } from '../../api/passwords';
import { PasswordData } from '../../types/PasswordData';

interface Props {
  user: User | null
  setUser: (value: User | null) => void
}

export const Dashboard: React.FC<Props> = ({ user, setUser }) => {
  const [items, setItems] = useState<PasswordData[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [webpage, setWebPage] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  console.log(items);

  useEffect(() => {
    if (user) {
      void getPasswords(user.id)
        .then(setItems);
    }

    console.log(items);
  }, []);

  const canAdd = useMemo(() => {
    return !login.trim() || !password.trim() || !webpage.trim();
  }, [login, password, webpage]);

  const addNewPassword = async (
    event: FormEvent,
    newWebsite: string,
    newLogin: string,
    newPassword: string
  ): Promise<void> => {
    event.preventDefault();

    if (!user) {
      return;
    }

    const newItem = await createPassword({
      userId: user.id,
      webpage: newWebsite,
      login: newLogin,
      password: newPassword
    });

    setItems((prev: PasswordData[]) => [...prev, newItem]);
  };

  const handleAdding = async (e: FormEvent): Promise<void> => {
    void addNewPassword(e, webpage, login, password)
      .then(() => {
        setWebPage('');
        setLogin('');
        setPassword('');
      });
  };

  const handleDeletePassword = (itemId: number): void => {
    void deletePassword(itemId)
      .then(() => {
        setItems((prev: PasswordData[]) => prev.filter(item => item.id !== itemId));
      });
  };

  const handleUpdatePassword = (
    itemId: number,
    newPassword: string
  ): void => {
    if (!newPassword.trim().length) {
      handleDeletePassword(itemId);
    } else {
      void updatePassword(itemId, {
        password: newPassword
      })
        .then(() => setItems((prev) => prev.map(prevPassword => {
          if (prevPassword.id === itemId) {
            return {
              ...prevPassword,
              password: newPassword
            };
          }

          return prevPassword;
        })));
    }
  };

  return (
    <div className='dashboard'>
      <NavLink
        to="/login"
        className='dashboard__logout'
        onClick={() => {
          localStorage.clear();
          setUser(null);
        }}>
        Log out
      </NavLink>

      <section className='dashboard__section'>
        <form onSubmit={handleAdding}>
          <input
            type="text"
            className="dashboard__input"
            placeholder="Add new webpage"
            value={webpage}
            onChange={e => setWebPage(e.target.value)}
          />
          <input
            type="text"
            className="dashboard__input"
            placeholder="Add new login"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <label className="dashboard__label">
            <input
              type={`${showPassword ? 'text' : 'password'}`}
              className="dashboard__input dashboard__input--eye"
              placeholder="Add new password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              className='dashboard__button-eye'
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(prev => !prev);
              }}>
              <img
                src='https://cdn-icons-png.flaticon.com/512/1693/1693945.png'
                alt="Eye"
                className='dashboard__eye'
              />
            </button>
          </label>
          <button className='dashboard__add-button' disabled={canAdd}>Add</button>
        </form>
      </section>
    </div >
  );
};
