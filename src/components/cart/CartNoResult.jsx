import config from '../../utils/config'

function CartNoResult({text = 'Результатів не знайдено', img = 'no-result-v2.png'}) {
	return (
		<span className="no-result no-result--inline">
			<img src={config.pathImgNoResult + img} alt="No results" className="no-result__img" />
			<span className="no-result__title">{text}</span>
		</span>
	)
}


export default CartNoResult;