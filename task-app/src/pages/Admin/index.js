import {useState, useEffect} from 'react'
import {auth, db} from '../../firebaseConnection'
import {signOut} from 'firebase/auth'
import './admin.css'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  deleteDoc,
  updateDoc,
  doc
} from 'firebase/firestore'

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('')
  const [editTarefa, setEditTarefa] = useState({})
  const [user, setUser] = useState({})
  const [tarefas, setTarefas] = useState([])

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem('@detailUser')
      setUser(JSON.parse(userDetail))

      const data = JSON.parse(userDetail)

      const tarefaRef = collection(db, 'tarefas')
      const q = query(
        tarefaRef,
        orderBy('created', 'desc'),
        where('userUid', '==', data?.uid)
      )

      const unsub = onSnapshot(q, (snapshot) => {
        const lista = []

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            userUid: doc.data().userUid
          })
        })
        setTarefas(lista)
      })
    }
    loadTarefas()
  }, [])
  async function handleRegister(e) {
    e.preventDefault()

    if (tarefaInput === '') {
      alert('Digite a sua tarefa...')
      return
    }

    if (editTarefa?.id) {
      handleUpdateTarefa()
      return
    }
    await addDoc(collection(db, 'tarefas'), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
      .then(() => {
        console.log(`Tarefa registrada: ${tarefaInput}`)
        setTarefaInput('')
      })
      .catch((error) => console.log(`Erro ao registrar: ${error}`))
  }

  async function handleLogout() {
    await signOut(auth).then(() => {
      localStorage.clear()
    })
  }

  async function editarTarefa(item) {
    setTarefaInput(item.tarefa)
    setEditTarefa(item)
  }

  async function handleUpdateTarefa() {
    const docRef = doc(db, 'tarefas', editTarefa?.id)
    await updateDoc(docRef, {
      tarefa: tarefaInput
    })
      .then(() => {
        console.log('Tarefa atualizada!')
        setTarefaInput('')
        setEditTarefa({})
      })
      .catch(() => console.log('Não foi possível realizar a ação!'))
  }

  async function deleteTarefa(itemId) {
    const docRef = doc(db, 'tarefas', itemId)
    await deleteDoc(docRef)
  }
  return (
    <div className="admin-container">
      <h1>Minhas tarefas</h1>
      <form
        className="form"
        onSubmit={handleRegister}
      >
        <textarea
          placeholder="Digite a sua tarefa..."
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />

        {Object.keys(editTarefa).length > 0 ? (
          <button
            style={{backgroundColor: '#38b304'}}
            className="btn-register"
            type="submit"
          >
            Atualizar tarefa
          </button>
        ) : (
          <button
            className="btn-register"
            type="submit"
          >
            Registrar tarefa
          </button>
        )}
      </form>

      {tarefas.map((item) => {
        return (
          <article
            key={item.id}
            className="list"
          >
            <p>{item.tarefa}</p>
            <div>
              <button onClick={() => editarTarefa(item)}>Editar</button>
              <button
                className="btn-delete"
                onClick={() => deleteTarefa(item.id)}
              >
                Concluir
              </button>
            </div>
          </article>
        )
      })}

      <button
        className="btn-logout"
        onClick={handleLogout}
      >
        Sair
      </button>
    </div>
  )
}
