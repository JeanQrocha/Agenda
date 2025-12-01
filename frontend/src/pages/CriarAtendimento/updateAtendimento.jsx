import { useEffect, useState } from "react"
import { updateAtendimento } from "../../api/atendimento";
import { useLocation, useNavigate } from "react-router-dom";
import './styles.css'
import { toast } from "react-toastify";

export default function UpdateAtendimento() {
    const navigate = useNavigate()
    const [atendimento, setAtendimento] = useState({
        dia: '',
        hora: '',
        valor: '',
        concluido: false,
        clienteId: ''
    })
    // adicionar userLocation novo para pegar o state passado anteriormente
    const location = useLocation()
    const { atendimento: prevAtendimento } = location.state

    const handleChange = (e) => {
        const { id, type, checked, value } = e.target
        setAtendimento({
            ...atendimento,
            [id]: type === "checkbox" ? checked : value
        })
    }

    const handleReset = (e) => {
        e.preventDefault()
        // alterado do init para o prev
        setAtendimento({ ...prevAtendimento })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        // Alterada função pra update
        const response = await updateAtendimento(prevAtendimento.id, atendimento)

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
        setAtendimento({ ...prevAtendimento })
    }, [])

    return (
        <div className="form">
            <form>
                <div>
                    <h2 className="h2-form">Editar Atendimento</h2>
                </div>
                <div>
                    <label>dia:</label>
                    <input type="text" id="dia" value={atendimento.dia} onChange={handleChange} />
                </div>

                <div>
                    <label>hora:</label>
                    <input type="text" id="hora" value={atendimento.hora} onChange={handleChange} />
                </div>

                <div>
                    <label>valor:</label>
                    <input type="text" id="valor" value={atendimento.valor} onChange={handleChange} />
                </div>

                <div>
                    <label>concluído:</label>
                    <input type="checkbox" id="concluido" checked={atendimento.concluido} onChange={handleChange} />
                </div>
                <div>
                    <label>Numero de Registro:</label>
                    <input type="text" id="clienteId" value={atendimento.clienteId} onChange={handleChange} />
                </div>

                <div>
                    <button type="reset" onClick={handleReset}>Limpar</button>
                    <button type="submit" onClick={handleSave}>Criar</button>
                </div>
            </form>
        </div>
    )
}