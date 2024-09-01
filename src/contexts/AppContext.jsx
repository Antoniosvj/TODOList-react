import { createContext, useEffect, useState } from "react";
import { api } from '../services';

// Criação do contexto
export const AppContext = createContext();

// Provedor de contexto
export const AppContextProvider = ({ children }) => {
    const [state, setState] = useState({});

    const [ criador, setCriador] =useState('Antonio Sérgio')

    const [ tarefas, setTarefas ] = useState([]);

    const carregarTarefa = async() =>{
        const { data = []} = await api.get('/tarefas');

        setTarefas ([
            ...data,
        ]);
    };

    const adicionarTarefa = async (nomeTarefa) =>{
        const {data:tarefa} = await api.post('/tarefas', {nome: nomeTarefa});
        setTarefas(estadoAtual =>{
            return [
                ...estadoAtual,
                tarefa
            ];
        });
    }

    const removerTarefa = async(idTarefa) =>{
        await api.delete(`/tarefas/${idTarefa}`)
        setTarefas(estadoAtual =>{
            const tarefasAtualizadas = estadoAtual.filter(tarefa =>tarefa.id != idTarefa);

            return [
                ...tarefasAtualizadas,
            ]
        })
    }

    const editarTarefa = async (idTarefa, nomeTarefa) =>{
        const { data: tarefaAtualizada} = await api.put(`/tarefas/${idTarefa}`, {nome: nomeTarefa})
        setTarefas[estadoAtual =>{
            const tarefasAtualizadas = estadoAtual.map(tarefa => {
                return tarefa.id == idTarefa ? {
                    ...tarefa,
                    nome: tarefaAtualizada.nome,
                } : tarefa;
            });
            return [
                ...tarefasAtualizadas,
            ]
        }];
    };

    useEffect(() =>{
        carregarTarefa();
    }, []);

    return (
        <AppContext.Provider value={{
            state,
            setState, 
            criador,
            tarefas,
            adicionarTarefa,
            removerTarefa,
            editarTarefa,
        }}>
            {children}
        </AppContext.Provider>
    );
};
