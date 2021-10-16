import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import * as logo from './assets/logo.png';
import CardPokemon from './components/CardPokemon';
import DetailPokemonModal from './components/DetailPokemonModal';
import Loading from './components/Loading';
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

		<div className="container containerBody">
			{/* This is the pokemon detail modal view. It is hidden by default, but displayes when you click a pokemon card */}
			<DetailPokemonModal/>

			<div className="d-flex justify-content-center flex-wrap">
				<img loading="lazy" src={logo.default} width="50%" alt="PokeDekus"/>
			</div>

			{/* This is the card generator! */}
			<div className="d-flex justify-content-center flex-wrap">
				{pokemonData && pokemonData.map((pokemon, index) => {

					const picId = pokemon.id.toString().padStart(3, "0");
					const pictureUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${picId}.png`;

					return <CardPokemon className="" key={index} id={pokemon.id} name={pokemon.name} types={pokemon.types.map((type) => type.type.name)} picture={pictureUrl} />
				})}
			</div>

			{status !== 'loading' && <div className="d-flex justify-content-center flex-wrap">
				<button onClick={() => dispatch(loadPokemon()) } className="mt-3 button-23">Load more pokemon!</button>
			</div>}
			{status === 'loading' && <Loading/>}
			{status === 'failed' && <div className="error mt-3">Something went wrong. Please try again!</div>}
		</div>
	</div>
	);
}

export default App;
