
import { AuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hashSync } from 'bcrypt';
import { UserRole } from '@prisma/client';
import { prisma } from "@/prisma/prisma-client";

export const authOptions: AuthOptions = {
    providers: [
        // буду делать только классический провайдер - без гугла и гитхаба
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    // callbacks: { //проверка jwt токена
    //     async signIn({user, account}) {
    //     },
    //     async jwt({ token }) { //находим есть ли в бд такой емаил
    //     },
    //     session({session, token}) {
    //     }
    // }
}