import { NextRequest } from 'next/server'
import  { updateSession } from './app/lib'
 
export async function middleware(request: NextRequest) {
//  console.log('middleware')
 return await updateSession(request);
}

// Function runs every req verified with console.log
// allows for continous sessiongs
// used for auth and more