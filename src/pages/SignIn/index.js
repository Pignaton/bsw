import React, { useState } from 'react';
import {PageArea} from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import  useApi  from '../../helpers/BswAPI';
import {doLogin} from '../../helpers/AuthHandler';

const Page = () => {
    const api = useApi();

    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ rememberPassword, setRememberPassword] = useState(false);
    const [ disable, setDisable] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisable(true);

        const json = await api.login(email, password);

        if(json.error){
            setError(json.error);
        }else {
            doLogin(json.token, rememberPassword);
            window.location = '/';
        }

    }

    return (
        <PageContainer>
            <PageTitle>login</PageTitle>
            <PageArea>
                {
                    error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Email</div>
                        <div className="area--input">
                            <input type="email" 
                                disable={disable}
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                             />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input type="password" 
                                disable={disable}
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                             />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Lembrar Senha</div>
                        <div className="area--input area--checkbox">
                            <input type="checkbox"                             
                                disable={disable}
                                value={rememberPassword}
                                onChange={()=>setRememberPassword(!rememberPassword)}
                             />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disable={disable}>Fazer Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;