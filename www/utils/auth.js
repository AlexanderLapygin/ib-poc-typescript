import Router from 'next/router';
import service from "../utils/service"

export const login = async (loginResponseJson) => {
  Router.push('/contract')
}

export const logout = async () => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

  const apiUrl = process.browser
    ? `${protocol}://${window.location.host}/api/logout`
    : `${protocol}://${ctx.req.headers.host}/api/logout`

  return service({url: apiUrl});
}
