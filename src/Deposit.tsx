import { API } from '@textile/near-storage';

interface Props {
    api: API
}

function Form( { api }: Props) {
    const onDeposit = () => {
        api.addDeposit()
           .catch((err: Error) => alert(err.message));
    }
    const onRelease = () => {
        api.releaseDeposits()
        .then( () => api.hasDeposit()  
            .then((ok)=> alert(`${ok ? "": "no"} deposit remaining`))
         )
        .catch((err: Error) => alert(err.message))
    }

    return (
        <div>
            <button onClick={onDeposit}>Deposit</button>
            <button onClick={onRelease}>Release</button>
        </div>
    )
}

export default Form;
