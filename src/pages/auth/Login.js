export function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function passwordChangeHandler(event){
        setPassword(event.target.value)
    }

    function emailChangeHandler(event){
        setEmail(event.target.value)
    }

    function onSubmit(event){
        event.preventDefault();
         
        const body = {
            email,
            password
        };


        fetch(`http://localhost:3001/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(body)
        })
        .then ((response) => response.json)
        .then ((response) => {
            console.log(response.accessToken)
        })
    }


    return (
        <form onSubmit={}>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" onChange={emailChangeHandler}></input>
            </div>


            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={passwordChangeHandler}></input>
            </div>

            <button type="submit">
                Login
            </button>
        </form>
    )
}