// server actions
'use server'
import { VerificationUserTemplate } from "@/components/shared/email-template/verification-user"
import { getUserSession } from "@/lib/get-user-session"
import { sendEmail } from "@/lib/send-email"
import { prisma } from "@/prisma/prisma-client"
import { Prisma } from "@prisma/client"
import { hashSync } from "bcrypt"
import { ReactNode } from "react"

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession()

        if (!currentUser) {
            throw new Error('Пользователь не найден')
        }

        await prisma.user.update({
            where: {
                id: Number(currentUser.id)
            },
            data: {
                email: body.email,
                name: body.name,
                password: hashSync(body.password as string, 10)
            }
        })
    } catch (err) {
        console.error('Error [UPDATE_USER]', err)
        throw err;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            }
        })

        if (user) {
            throw new Error('Пользователь с такой почтой уже существует');
        }

        const createdUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashSync(body.password, 10)
            }
        })

        // генерим код подтверждения почты
        const code = Math.floor(10000 + Math.random() * 90000).toString()

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id
            }
        })

        await sendEmail(createdUser.email,
            'Cool Auth / 📝 Подтверждение регистрации', VerificationUserTemplate({
                code
            }) as ReactNode)
    } catch (err) {
        console.log('Error [REGISTER_USER]', err)
        throw err //! если этого не сделать, то вызов этого экшена не увидит ошибку
    }
}