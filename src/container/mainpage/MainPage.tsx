import React, {useState} from "react";


class Client {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
}

export default function MainPage() {
    const [clients, setClients] = useState([]);

    const [form, setForm] = useState({
        name: '',
        email: '',
    });


    const showTable = async () => {
        const response = await fetch('/clients');
        const body = await response.json();
        console.log(body);
        setClients(body);
    }

    const remove = async (id: number | undefined) => {
        if (typeof id == undefined) return;
        const checkId = (clients as Client[]).some(c => c.id == id);
        if (!checkId) return;
        await fetch(`/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...(clients as Client[])].filter(i => i.id !== id);
            setClients(updatedClients as never[]);
        });

    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(JSON.stringify(form));

        await fetch('/clients', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form),
        });
        await showTable();
    }

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={showTable}>Show clients list</button>
                <form onSubmit={handleSubmit}>
                    <input type={"text"} placeholder={"Enter name"} name={"name"} onChange={handleChange} required={true}/>
                    <br/>
                    <input type={"text"} placeholder={"Enter email"} name={"email"} onChange={handleChange} required={true}/>
                    <br/>
                    <button type={"submit"}>ADD</button>
                </form>
                <div className="App-intro">
                    <h2>Clients</h2>
                    {(clients as Client[]).map(client =>
                        <div key={client.id}>
                            {client.id} {client.name} ({client.email}) <button onClick={() => remove(client.id)}>remove</button>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
}