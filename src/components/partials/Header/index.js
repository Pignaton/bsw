import React from 'react';
import {Link} from 'react-router-dom';
import {HeaderArea} from './styled';
import { isLogged, doLogout } from '../../../helpers/AuthHandler';
import Logo from '../../../images/logo.png';

const Header = () => {
    let logged = isLogged();

    const handleLogout = () => {
        doLogout();
        window.location.href = '/';
    }

    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="LogoImg" />
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged &&
                        <>
                            <li>
                                <Link to="/my-account">Minha Conta</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Sair</button>
                            </li>
                            <li>
                                <Link to="/pasot-an-ad" class="button">Poste um anúncio</Link>
                            </li>
                        </>

                        }
                        {!logged &&
                        <>
                            <li>
                                <Link to="/signin">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Cadastrar</Link>
                            </li>
                        </>
                        }
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
}

export default Header;