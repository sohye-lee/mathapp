import NextAuth, { User, type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       token: string;
//       id: string;
//       username: string;
//       firstname?: string;
//       lastname?: string;
//       level?: number;
//       avatar?: string;
//     } & DefaultSession['user'];
//   }
//   interface User {
//     token: string;
//     id: string;
//     username: string;
//     firstname?: string;
//     lastname?: string;
//     level?: number;
//     avatar?: string;
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     user: {
//       token: string;
//       id: string;
//       username: string;
//       firstname?: string;
//       lastname?: string;
//       level?: number;
//       avatar?: string;
//     };
//   }
// }
