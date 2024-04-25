import { redirect } from 'next/navigation';
import Link from 'next/link';
import { register } from '../lib'
export default function SignIn() {
  return (
    <div className='body-style'>
      <div className='container'>
        <form
        // FUNCTION SHOULD BE PUSH TO MONGO AND THEN SEND TO '/'
          className='form'
          action={async (formdata) => {
            'use server';
            if (await register(formdata)) {
              redirect('/');
            }
          }}>
          <h1 className='form__title'>SignIn Page</h1>
          <div className='form__input-group'>
            <input
              className='form__input'
              type='email'
              name='email'
              id='email'
              placeholder='Email'
            />
            <div className='padding'></div>
            <input
              className='form__input'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
            />
            <div className='padding'></div>
            <input
              className='form__input'
              type='submit'
              name='submit'
              id='submit'
            />
          </div>
        </form>

        <h1 className='center'>mandre361@west-mec.org and 1234</h1>
        <h1>
        Have an account?  <Link href='/' className='underline'>Login in</Link>
            </h1>
      </div>
    </div>
  );
}
