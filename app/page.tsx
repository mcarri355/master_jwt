import { redirect } from 'next/navigation';
import { login } from './lib';
import Link from 'next/link';
export default function Login() {
  return (
    <div className='body-style'>
      <div className='container'>
        <form
          className='form'
          action={async (formdata) => {
            'use server';
            if (await login(formdata)) {
              redirect('/home');
            }
          }}>
          <h1 className='form__title'>Login Page</h1>
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

        <h1 className='center'>email@email.com and 12345</h1>
        <h1>
        Don't have an account? <Link href='/sign' className='underline'>Sign in</Link>
            </h1>
      </div>
    </div>
  );
}
