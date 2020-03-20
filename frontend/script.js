const registerForm = `<form class="registro p-3" onsubmit="register(event)">
                <input class="form-control my-2" type="text" required name="username" placeholder="Introduzca el username">
                <input class="form-control my-2" type="password" required name="password" placeholder="Introduzca el password">
                <input class="form-control my-2" type="email" required name="email" placeholder="Introduzca el email">
               <button type="submit" class="btn btn-primary">Registrarse</button>
                </form>`
const loginForm = `<form class="login p-3" onsubmit ="login(event)">
                        <input class="form-control my-2" type="text" required name="username" placeholder="Introduzca el username">
                        <input class="form-control my-2" type="password" required name="password" placeholder="Introduzca el password">
                    <button type="submit" class="btn btn-primary">Conectarse</button>
            </form>`
const mainContainer = document.querySelector('main');
const token = localStorage.getItem('authToken');
if(token){
    axios.get('http://localhost:3000/users/info',{
        headers:{
            'authorization':token
        }
    })
}
const login = (event) => {
    event.preventDefault();
    const user = {//req.body body de la request (petición)
        username: event.target.username.value,
        password: event.target.password.value,
    }
    axios.post('http://localhost:3000/users/login', user)
    .then(res=>{
        const token = res.data.token;
        localStorage.setItem('authToken',token)
        const message = res.data.message;
        const msgDOM = document.createElement('h3');
        // msgDOM.classList.add('alert');
        // msgDOM.classList.add('alert-success');
        msgDOM.setAttribute('class','alert alert-success');
        msgDOM.innerText=message;
        mainContainer.append(msgDOM);
        event.target.reset();
        setTimeout(() => msgDOM.remove(), 3500);
    })
    .catch(err=>{
        const message =err.response?.data?.message;
        const msgDOM = document.createElement('h3');
        // msgDOM.classList.add('alert');
        // msgDOM.classList.add('alert-success');
        msgDOM.setAttribute('class','alert alert-danger')
        msgDOM.innerText=message;
        mainContainer.append(msgDOM);
        setTimeout(() => msgDOM.remove(), 3500);
    })
}
const register = (event) => {
    event.preventDefault();
    const user = {
        username: event.target.username.value,
        password: event.target.password.value,
        email: event.target.email.value,
    }
    axios.post('http://localhost:3000/users/register', user)
    .then(res=>{
        const message = res.data;
        const msgDOM = document.createElement('h3');
        // msgDOM.classList.add('alert');
        // msgDOM.classList.add('alert-success');
        msgDOM.setAttribute('class','alert alert-success')
        msgDOM.innerText=message;
        mainContainer.append(msgDOM);
        event.target.reset();
        setTimeout(() => msgDOM.remove(), 3500);
    })
    .catch(err=>console.error(err))
}
const renderRegisterForm = () => {
    mainContainer.innerHTML = registerForm
}
const renderLoginForm = () => {
    mainContainer.innerHTML = loginForm
}

mainContainer.innerHTML = loginForm