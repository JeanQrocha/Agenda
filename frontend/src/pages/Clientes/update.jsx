import { useEffect, useState } from "react"
import { updateUser } from "../../api/clientes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './styles.css'
import { toast } from "react-toastify";

export default function UpdateUser() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        nome: '',
        email: '',
        senha: '',
    })
    // adicionar userLocation novo para pegar o state passado anteriormente
    const location = useLocation()
    const { user: prevUser} = location.state

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser({
            ...user,
            [id]: value
        })
    }

    const handleReset = (e) => {
        e.preventDefault()
        // alterado do init para o prev
        setUser({ ...user})
    }

    const handleSave = async (e) => {
        e.preventDefault()
        // Alterada função pra update
        const response = await updateUser(prevUser.id, user)

        if (response.status === 200) {
            navigate('/useatrs')
            toast("Usuário alterado com sucesso")
        } else {
            toast("Erro ao criar Usuário")
            console.log(response)
        }
    }

    // Adicionado
    useEffect(() => {
        setUser({ ...prevUser })
    }, [])

    return (
        <div className="form">
            <form>
                <div>
                    <h2 className="h2-form">Editar Atendimento</h2>
                </div>
                    <div>
                        <label>Nome:</label>
                        <input type="text" id="dia" value={user.nome} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input type="text" id="hora" value={user.email} onChange={handleChange} />
                    </div>

                    <div>
                        <label>Senha:</label>
                        <input type="text" id="valor" value={user.Senha} onChange={handleChange} />
                    </div>

                    <div>
                        <button type="reset" onClick={handleReset}>Limpar</button>
                        <Link to='/'><button>Voltar</button></Link>
                        <button type="submit" onClick={handleSave}>Criar</button>
                    </div>
                </form>
        </div>
    )
}