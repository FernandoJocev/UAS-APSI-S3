import { jwtDecode, JwtPayload } from 'jwt-decode'
import token from './Token'

export const checkToken = () => {
  if (token != null) {
    const decoded = jwtDecode(token) as JwtPayload
    const date = new Date()

    if (decoded.exp! * 1000 < date.getTime()) {
      return 'expired'
    } else {
      return 'next'
    }
  } else {
    return null
  }
}
