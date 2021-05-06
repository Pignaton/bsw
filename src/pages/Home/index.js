import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'; 
import {PageArea, SearchArea } from './styled';
import { PageContainer} from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';
import  useApi  from '../../helpers/BswAPI';

const Page = () => {
    const api = useApi();

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adsList, setAdsList] = useState([]);

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit:8
            });
            setAdsList(json.ads);
        }
        getRecentAds();
    }, []);

    return (
        <>
        <SearchArea>
            <PageContainer>
                <div class="searchBox">
                    <form method="/ads">
                        <input type="text" name="q" placeholder="O que você precura?" />
                        <select name="state">
                            {stateList.map((i,k)=>
                                <option key={k} value={i.name}>{i.name}</option>
                            )}
                        </select>
                        <button>Pesquisar</button>
                    </form>
                </div>
                <div className="categoryList">
                {categories.map((i,k)=>
                    <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                        <img src={i.img} alt="" />
                        <span>{i.name}</span>
                    </Link>
                )}
                </div>
            </PageContainer>
        </SearchArea>
        <PageContainer>
            <PageArea>
                <h2>Anúncios Recentes</h2>
                    <div className="list">
                    {adsList.map((i,k)=>
                        <AdItem key={k} data={i} />
                    )}
                    </div>
               <Link to="/ads" className="seeAllLink">Ver todos</Link>
               <hr/>
              teste teste teste
            </PageArea>
        </PageContainer>
    </>
    );
}

export default Page;