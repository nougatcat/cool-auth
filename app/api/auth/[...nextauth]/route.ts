import { authOptions } from "@/constants/auth-options"
import NextAuth from "next-auth"

//** Стандартный Route Handler NextAuth для работы с библиотекой */
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }