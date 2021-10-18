import React from 'react';
import Lottie from 'react-lottie';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import * as animation from '../assets/back.json';
import { CLOSE_MODAL } from '../redux/pokeFetch';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation.default,
    renderingSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}


const DetailPokemonModal = () => {

    const { detailsModalIsOpen, pokemonDetailData } = useSelector(state => state.pokeFetch);
	const dispatch = useDispatch();

    // console.log(pokemonDetailData);

    if (pokemonDetailData != null) {

        const picId = pokemonDetailData.id.toString().padStart(3, "0");
        const pictureUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${picId}.png`;

        let modalToUse = "";
        const currentType = pokemonDetailData.types[0].type.name;

        switch(currentType) {
            case "normal":
                modalToUse = "modalColorNormal";
                break;

            case "fighting":
                modalToUse = "modalColorFight";
                break;

            case "flying":
                modalToUse = "modalColorFlying";
                break;

            case "poison":
                modalToUse = "modalColorPoison";
                break;

            case "ground":
                modalToUse = "modalColorGround";
                break;

            case "rock":
                modalToUse = "modalColorRock";
                break;

            case "bug":
                modalToUse = "modalColorBug";
                break;

            case "ghost":
                modalToUse = "modalColorGhost";
                break;

            case "steel":
                modalToUse = "modalColorSteel";
                break;

            case "fire":
                modalToUse = "modalColorFire";
                break;

            case "water":
                modalToUse = "modalColorWater";
                break;

            case "grass":
                modalToUse = "modalColorGrass";
                break;

            case "electric":
                modalToUse = "modalColorElectric";
                break;

            case "psychic":
                modalToUse = "modalColorPsycic";
                break;

            case "ice":
                modalToUse = "modalColorIce";
                break;

            case "dragon":
                modalToUse = "modalColorDragon";
                break;

            case "dark":
                modalToUse = "modalColorDark";
                break;

            case "fairy":
                modalToUse = "modalColorFairy";
                break;

            case "unknown":
                modalToUse = "modalColorUnkown";
                break;

            case "shadow":
                modalToUse = "modalColorShadow";
                break;

            default:
                modalToUse = "modalColorUnkown";
                break;
          }

        return (
            <Modal Modal
                isOpen={detailsModalIsOpen}
                closeTimeoutMS={800}
                onRequestClose={() => dispatch(CLOSE_MODAL())}
                className={modalToUse}
                contentLabel="Pokemon Information">
                <div className="row">
                    <div onClick={() => dispatch(CLOSE_MODAL())} className="col-1">
                            <Lottie options={defaultOptions} width="80px"></Lottie>
                    </div>
                </div>
                <div className="containerHeader">
                    <h2 className="name">
                        {pokemonDetailData.name}
                    </h2>
                    <div className="id">No:{pokemonDetailData.id}</div>
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
                            <table className="table table-striped table-responsive-md">
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