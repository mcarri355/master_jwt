import React from 'react';
import { getSession, login, logout } from '../lib';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const profile = async () => {
  var session = await getSession();
  return (
    <div>
      <nav className='header'>
        <h1 className='logo'>
          <a href='/home'>
            <Image
              alt=''
              height='100'
              width='125'
              src='https://pngimg.com/uploads/dog/dog_PNG50375.png'></Image>
          </a>
        </h1>
        <ul className='main-nav'>
          <li>
            <h1>
              <Link href='/home'>Home</Link>
            </h1>
          </li>
          <li>
            <h1>
              <Link href='/profile'>Profile</Link>
            </h1>
          </li>
          <li
            onClick={async (formdata) => {
              'use server';
              await logout();
              redirect('/');
            }}>
            <h1>
              <Link href='/'>Logout</Link>
            </h1>
          </li>
        </ul>
      </nav>

      <div className='body-style'>
        <div className='c container'>
          <h1>Welcome, {session.user.name}</h1>
          <br></br>
          <h1>Email:</h1>
          <h2>{session.user.email}</h2>
          <br></br>
          <h1>Password:</h1>
          <h2>{session.user.password}</h2>
        </div>
      </div>
    </div>
  );
};

export default profile;
