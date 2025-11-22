import { prisma } from "@/prisma/prisma-client"
import { getUserSession } from "@/lib/get-user-session"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic' //! есть баг с асинхронным контекстом на уровне next-js, поэтому билд может не работать в этом месте

export async function GET() {
    try {
        const user = await getUserSession() 
        
        if (!user) {
            return NextResponse.json({ message: 'Вы не авторизованы'}, { status: 401 })
        }

        const data = await prisma.user.findUnique({
            where: {
                id: Number(user.id)
            },
            select: { //вытаскиваем эти поля из ответа (первые три, а последние - нет)
                name: true,
                role: true,
                id: true,
                email: false,
                password: false,
            }
        })

        return NextResponse.json(data)
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: '[USER_GET] Server error'}, {status: 500})
    }
}