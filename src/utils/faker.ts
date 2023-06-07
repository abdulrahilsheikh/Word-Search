import { faker } from "@faker-js/faker";

export interface FakeData {
	[key: string]: string;
}
export const generateList = (): string[] => {
	const getFirstWord = (word: string) => word.split(" ")[0].toUpperCase();
	const ref: any = {
		0: getFirstWord(faker.animal.cetacean()),
		1: getFirstWord(faker.word.adjective()),
		2: getFirstWord(faker.word.adverb()),
		3: getFirstWord(faker.word.conjunction()),
		4: getFirstWord(faker.word.interjection()),
		5: getFirstWord(faker.word.noun()),
		6: getFirstWord(faker.word.preposition()),
		7: getFirstWord(faker.word.sample()),
		8: getFirstWord(faker.word.words()),
		9: getFirstWord(faker.word.verb()),
	};

	const idx = new Set();
	for (let i = 0; i < faker.number.int({ min: 3, max: 12 }); i++) {
		idx.add(faker.number.int({ min: 0, max: 9 }));
	}
	const list = [...idx.values()]
		.map((i: any) => ref[i])
		.filter((i) => i.length <= 12);
	return list;
};

export const generateWords = () => {
	return generateList();
};
