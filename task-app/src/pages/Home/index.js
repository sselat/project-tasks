import {useState} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {auth} from '../../firebaseConnection'
import {signInWithEmailAndPassword} from 'firebase/auth'
import './home.css'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    if (email !== '' && password !== '') {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/admin', {replace: true})
        })
        .catch(() => console.log(`Erro ao fazer o login`))
    } else {
    }
  }
  return (
    <div className="home-container">
      <h1>Lista de tarefas</h1>
      <span>Gerencie a sua agenda de forma fácil.</span>

      <form
        className="form"
        onSubmit={handleLogin}
      >
        <input
          type="text"
          placeholder="Digite o seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite a sua senha..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Acessar</button>
      </form>
      <Link
        className="button-link"
        to="/register"
      >
        Não possui uma conta? Cadastre-se!
      </Link>
    </div>
  )
}
