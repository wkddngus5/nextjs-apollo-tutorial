import Head from 'next/head';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import SigninModal from '../components/SigninModal';
import { useState, useCallback } from 'react';

const ROW_STYLE = {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '20px 10px',
    width: '220px',
};

const BUTTON_STYLE = {
    textTransform: 'none',
};

export default function Home() {
    const [visibleModalName, setVisibleModalName] = useState(false);

    const showModal = useCallback( ( event ) => {
        const newVisibleModalname = event.target.closest('button').dataset.name;
        if ( !newVisibleModalname ) {
            return;
        }
        setVisibleModalName(newVisibleModalname);
    }, []);

    const closeModal = useCallback( () => {
        setVisibleModalName();
    }, []);

    return (
        <div className="container">
            <SigninModal
                isVisible={visibleModalName === 'signup'}
                onCLose={closeModal} />
            <Head>
                <title>Next App With Apollo</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">
                    Next App With <span>Apollo</span>
                </h1>

                <div className="row" style={ROW_STYLE}>
                    <Button
                        disableRipple
                        variant="contained"
                        color="primary"
                        data-name="signup"
                        style={BUTTON_STYLE}
                        onClick={showModal}>
                        SignUp
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        data-name="signin"
                        style={BUTTON_STYLE}
                        onClick={showModal}>
                        SignIn
                    </Button>
                </div>

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
