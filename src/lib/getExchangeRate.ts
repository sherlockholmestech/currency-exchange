export async function getExchangeRate(base, target) {
	await fetch(`https://hexarate.paikama.co/api/rates/latest/${base}?target=${target}`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			let rate = {
				mid: data.data.mid,
				unit: data.data.unit,
			}
			console.log(rate);
			return rate;
		}).catch((error) => {
			console.error('Error:', error);
		});
}