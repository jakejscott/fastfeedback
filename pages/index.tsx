import Head from "next/head";
import { Button, Heading, Text, Code } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";

function AuthExample() {
  const { signout, signinWithGitHub, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Text>
        Current user: <Code>{user ? user.email : "none"}</Code>
      </Text>
      {user && <Button onClick={() => signout()}>Sign out</Button>}
      {!user && <Button onClick={() => signinWithGitHub()}>Sign in</Button>}
    </div>
  );
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <main>
        <Heading>Fast Feedback</Heading>
        <AuthExample />
      </main>
    </div>
  );
}
