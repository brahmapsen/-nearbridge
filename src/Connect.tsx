import { WalletConnection } from 'near-api-js';
import { requestSignIn } from '@textile/near-storage';

interface Props {
    wallet: WalletConnection
}

function Form( { wallet }: Props) {
    const onSignIn = () => requestSignIn(wallet, {});
    const onSignOut = () => {
        wallet.signOut();
        window.location.reload();
    }
    return (
        <div>
            {
                wallet.isSignedIn() ?
                <button onClick={onSignOut}>Sign-out</button>:
                <button onClick={onSignIn}>Sign-in</button>
            }
        </div>
    )
}

export default Form;
