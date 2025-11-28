import { Link } from "react-router-dom"
import "./styles.css"



function Home() {
    return (
        
         <div className="div-home">
            <p>Ainda não tem cadastro ?</p>
            <p className="p-home">Crie uma Conta <Link to='/create/user'>
                    <button className="button-home">Criar</button>
                </Link></p>
                <p>ou</p>
            <p className="p-home">Fazer Login  <Link to='/login'>
                    <button className="button-home">
                        Login
                    </button>
                </Link></p>
        </div>

     )
       
}

export default Home