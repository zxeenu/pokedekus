import CardPokemon from './components/CardPokemon';
import useFetch from './utilities/useFetch';

function App() {

	const { data, error, isPending } = useFetch('https://pokeapi.co/api/v2/pokemon/');

	console.log(data);

	// const id = data["id"];
	// const name = data["name"];
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
	</div>
	);
}

export default App;
