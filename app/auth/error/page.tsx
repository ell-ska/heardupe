import { redirect } from 'next/navigation'

type AuthErrorPageProps = {
  _: never
  searchParams: { error: string }
}

const AuthErrorPage = ({ _, searchParams }: AuthErrorPageProps) => {
  if (searchParams.error === 'CallbackRouteError') redirect('/become-beta-user')

  return <div className='grow'>an error happend while logging in!</div>
}

export default AuthErrorPage
