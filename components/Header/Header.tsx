import NavLink from './NavLink'

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

const Header = () => {
  return (
    <header className='main absolute inset-x-0 m-auto py-8'>
      <nav className='flex gap-12'>
        {menuItems.map(item => (
          <NavLink key={item.name} {...item} />
        ))}
      </nav>
    </header>
  )
}

export default Header
