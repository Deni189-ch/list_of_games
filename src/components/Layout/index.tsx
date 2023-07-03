import { Outlet } from 'react-router-dom';
import './styles.modules.scss'

const Layout = () => {
  return (
    <div className="loyaut-wrapper">
      <header className="header">
        The best games
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">&copy; Test task 2023</footer>
    </div>
  )
}

export {Layout}
