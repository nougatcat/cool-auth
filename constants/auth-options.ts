
import { AuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hashSync } from 'bcrypt';
import { UserRole } from '@prisma/client';
import { prisma } from "@/prisma/prisma-client";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" }, // какое поле передается : {валидация}. Но в этом проекте используется валидация через zod, поэтому валидация здесь необязательна
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) { //проверка данных входа по бд
                if (!credentials) {
                    return null
                }
                const values = {
                    email: credentials.email,
                }
                const findUser = await prisma.user.findFirst({
                    where: values
                })
                if (!findUser) {
                    return null
                }
                const isPasswordValid = await compare(credentials.password, findUser.password) // сравнить хэш пароля введенного с тем что в бд
                if (!isPasswordValid) {
                    return null
                }
                if (!findUser.verified) { // пароль верен, но акк не активирован
                    return null
                }
                return {
                    id: findUser.id,
                    email: findUser.email,
                    name: findUser.name,
                    role: findUser.role
                } // инфа нужна в.т.ч. для дэшборда (админ панели), но самого дэшборда пока нет
                // TODO: сделать дашбоард
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    // что нужно делать при регистрации, авторизации, взаимодействии с jwt
    callbacks: {
        
        // какую информацию надо записать в jwt токен при его создании или обновлении
        async jwt({ token }) {
            if (!token.email) return token
            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email,
                }
            })
            if (findUser) { //если есть, то вшиваем в токен инфу пользователя
                token.id = String(findUser.id)
                token.role = findUser.role
                token.name = findUser.name
                token.email = findUser.email
            }
            return token
        },
        // какую информацию надо хранить в сессии
        session({session, token}) {
            if (session?.user) {
                session.user.id = token.id
                session.user.role = token.role
            }
            return session
        },
    }
}