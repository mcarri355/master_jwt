import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { logout } from '../lib';

const Home = () => {
  return (
    <div>
      <nav className='header'>
        <h1 className='logo'>
          <a href='/home'>
            <Image
              alt=''
              height='100'
              width='125'
              src='https://static.wikia.nocookie.net/hero-havoc/images/0/0f/Coolguy.png/revision/latest?cb=20200604090834'></Image>
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
      <h1 className='center'>HERE IS THE HOME PAGE</h1>
    </div>
  );
};

export default Home;
