import React from 'react'
import './NavBar.scss'
import { NavLink } from 'react-router-dom'

const setActive = ({ isActive }: { isActive: boolean }): string =>
  `navbar__item ${isActive ? 'navbar__item--active' : ''}`

export const NavBar: React.FC = () => {
  return (
    <nav className="navbar page__section">
      <ul className="navbar__items">
        <NavLink to="/login" className={setActive}>
          Login
        </NavLink>

        <NavLink
          to="/register"
          className={setActive}
        >
          Register
        </NavLink>
      </ul>
    </nav>
  )
}
