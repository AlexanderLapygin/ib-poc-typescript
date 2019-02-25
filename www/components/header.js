import Link from 'next/link'
import { logout } from '../utils/auth'

const Header = props => (
  <header>
    <nav>
      <ul>
        <li>
          <Link href='/'>
            <a>ИНФО-БАНК</a>
          </Link>
        </li>
        <li>
          <Link href='/login'>
            <a>Вход</a>
          </Link>
        </li>
        <li>
          <Link href='/contract'>
            <a>Договор</a>
          </Link>
        </li>
        <li>
          <Link href='/login'>
            {/* <a>Выход</a> */}
            <a onClick={() => {
                console.log('logout has clicked')
                logout();
              }
            }>Выход</a>            
          </Link>
        </li>
      </ul>
    </nav>
    <style jsx>{`
      ul {
        display: flex;
        list-style: none;
        margin-left: 0;
        padding-left: 0;
      }

      li {
        margin-right: 1rem;
      }

      li:first-child {
        margin-left: auto;
      }

      a {
        color: #fff;
        text-decoration: none;
      }

      header {
        padding: 0.2rem;
        color: #fff;
        background-color: #333;
      }
    `}</style>
  </header>
)

export default Header
