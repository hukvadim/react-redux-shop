import Catalog from '../components/Catalog';

export default function Category({ cartState, dispatch }) {

	return <Catalog cartState={cartState} dispatch={dispatch} />;
}