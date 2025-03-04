import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Take-Home Assignment (MHA)</title>
        <meta name="description" content="Take-Home Assignment (MHA)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <div>
            <h1>Take-Home Assignment (MHA)</h1>
          </div>
          <h3>User Guide</h3>
          <div className={styles.userGuideContainer}>
            <div className={styles.methodContainer}>
              <p
                className={styles.method}
                style={{
                  backgroundColor: "rgb(28, 48, 180)",
                }}
              >
                GET
              </p>
              <p style={{ fontWeight: "bold" }}>/api/users</p>
              <p>Retrieve all users</p>
            </div>
            <div className={styles.userGuide}>
              <div
                className={styles.methodContainer}
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <p
                  className={styles.method}
                  style={{
                    backgroundColor: "rgb(15, 131, 36)",
                  }}
                >
                  POST
                </p>
                <p style={{ fontWeight: "bold" }}>/api/users</p>
                <p>Create a new user</p>
              </div>
              <div
                style={{
                  padding: "10px 20px",
                }}
              >
                <pre>
                  <code>
                    {`curl -X POST "https://backend-assignment-mha.vercel.app/api/users" \\
      -H "Content-Type: application/json" \\
      -H "Accept: application/json" \\
      -d '{
           "id": 6,
           "name": "Test test",
           "email": "test.test@example.com",
           "dialingCode": "+61",
           "phoneNumber": "400-123-456",
           "linkedInUrl": "https://www.linkedin.com/in/testtest"
          }'`}
                  </code>
                </pre>
              </div>
            </div>

            <div className={styles.methodContainer}>
              <p
                className={styles.method}
                style={{
                  backgroundColor: "rgb(28, 48, 180)",
                }}
              >
                GET
              </p>{" "}
              <p style={{ fontWeight: "bold" }}>/api/users/:id</p>
              <p>Retrieve a user by id</p>
            </div>
            <div className={styles.userGuide}>
              <div
                className={styles.methodContainer}
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <p
                  className={styles.method}
                  style={{
                    backgroundColor: "rgb(220, 38, 38)",
                  }}
                >
                  DELETE
                </p>{" "}
                <p style={{ fontWeight: "bold" }}>/api/users/:id</p>
                <p>Delete a user by id</p>
              </div>
              <div
                style={{
                  padding: "10px 20px",
                }}
              >
                <pre>
                  <code>
                    {`curl -X DELETE "https://backend-assignment-mha.vercel.app/api/users/1" \\
      -H "Accept: application/json"`}
                  </code>
                </pre>
              </div>
            </div>
            <div className={styles.methodContainer}>
              <p
                className={styles.method}
                style={{
                  backgroundColor: "rgb(28, 48, 180)",
                }}
              >
                GET
              </p>
              <p style={{ fontWeight: "bold" }}>/api/logs</p>
              <p>Retrieve all API logs</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
