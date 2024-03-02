import { redirect } from 'next/navigation'

type AuthErrorPageProps = {
  _: never
  searchParams: { error: string }
}

const betaUserErrors = ['CallbackRouteError', 'AuthorizedCallbackError']

const AuthErrorPage = ({ _, searchParams: { error } }: AuthErrorPageProps) => {
  if (betaUserErrors.includes(error)) redirect('/become-beta-user')

  return <div className='grow'>an error happend while logging in!</div>
}

export default AuthErrorPage
