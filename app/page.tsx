import { Congrats, Container, LoginForm, RegistrationForm, VerificationForm } from "@/components/shared";



export default function Home() {
  return (
    <Container >
      <LoginForm />
      <RegistrationForm />
      <VerificationForm whichCode="verification" />
      <Congrats />
    </Container>
  );
}
