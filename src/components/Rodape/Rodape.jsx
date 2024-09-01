import style from './Rodape.module.css';

const Rodape = (props) =>{
    const { criador } = props;
    const anoAtual = new Date().getFullYear();
    
    return (
        <div className={style.Rodape}>
            React Basic - {anoAtual} - {criador}
        </div>
    )
}
export { Rodape };