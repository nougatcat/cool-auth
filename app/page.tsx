import { Container } from "@/components/shared";



export default function Home() {
  return (
    <Container className="text-6xl">
      <a href="/login">login</a>
      <br />
      <a href="/register">register</a>
      <br />
      <a href="/verification">verification</a>
      <br />
      <a href="/me">me</a>
    </Container>
  );
}
