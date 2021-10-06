import { useState, ChangeEvent } from "react";
import { API, Status, Request } from '@textile/near-storage';

interface Props {
    api: API
}

function Form( {api}: Props) {

    const [file, setFile] = useState<File>();
    const [uploads, setUploads] = useState<Record<string, Request>>();
    const onChange = ( {target}: ChangeEvent<HTMLInputElement>) => {
        if(target.files) setFile(target.files[0]);
    }

    const onUpload = () => {
        if(file){
            api.store(file)
                .then( (res) => {
                    setUploads({...uploads, [res.id]: res})
                    alert(`IPFS CID: \n${res.cid["/"]}`)
                })
            .catch((err: Error) => {
                    alert(err.message);
            });

        }
        setFile(undefined);
    }

    const onStatus = (id: string) => {
        api.status(id)
            .then( ({request}) => {
                alert(`Status:\n${Status[request.status_code]}`)
            })
            .catch((err: Error) => {
                alert(err.message);
        });
    }

    return (
        <div>
            {Object.entries(uploads).map(([id, { cid }])=> {
                return (
                    <span>
                        {cid["/"]}
                        <button id={id} onClick={()=> onStatus(id)}>Status</button>
                    </span>
                )
              })
            }
            <div>
                <input type="file" name="file" onChange={onChange} />
                <button onClick={onUpload}>Upload</button>
            </div>
        </div>
    );

}

export default Form;
