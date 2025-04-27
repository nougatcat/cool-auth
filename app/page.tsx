import { LoginForm, Me } from "@/components/shared";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";


export default async function Home() {
  const session = await getUserSession()
  if (!session) {
    return <LoginForm />
  }
  const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } })

  if (!user) {
    return <LoginForm />
  }

  return <Me user={user} />
}
