import { useAppContext } from '../../hooks';
import { Outlet } from 'react-router-dom';
import { Cabecalho, Conteudo, Rodape } from '../../components';

const LayoutPadrao = () =>{
    const { criador } = useAppContext();

    return(
        <>
            <Cabecalho/>
            <Conteudo>
                <Outlet />
            </Conteudo>
            <Rodape criador={criador} />
        </>
    )
}
export { LayoutPadrao };