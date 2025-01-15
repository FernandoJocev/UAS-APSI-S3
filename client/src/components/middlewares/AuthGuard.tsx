import { Outlet } from 'react-router'
import token from '../../utils/Token'
import { jwtDecode } from 'jwt-decode'
import { UserInterface } from '../../interfaces/oAuth'
import Components from '../../utils/Components'

const AuthGuard = () => {
  try {
    const user: UserInterface = jwtDecode(token!)

    return user.role === 'admin' ? <Outlet /> : <Components._404 />
  } catch {
    return <Components._404 />
  }
}

export default AuthGuard
