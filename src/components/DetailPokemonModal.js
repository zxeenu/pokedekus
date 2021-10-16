import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL } from '../redux/pokeFetch';


const DetailPokemonModal = () => {

    const { detailsModalIsOpen, pokemonDetailData } = useSelector(state => state.pokeFetch);
	const dispatch = useDispatch();

    console.log(pokemonDetailData);

    if (pokemonDetailData != null) {

        const picId = pokemonDetailData.id.toString().padStart(3, "0");
        const pictureUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${picId}.png`;

        return (
            <Modal Modal
                isOpen={detailsModalIsOpen}
                closeTimeoutMS={800}
                onRequestClose={() => dispatch(CLOSE_MODAL())}
                className="modalContainer"
                contentLabel="Pokemon Information">
                <div className="container">
                    <div className="id">No:{pokemonDetailData.id}</div>
                    <h2 >
                        <div>&nbsp;</div>
                        <div>{pokemonDetailData.name}</div>
                    </h2>
                </div>
                <div className="row">
                    <div className="col">
                        {pokemonDetailData.types.map((type) => (
                            <div key={type.type.name}>{type.type.name}</div>
                        ))}
                    </div>
                    <div className="col">
                        <div className="pictureContainer grid">
                            <div className="background"></div>
                            <div className="picture">
                                <img loading="lazy" src={pictureUrl} width="270px" alt={pokemonDetailData.name}/>
                            </div>
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