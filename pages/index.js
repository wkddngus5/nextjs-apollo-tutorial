import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
    (
        async () => {
            const response = await fetch('http://localhost:3000/api/graphql', {
                method: 'POST',
                headers: {
                    'Content-type': 'applocation/json',
                },
                body: JSON.stringify({ query: '{ users { name } }' }),
            });
            const json = await response.json();
            console.log( json );
        }
    )();

    return (
        <div className="container">
            <Head>
                <title>Next App With Apollo</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">
                    Next App With <span>Apollo</span>
                </h1>

                <Link href="/users">
                    <p className="description">
                        Show all users
                    </p>
                </Link>
            </main>

            <style jsx>{`
                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .title span {
                    color: #0070f3;
                    text-decoration: none;
                }

                .title span:hover,
                .title span:focus,
                .title span:active {
                    text-decoration: underline;
                }

                .title {
                    margin: 0;
                    line-height: 1.15;
                    font-size: 4rem;
                }

                .title,
                .description {
                    text-align: center;
                }

                .description {
                    line-height: 1.5;
                    font-size: 1.5rem;
                }

                .description:hover {
                    cursor: pointer;
                }

                @media (max-width: 600px) {
                    .grid {
                        width: 100%;
                        flex-direction: column;
                    }
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
}
