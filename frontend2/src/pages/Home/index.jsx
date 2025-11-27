import { Link } from "react-router-dom"
import "./styles.css"



function Home() {
    return (
        
         <div className="div-home">
            <p>Crie uma Conta <Link to='/create/user'>
                    <button>Criar</button>
                </Link></p>
            <p>Fazer Login  <Link to='/login'>
                    <button>
                        Login
                    </button>
                </Link></p>
        </div>

     )
       
}

export default Home