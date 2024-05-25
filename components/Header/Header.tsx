import { NavLink } from './NavLink'

const menuItems = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/playlists',
    name: 'Playlists',
  },
  {
    path: '/search',
    name: 'Search',
  },
  {
    path: '/profile',
    name: 'Profile',
  },
]

export const Header = () => {
  return (
    <header className='main px-6 py-8'>
      <nav className='flex w-full justify-between gap-6 px-4 sm:justify-start sm:gap-12'>
        {menuItems.map(item => (
          <NavLink key={item.name} {...item} />
        ))}
      </nav>
    </header>
  )
}
