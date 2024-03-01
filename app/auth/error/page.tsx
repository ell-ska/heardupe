type AuthErrorPageProps = {
  _: never
  searchParams: { error: string }
}

const AuthErrorPage = ({ _, searchParams }: AuthErrorPageProps) => {
  // TODO 64: redirect to beta user sign up page
  if (searchParams.error === 'CallbackRouteError') console.log('beta user')
  return <div className='grow'>an error happend while logging in!</div>
}

export default AuthErrorPage
