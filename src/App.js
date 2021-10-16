import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import CardPokemon from './components/CardPokemon';
import { BONG, CLOSE_MODAL, loadPokemon, OPEN_MODAL, PING, PONG } from './redux/pokeFetch';


Modal.setAppElement('#root');

const customStyles = {
    content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    },
};

function App() {

	const { isPinging, pokemonData, status, detailsModalIsOpen } = useSelector(state => state.pokeFetch);
	const dispatch = useDispatch();

	const types = ["green", "yello"];
	const picture = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png";


	useEffect(() => {
		dispatch(loadPokemon());
	}, [])


    // let subtitle;
    // const [modalIsOpen, setIsOpen] = React.useState(false);

    // function openModal() {
    //   setIsOpen(true);
    // }

    // function afterOpenModal() {
    //   // references are now sync'd and can be accessed.
    //   subtitle.style.color = '#f00';
    // }

    // function closeModal() {
    //   setIsOpen(false);
    // }

	return (
	<div className="App">
		<header className="App-header">
		</header>
		{/* <div>{!isPending && data.results.map((data, index) => (
			<div key={index}>{data.name} {data.url}</div>
		))}</div> */}
		<br />
		{/* <h1>count is {isPinging}</h1> */}

		<h1>{status}</h1>
		<button onClick={() => dispatch(PING()) }>PING</button>
		<button onClick={() => dispatch(PONG()) }>PONG</button>
		<button onClick={() => dispatch(BONG(10)) }>BONG</button>
		<button onClick={() => dispatch(loadPokemon()) }>Get Pokemon</button>

		<button onClick={() => dispatch(OPEN_MODAL())}></button>
		<Modal Modal
			isOpen={detailsModalIsOpen}
			// onAfterOpen={afterOpenModal}
			onRequestClose={() => dispatch(CLOSE_MODAL())}
			style={customStyles}
			contentLabel="Example Modal">
			{/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
			<button onClick={() => dispatch(CLOSE_MODAL())}>close</button>
			<div>I am a modal</div>
			<form>
			<input />
			<button>tab navigation</button>
			<button>stays</button>
			<button>inside</button>
			<button>the modal</button>
			</form>
			<CardPokemon id={1} name="hello" types={["grass"]} picture={picture} />
		</Modal>

		{/* This is the card generator! */}
		<div className="container">
			<div className="d-flex justify-content-center flex-wrap">
				{pokemonData && pokemonData.map((pokemon, index) => {

					const picId = pokemon.id.toString().padStart(3, "0");
					const pictureUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${picId}.png`;

					return <CardPokemon className="" key={index} id={pokemon.id} name={pokemon.name} types={pokemon.types.map((type) => type.type.name)} picture={pictureUrl} />
				})}
			</div>
		</div>
	</div>
	);
}

export default App;
