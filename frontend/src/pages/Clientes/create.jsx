import { useState } from "react"
import { createUser } from "../../api/clientes"
import { useNavigate } from "react-router-dom"
import './styles.css'
import { Link } from "react-router-dom"

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
}

export default function CreateUser() {
    const navigate = useNavigate()
    const [user, setUser] = useState(INITIAL_STATE)

    const hendleChange = (e) => {
        const { id, value } = e.target
        setUser({
            ...user,
            [id]: value
        })
    }

    const hendleSave = async (e) => {
        e.preventDefault()
        if (!user.nome || !user.email || !user.senha) {
            return alert('Preencha todos os campos')
        }
        const response = await createUser(user)

        if (response.status === 201) {
            navigate('/')
        } else {
            console.log(response)
        }
    }

    const handleReset = (e) => {
        e.preventDefault()
        setUser(INITIAL_STATE)
    }




    return (
        <main>
            <div className="form">
                <h3>Criando Usuário</h3>
                <form>
                    <div>
                        <label>Nome:</label>
                        <input type="text" name="nome" id='nome' value={user.nome} onChange={hendleChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" id="email" value={user.email} onChange={hendleChange} />
                    </div>
                    <div>
                        <label>Senha:</label>
                        <input type="password" name="senha" id="senha" value={user.senha} onChange={hendleChange} />
                    </div>
                    <div>
                        <button type="reset" onClick={handleReset}>Limpar</button>
                        <button type="submit" onClick={hendleSave}>Criar</button>
                        <Link to='/'>
                            <button>Voltar</button>
                        </Link>
                    </div>
                </form>


            </div>



        </main>
    );
}