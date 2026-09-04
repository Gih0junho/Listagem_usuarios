import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import HeaderComponent from './components/HeaderComponent';
import LoadingComponent from './components/LoadingComponent';
import UserListComponent from './components/UserListComponent';

const filtrarUsuariosPorTermo = (usuario, termo) => {
    const termoLower = termo.toLowerCase();

    return (
        usuario.name.toLowerCase().includes(termoLower) ||
        usuario.username.toLowerCase().includes(termoLower) ||
        usuario.email.toLowerCase().includes(termoLower)
    );
};

const nomesConhecidos = [
    ['Ana Souza', 'ana.souza'],
    ['Bruno Oliveira', 'bruno.oliveira'],
    ['Camila Santos', 'camila.santos'],
    ['Daniel Almeida', 'daniel.almeida'],
    ['Eduarda Costa', 'eduarda.costa'],
    ['Felipe Rocha', 'felipe.rocha'],
    ['Gabriela Martins', 'gabriela.martins'],
    ['Henrique Lima', 'henrique.lima'],
    ['Isabela Ferreira', 'isabela.ferreira'],
    ['Joao Carvalho', 'joao.carvalho']
];

function App() {
    const url = 'https://jsonplaceholder.typicode.com';
    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [busca, setBusca] = useState('');

    const usuariosFiltrados = usuarios.filter((usuario) =>
        filtrarUsuariosPorTermo(usuario, busca)
    );

    async function buscarUsuarios() {
        setCarregando(true);
        setErro(null);

        try {
            const response = await axios.get(`${url}/users`);
            setUsuarios(response.data.map((usuario, index) => {
                const [name, username] = nomesConhecidos[index] || [usuario.name, usuario.username];

                return {
                    ...usuario,
                    name,
                    username,
                    email: `${username}@exemplo.com`
                };
            }));
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            setErro(`Não foi possível buscar os usuários. Código de erro: ${error.message}`);
        } finally {
            setCarregando(false);
            console.log('Requisição finalizada.');
        }
    }

    useEffect(() => {
        buscarUsuarios();
    }, []);

    return (
        <div className="app-container">
            <HeaderComponent
                busca={busca}
                onBuscaChange={setBusca}
                totalUsuarios={usuariosFiltrados.length}
            />

            {carregando ? (
                <LoadingComponent />
            ) : (
                <UserListComponent
                    usuarios={usuariosFiltrados}
                    busca={busca}
                    erro={erro}
                />
            )}
        </div>
    );
}

export default App;