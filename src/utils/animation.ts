export const delayFrame = async (time: number) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(0);
		}, time);
	});
};
