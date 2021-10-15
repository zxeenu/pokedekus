import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CardPokemon from './components/CardPokemon';
import { BONG, loadPokemon, PING, PONG } from './redux/pokeFetch';
// import useFetch from './utilities/useFetch';

function App() {

	const { isPinging, pokemonData, status } = useSelector(state => state.pokeFetch);
	const dispatch = useDispatch();

	const types = ["green", "yello"];
	const picture = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png";


	useEffect(() => {
		dispatch(loadPokemon());
	}, [])

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
		<div>
			{pokemonData && pokemonData.map((pokemon, index) => {

				const picId = pokemon.id.toString().padStart(3, "0");
				const pictureUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${picId}.png`;

				return <CardPokemon key={index} id={pokemon.id} name={pokemon.name} types={pokemon.types.map((type) => type.type.name)} picture={pictureUrl} />
			})}
		</div>
	</div>
	);
}

export default App;
