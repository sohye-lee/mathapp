import CredentialProvider from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';
import db from '@/prisma/db';
import env from '@/env';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        const { username, password } = credentials;
        try {
          const user = await db.user.findUnique({ where: { username } });
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) return null;
          console.log('user:', user);
          return user;
        } catch (error) {
          console.log('Error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      console.log('token', token);
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user;
      return session;
    },
  },
};
