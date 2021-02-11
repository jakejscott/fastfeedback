import Head from "next/head";
import { Button, Flex } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import { LogoIcon } from "@/components/icons";

function Home() {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      flexDir="column"
      align="center"
      justify="center"
      h="100vh"
      w="full"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <LogoIcon color="black" height="64px" width="64px" />

      {auth.user ? (
        <Button as="a" href="/dashboard">
          View Dashbaord
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={() => auth.signinWithGitHub()}>
          Sign in
        </Button>
      )}
    </Flex>
  );
}

export default Home;
