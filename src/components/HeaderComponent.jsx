const HeaderComponent = ({ busca, onBuscaChange, totalUsuarios }) => {
    return (
        <header className="header">
            <div className="header__content">
                <div className="header__text">
                    <p className="header__eyebrow">Meu aniversario</p>
                    <h1 className="header__title">18 nomes para celebrar</h1>
                </div>

                <div className="header__controls">
                    <input
                        className="header__search"
                        type="text"
                        placeholder="Buscar usuários..."
                        value={busca}
                        onChange={(e) => onBuscaChange(e.target.value)}
                    />

                    <p className="header__count">{totalUsuarios} encontrado(s)</p>
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;
