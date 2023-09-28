import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from "../../assets/img/logo.png"
import "./style.css";
import { FaSearch, FaHeart } from "react-icons/fa";

export const Header = () => {
    const navigate = useNavigate();
    const navLink = () => {
        let inputPesquisa = document.getElementById('input-pesquisa');
        if (inputPesquisa.value !== "") {
            navigate(`/pesquisa/${inputPesquisa.value}`)
        }
        else{
            inputPesquisa.placeholder = "Não é possível pesquisar sem texto"
        }
    }


    return (
        <>
            <header>
                <Link to="/">
                    <img src={logo} width="190" height="60" alt="Logo Avanti Flix" className="image_logo"/>
                </Link>
                <div className="favorites">
                    <Link to={'/favorites'}><FaHeart /> Meus favoritos</Link>
                </div>
                <div className='search-container' tabIndex='1'>
                      <input id="input-pesquisa" className="input-search" placeholder='Pesquisa' type='text'/>   
                      <a onClick={navLink} className='button'>
                        <FaSearch/>
                      </a>
                </div>

            </header>
        </>
    )
}