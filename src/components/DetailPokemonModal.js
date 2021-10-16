import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL } from '../redux/pokeFetch';


const DetailPokemonModal = () => {

    const { detailsModalIsOpen, pokemonDetailData } = useSelector(state => state.pokeFetch);
	const dispatch = useDispatch();

    console.log(pokemonDetailData);

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
                    <div className="col typeNames">
                        <div className="typeHeading">Type: </div>
                        {pokemonDetailData.types.map((type) => (
                            <div className="type" key={type.type.name}>{type.type.name}</div>
                        ))}
                    </div>
                    <div className="col">
                        <div className="pictureContainer">
                            <div className="background"></div>
                            <div className="picture">
                                <img loading="lazy" src={pictureUrl} width="100%" alt={pokemonDetailData.name}/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row containerDetail">
                    <div className="col-6 typeNames">
                        <div className="typeHeading">Type: </div>
                        {pokemonDetailData.types.map((type) => (
                            <div className="type" key={type.type.name}>{type.type.name}</div>
                        ))}
                    </div>
                </div> */}
            </Modal>
        );
    } else {
        return (
            <noscript/>
        )
    }


}

export default DetailPokemonModal;