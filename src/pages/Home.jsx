import Catalog from '../components/Catalog';


export default function Home({ cartState, dispatch }) {

	return <Catalog cartState={cartState} dispatch={dispatch} />;
}


  