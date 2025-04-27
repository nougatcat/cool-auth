// server actions
'use server'
import { getUserSession } from "@/lib/get-user-session"
import { prisma } from "@/prisma/prisma-client"
import { Prisma } from "@prisma/client"
import { hashSync } from "bcrypt"

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession()

        if (!currentUser) {
            throw new Error('Пользователь не найден')
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        })

        await prisma.user.update({
            where: {
                id: Number(currentUser.id)
            },
            data: {
                email: body.email,
                name: body.name,
                password: hashSync(body.password as string,10)
            }
        })
    } catch (err) {
        console.log('Error [UPDATE_USER]', err)
        throw err;
    }
}