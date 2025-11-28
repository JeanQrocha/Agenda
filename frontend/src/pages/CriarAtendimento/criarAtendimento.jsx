import { useState } from "react"
import { createAtendimento } from "../../api/atendimento"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import './styles.css'

const INITIAL_STATE = {
    dia: '',
    hora: '',
    valor: '',
    concluido: false,
    clienteId: '',
}

export default function CriarAtendimento() {
    const navigate = useNavigate()

    const [atendimento, setAtendimento] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        const { id, type, checked, value } = e.target
        setAtendimento({
            ...atendimento,
            [id]: type === "checkbox" ? checked : value
        })
    }

    const handleSave = async (e) => {
        e.preventDefault()

        if (!atendimento.dia || !atendimento.hora || !atendimento.valor || !atendimento.clienteId ) {
            return toast.error('Preencha todos os campos')
        }

        const response = await createAtendimento(atendimento)

        if (response.status === 201) {
            toast.success("Atendimento criado com sucesso")
            navigate('/Atendimentos')
        } else {
            toast.error("Erro ao criar atendimento")
        }
    }

    const handleReset = (e) => {
        e.preventDefault()
        setAtendimento(INITIAL_STATE)
    }

    return (
        <main>
            <div className="form-atendimento">
                <h3>Criando atendimento</h3>
                <form>
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
        </main>
    );
}
