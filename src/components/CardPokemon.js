import { useDispatch } from 'react-redux';
import { OPEN_MODAL } from '../redux/pokeFetch';

const CardPokemon = ({id, name, types, picture}) => {

    const dispatch = useDispatch();

    let cardToUse = "";

    switch(types[0]) {
        case "normal":
            cardToUse = "cardColorNormal";
            break;

        case "fighting":
            cardToUse = "cardColorFight";
            break;

        case "flying":
            cardToUse = "cardColorFlying";
            break;

        case "poison":
            cardToUse = "cardColorPoison";
            break;

        case "ground":
            cardToUse = "cardColorGround";
            break;

        case "rock":
            cardToUse = "cardColorRock";
            break;

        case "bug":
            cardToUse = "cardColorBug";
            break;

        case "ghost":
            cardToUse = "cardColorGhost";
            break;

        case "steel":
            cardToUse = "cardColorSteel";
            break;

        case "fire":
            cardToUse = "cardColorFire";
            break;

        case "water":
            cardToUse = "cardColorWater";
            break;

        case "grass":
            cardToUse = "cardColorGrass";
            break;

        case "electric":
            cardToUse = "cardColorElectric";
            break;

        case "psychic":
            cardToUse = "cardColorPsycic";
            break;

        case "ice":
            cardToUse = "cardColorIce";
            break;

        case "dragon":
            cardToUse = "cardColorDragon";
            break;

        case "dark":
            cardToUse = "cardColorDark";
            break;

        case "fairy":
            cardToUse = "cardColorFairy";
            break;

        case "unknown":
            cardToUse = "cardColorUnkown";
            break;

        case "shadow":
            cardToUse = "cardColorShadow";
            break;

        default:
            cardToUse = "cardColorUnkown";
            break;
      }

    return (
        <div className={cardToUse} onClick={() => dispatch(OPEN_MODAL(id))}>
            <div className="container">
                <div className="id">No:{id}</div>
                <h2 >
                    <div>&nbsp;</div>
                    <div>{name}</div>
                </h2>
            </div>
            <div className="row">
                <div className="col">
                    {types.map((type) => (
                        <div className="typeItem grid" key={type}>{type}</div>
                    ))}
                </div>
                <div className="col">
                    <div className="pictureContainer grid">
                        <div className="background"></div>
                        <div className="picture">
                            <img loading="lazy" src={picture} width="270px" alt={name}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default CardPokemon;