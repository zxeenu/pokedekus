import { useDispatch, useSelector } from 'react-redux';
import CardPokemon from './components/CardPokemon';
import { PING, PONG } from './redux/pokeFetch';
import useFetch from './utilities/useFetch';

function App() {

	const { isPinging } = useSelector(state => state.pokeFetch);
	const dispatch = useDispatch();

	const { data, error, isPending } = useFetch('https://pokeapi.co/api/v2/pokemon/');

	// console.log(data);

	const types = ["green", "yello"];
	const picture = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png";

	return (
	<div className="App">
		<header className="App-header">
		</header>
		<CardPokemon id="1" name="Bulbusor" types={types} picture={picture}/>
		<div>{!isPending && data.results.map((data, index) => (
			<div key={index}>{data.name} {data.url}</div>
		))}</div>
		<br />
		<h1>count is {isPinging}</h1>
		<button onClick={() => dispatch(PING()) }>PING</button>
		<button onClick={() => dispatch(PONG()) }>PONG</button>
		{/* <button onClick={() => dispatch(incrementByAmount(10)) }>by amouont</button> */}
	</div>
	);
}

export default App;
