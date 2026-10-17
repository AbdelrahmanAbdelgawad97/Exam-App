
import LoginForm from '../../component/login/form/loginForm';
import Heading from '../../shared/component/heading';

export default function LoginPage() {
  return (
    <div className='w-full max-w-113 flex flex-col '>
      <Heading > Login </Heading >
      <LoginForm />
    </div>
  )
}