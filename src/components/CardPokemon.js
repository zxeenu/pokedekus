const CardPokemon = ({id, name, types, picture}) => {
    return (
        <div className="greenCard">
            <div className="container">
                <div className="id">No:{id}</div>
                <h2 >
                    <div>&nbsp;</div>
                    <div>{name}</div>
                </h2>
            </div>
            <div className="row">
                <div className="col">
                    {types.map((type) => (
                        <div className="typeItem grid" key={type}>{type}</div>
                    ))}
                </div>
                <div className="col">
                    <div className="pictureContainer grid">
                        <div className="background"></div>
                        <div className="picture">
                            <img src={picture} width="270px"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default CardPokemon;