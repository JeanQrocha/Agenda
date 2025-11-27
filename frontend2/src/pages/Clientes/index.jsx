import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import { toast } from "react-toastify"
import { deleteAtendimento, getAtendimentos, updateAtendimento } from '../../api/atendimento'

function Atendimentos() {


    const [atendimentos, setUsers] = useState([])

    const handleDelete = async (id) => {
        const response = await deleteAtendimento(id)

        if (response.status !== 204) {
            toast('Erro ao deletar usuário');
            return
        }

        setUsers(atds => atds.filter(atd => atd.id !== id)) 

    }

    const handleUpdate = async (id) => {
        await updateAtendimento(id), { ativo: false }
    }



    useEffect(() => {
        async function carregar() {
            const allUsers = await getAtendimentos()
            setUsers(allUsers)
        }
        carregar()
    }, [])

    return (
        <main>
                <Link to='/create/atendimento'>
                    <button>Criar Atendimento</button>
                </Link>
            <div className='user-list'>
                <div className='userheader' key='header'>
                    <p>atendimentos</p>
                    <label>Ações</label>
                </div>
                {
                    atendimentos.length === 0
                        ? <div className='user'>
                            <label>Voce ainda nao tem nenhum atendimento!</label>
                        </div>
                        : atendimentos.map(atds =>

                            <div className='user' key={atds.id}>
                                <label>{atds.dia}</label>
                                <label>{atds.hora}</label>
                                <label>{atds.valor}</label>
                                <label>{atds.concluido}</label>
                                <div className='actions'>
                                    <button type='button' onClick={handleUpdate}>Alterar</button>
                                    <button type='button' onClick={() => handleDelete(atds.id)}>Deletar</button>
                                </div>

                            </div>
                        )}
            </div>
        </main>
    )
}

export default Atendimentos
