import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

const Sidebar = () => {
  const history = useHistory()

  const [activeLink, setActiveLink] = useState(null)

  const links = [
    { href: '/', label: 'Информация' },
    { href: '/indicators', label: 'Показатели' },
    { href: '/results', label: 'Результаты' },
    { href: '/graphics', label: 'Графики' },
    { href: '/rating', label: 'Рейтинг' }
  ]

  const checkActiveLink = href => activeLink === href ? 'active' : ''

  history.listen(() => {
    const link = `/${history.location.pathname.split('/')[1]}`
    setActiveLink(link)
  })

  useEffect(() => {
    const link = `/${history.location.pathname.split('/')[1]}`
    setActiveLink(link)
  }, [history.location.pathname])

  return (
    <aside className="sidebar">
      <h2 className="sidebar__title title">Меню</h2>
      <nav className="sidebar__nav nav">
        <ul className="nav__list">
          {links.map(link => (
            <li key={link.href} className="nav__item">
              <Link to={link.href} className={`nav__link ${checkActiveLink(link.href)}`}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
