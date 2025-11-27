import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { createAtendimento } from "../../api/atendimento"








const INITIAL_STATE = {
    dia: '',
    hora: '',
    valor: '',
    concluido: ''
}

export default function CreateAtendimento() {
    const navigate = useNavigate()
    const [atendimento, setUser] = useState(INITIAL_STATE)

    const hendleChange = (e) => {
        const { id, value } = e.target
        setUser({
            ...atendimento,
            [id]: value
        })
    }

    const hendleSave = async (e) => {
        e.preventDefault()
        if (!atendimento.dia || !atendimento.hora || !atendimento.valor || atendimento.concluido === undefined) {
            return alert('Preencha todos os campos')
        }
        const response = await createAtendimento(atendimento)

        if (response.status === 201) {
            navigate('/Atendimentos')
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
                <h3>Criando atendimento</h3>
                <form>
                    <div>
                        <label>dia:</label>
                        <input type="text" name="nome" id='nome' value={atendimento.dia} onChange={hendleChange} />
                    </div>
                    <div>
                        <label>hora:</label>
                        <input type="email" name="email" id="email" value={atendimento.hora} onChange={hendleChange} />
                    </div>
                    <div>
                        <label>valor:</label>
                        <input type="password" name="senha" id="senha" value={atendimento.valor} onChange={hendleChange} />
                    </div>
                    <div>
                        <label>concluido:</label>
                        <input type="password" name="senha" id="senha" value={atendimento.concluido} onChange={hendleChange} />
                    </div>
                    
                    <div>
                        <button type="reset" onClick={handleReset}>Limpar</button>
                        <button type="submit" onClick={hendleSave}>Criar</button>
                    </div>
                </form>


            </div>



        </main>
    );
}