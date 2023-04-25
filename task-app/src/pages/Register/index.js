import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from '../../firebaseConnection'
import {createUserWithEmailAndPassword} from 'firebase/auth'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()

    if (email !== '' && password !== '') {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/admin', {replace: true})
        })
        .catch(() => console.log('Erro ao cadastrar!'))
    } else {
      alert('Preencha corretamente!')
    }
  }
  return (
    <div className="home-container">
      <h1>Cadastre-se</h1>
      <span>Vamos criar a sua conta</span>

      <form
        className="form"
        onSubmit={handleRegister}
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

        <button type="submit">Registrar</button>
      </form>
      <Link
        className="button-link"
        to="/"
      >
        Já possui uma conta? Faça o login!
      </Link>
    </div>
  )
}
