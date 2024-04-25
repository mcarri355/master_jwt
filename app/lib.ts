import {SignJWT, jwtVerify} from 'jose';
import {cookies} from 'next/headers';
import {NextRequest, NextResponse} from 'next/server';

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey); //encodes the secretKey

// encrypt data
export async function encrypt(payload:any){
    return await new SignJWT(payload)
    .setProtectedHeader({alg:'HS256'})
    .setIssuedAt() // today's date
    .setExpirationTime('2 minutes')
    .sign(key)
}

// decrypt data
export async function decrypt(input:string): Promise<any>{
    const {payload} = await jwtVerify(input, key, {algorithms: ['HS256']});
    return payload;
}
export async function register(formData: FormData){
    console.log('run')
    await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        body: JSON.stringify({email:formData.get('email'), password:formData.get('password')}),
        headers:{'Content-Type': 'application/json'}
    })
    return true
}
export async function login(formData: FormData){
    let success = false;
    let users = await fetch('http://localhost:5000/users').then(response=>{
        return response.json();
    })
    users.data.map(async (user:any) => {
        if(formData.get('email') === user.email && formData.get('password') === user.password){
            success = true;
        }
    })
    console.log(users);
    // verify credentials and get the user
    // console.log(process.env.SECRET_EMAIL)
    if(success){
        const user = {email:formData.get('email'), password:formData.get('password')}
        
        // create the session
        const expires = new Date(Date.now() + 2 * 60 * 1000);
        const session = await encrypt({user, expires});

        // save the session in a cookie
        cookies().set('session', session, {expires, httpOnly:true});
        return true;
    }else{
        return false;
    }

}

export async function logout(){
    // destroy the session
    cookies().set('session', '', {expires: new Date(0)});
}

export async function getSession(){
    const session = cookies().get('session')?.value;
    if(!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest){
    const session = request.cookies.get('session')?.value;
    if(!session) return;

    // refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 2 * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}