import { Link } from 'react-router-dom'
import './style.css'
import { AuthContext } from '../../auth/context';
import { useContext } from 'react';

export default function Header() {
    const { token } = useContext(AuthContext);
    return (
        <header>
            <h1>Gerenciador de Atendimento</h1>
            <nav>
 
                {/* {   !token
                    ? null
                    : <Link to='/Create/User'>
                        <button>
                            atendimentos
                        </button>
                    </Link> } */}
            </nav>
        </header>
    )
}