'use client'
import { Container, RegistrationForm } from "@/components/shared";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";



export default function Register() {
  const {data: session} = useSession();
  if (session) {
      return redirect('/')
  }
  return (
    <Container >
      <RegistrationForm />
    </Container>
  );
}
