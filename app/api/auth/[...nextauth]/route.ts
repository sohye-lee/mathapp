import NextAuth from 'next-auth/next';
import { authOptions } from './options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// import CredentialProvider from 'next-auth/providers/credentials';
// import NextAuth, { NextAuthOptions } from 'next-auth';
// import axios from 'axios';
// import { JWT, Session, User } from '@/types/types';
// import env from '@/env';
// import { AdapterUser } from 'next-auth/adapters';
// import bcrypt from 'bcrypt';
// import db from '@/prisma/db';

// type LoginResponse = {
//   token: string;
//   user: {
//     id: string;
//     username: string;
//     token: string;
//     firstname?: string;
//     lastname?: string;
//     level?: number;
//     avatar?: string;
//   };
// };

// export const authOptions = {
//   session: {
//     strategy: 'jwt' as const,
//     maxAge: 30 * 24 * 60 * 60,
//   },
//   providers: [
//     CredentialProvider({
//       name: 'Credentials',
//       type: 'credentials',
//       credentials: {
//         username: { label: 'Username', type: 'text', placeholder: 'username' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize({ auth, request: {nextUrl }}) {
//         const isLoggedIn = !! auth
//         const hashedPassword = await bcrypt.hash(credentials.password, 10);

//         const user = await db.user.upsert({
//           where: {
//             username: credentials.username,
//           },
//           update: {
//             username: credentials.username,
//             password: hashedPassword,
//           },
//           create: {
//             username: credentials.username,
//             password: hashedPassword,
//           },
//         });

//         if (user) {
//           return { user };
//         } else {
//           throw new Error('Invalid user. Login failed.');
//         }

//         // const res = await fetch(`${env.NEXTAUTH_URL}/api/auth/signin`, {
//         //   method: 'POST',
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //   },
//         //   body: JSON.stringify({username: credentials.username, password: hashedPassword}),
//         // });

//         // const data = await res.json();
//         // console.log('data:', data);
//         // if (data) {
//         //   const { id, username, firstname, lastname, level, avatar } =
//         //     data.user;
//         //   const user = {
//         //     id,
//         //     username,
//         //     firstname,
//         //     lastname,
//         //     level,
//         //     avatar,
//         //     token: data.token,
//         //   };
//         //   return user;
//         // } else throw new Error('Invalid user. Login failed.');

//         // return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     session({ session, token, user }) {
//       session.user = token.user;
//       return session;
//     },
//   },
//   secret: env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/login',
//   },
// } satisfies NextAuthOptions;

// export const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
