import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL } from '../redux/pokeFetch';


const DetailPokemonModal = () => {

    const { detailsModalIsOpen, pokemonDetailData } = useSelector(state => state.pokeFetch);
	const dispatch = useDispatch();

    // console.log(pokemonDetailData);

    if (pokemonDetailData != null) {

        const picId = pokemonDetailData.id.toString().padStart(3, "0");
        const pictureUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${picId}.png`;

        return (
            <Modal Modal
                isOpen={detailsModalIsOpen}
                closeTimeoutMS={800}
                onRequestClose={() => dispatch(CLOSE_MODAL())}
                className="modalContainer"
                contentLabel="Pokemon Information">
                <div className="containerHeader">
                    <div className="id">No:{pokemonDetailData.id}</div>
                    <h2 className="name">
                        {pokemonDetailData.name}
                    </h2>
                </div>
                <div className="row containerDetail">
                    <div className="col">
                        <div className="typeNames">
                            <div className="typeHeading">Type: </div>
                            {pokemonDetailData.types.map((type) => (
                                <div className="type" key={type.type.name}>{type.type.name}</div>
                            ))}
                        </div>
                        <br/>
                        <div className="typeNames">
                            <div className="typeHeading">Abilities: </div>
                            {pokemonDetailData.abilities.map((ability) => (
                                <div className="type" key={ability.ability.name}>{ability.ability.name}</div>
                            ))}
                        </div>
                        <br/>
                        <div className="typeNames">
                            <div className="typeHeading">Moves: </div>
                            {pokemonDetailData.moves.map((moves) => (
                                <div className="type" key={moves.move.name}>{moves.move.name}</div>
                            ))}
                        </div>
                    </div>
                    <div className="col">
                        <div className="pictureContainer">
                            <div className="background"></div>
                            <div className="picture">
                                <img loading="lazy" src={pictureUrl} width="100%" alt={pokemonDetailData.name}/>
                            </div>
                        </div>
                        <br/>
                        <div className="typeNames">
                            <div className="typeHeading">Sprites: </div>
                            {pokemonDetailData.sprites.back_default && <img loading="lazy" src={pokemonDetailData.sprites.back_default} width="25%" alt={pokemonDetailData.name}/>}
                            {pokemonDetailData.sprites.back_female && <img loading="lazy" src={pokemonDetailData.sprites.back_female} width="25%" alt={pokemonDetailData.name}/>}
                            {pokemonDetailData.sprites.back_shiny && <img loading="lazy" src={pokemonDetailData.sprites.back_shiny} width="25%" alt={pokemonDetailData.name}/>}
                            {pokemonDetailData.sprites.back_shiny_female && <img loading="lazy" src={pokemonDetailData.sprites.back_shiny_female} width="25%" alt={pokemonDetailData.name}/>}
                            {pokemonDetailData.sprites.front_default && <img loading="lazy" src={pokemonDetailData.sprites.front_default} width="25%" alt={pokemonDetailData.name}/>}
                            {pokemonDetailData.sprites.front_female && <img loading="lazy" src={pokemonDetailData.sprites.front_female} width="25%" alt={pokemonDetailData.name}/>}
                            {pokemonDetailData.sprites.front_shiny && <img loading="lazy" src={pokemonDetailData.sprites.front_shiny} width="25%" alt={pokemonDetailData.name}/>}
                            {pokemonDetailData.sprites.front_shiny_female && <img loading="lazy" src={pokemonDetailData.sprites.front_shiny_female} width="25%" alt={pokemonDetailData.name}/>}
                        </div>
                        <br/>
                        <div className="typeNames">
                            <div className="typeHeading">Weight: </div>
                            <div className="type">{pokemonDetailData.weight / 10} KG</div>
                        </div>
                        <br/>
                        <div className="typeNames">
                            <div className="typeHeading">Height: </div>
                            <div className="type">{pokemonDetailData.height * 10} CM</div>
                        </div>
                        <br/>
                        <div className="typeNames">
                            <div className="typeHeading">Stats: </div>
                            <table class="table table-striped table-responsive-xl">
                                <thead className="thead">
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Base Stat</th>
                                    <th scope="col">Effort</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pokemonDetailData.stats.map((stat, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{stat.stat.name}</td>
                                        <td>{stat.base_stat}</td>
                                        <td>{stat.effort}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    } else {
        return (
            <noscript/>
        )
    }
}

export default DetailPokemonModal;