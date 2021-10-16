import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import CardPokemon from './components/CardPokemon';
import DetailPokemonModal from './components/DetailPokemonModal';
import { loadPokemon } from './redux/pokeFetch';


Modal.setAppElement('#root');

function App() {

	const { pokemonData, status } = useSelector(state => state.pokeFetch);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadPokemon());
	}, [dispatch])


	return (
	<div className="App">
		<header className="App-header">
		</header>
		<br />

		<h1>{status}</h1>

		<button onClick={() => dispatch(loadPokemon()) }>Get Pokemon</button>

		{/* This is the pokemon detail modal view. It is hidden by default, but displayes when you click a pokemon card */}
		<DetailPokemonModal/>

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
