import { Container, LoginForm, Me } from "@/components/shared";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";



export default async function Home() {
  const session = await getUserSession()
  if (!session) {
    return (
      <Container>
        <LoginForm />
      </Container>
    )
  }
  const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } })

  if (!user) {
    return (
      <Container>
        <LoginForm />
      </Container>
    )
  }

  return (
    <Container>
      <Me />
    </Container>
  )
}
