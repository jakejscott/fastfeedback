import { sign } from "crypto";
import Head from "next/head";
import { useAuth } from "../lib/auth";
import styles from "../styles/Home.module.css";

function AuthExample() {
  const { signout, signinWithGitHub, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div>
        <a onClick={() => signout()}>Sign out</a>
        <div>{user.email}</div>
      </div>
    );
  }

  return (
    <div>
      <a onClick={() => signinWithGitHub()}>Sign in</a>
    </div>
  );
}

export default function Home() {
  const { signinWithGitHub, loading, user } = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Fastfeedback</h1>
        <AuthExample />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
