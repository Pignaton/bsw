import React from 'react';
import {Link} from 'react-router-dom';
import {HeaderArea} from './styled';
import { isLogged } from '../../../helpers/AuthHandler';
import Logo from '../../../images/logo.png';

const Header = () => {
    let logged = isLogged();

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
                                <Link to="/logout">Sair</Link>
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