import { useState, useCallback } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useApollo } from '../lib/apolloClient';
import { SIGNUP, SIGNIN } from '../gql/user';

const CARD_BODY_STYLE = {
    width: '500px',
    margin: '100px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
}

const FORM_STYLE = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '300px',
}

const BUTTON_STYLE = {
    textTransform: 'none',
};

function SigninModal({isVisible, onClose}) {
    const apolloClient = useApollo();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmit = useCallback( async () => {
        const { loading, error, data } = await apolloClient.mutate({
            mutation: SIGNUP,
            variables: {
                email,
                password,
                name,
            }
        });
        console.log(data);
    }, [email, password, name]);

    return (
        <Modal
            open={isVisible}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <div className="card-body" style={CARD_BODY_STYLE}>
                <form noValidate autoComplete="off" style={FORM_STYLE}>
                    <TextField
                        id="user-email"
                        label="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                    <TextField
                        id="user-password"
                        label="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                    <TextField
                        id="name"
                        label="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)} />
                    <Button
                        disableRipple
                        variant="contained"
                        color="primary"
                        data-name="signup"
                        style={BUTTON_STYLE}
                        onClick={onSubmit}>
                        SignUp
                    </Button>
                </form>
            </div>
        </Modal>
    );
}

export default SigninModal;
