export interface Jisho {
	meta: Meta;
	data?: DataEntity[] | null;
}
export interface Meta {
	status: number;
}
export interface DataEntity {
	slug: string;
	is_common: boolean;
	tags?: (string | null)[] | null;
	jlpt?: (string | null)[] | null;
	japanese?: JapaneseEntity[] | null;
	senses?: SensesEntity[] | null;
	attribution: Attribution;
}
export interface JapaneseEntity {
	word: string;
	reading: string;
}
export interface SensesEntity {
	english_definitions?: string[] | null;
	parts_of_speech?: (string | null)[] | null;
	links?: null[] | null;
	tags?: (string | null)[] | null;
	restrictions?: (string | null)[] | null;
	see_also?: (string | null)[] | null;
	antonyms?: null[] | null;
	source?: null[] | null;
	info?: (string | null)[] | null;
}
export interface Attribution {
	jmdict: boolean;
	jmnedict: boolean;
	dbpedia: boolean;
}

export interface Kanji {
	symbol: string | null | undefined;
	reading: string | null | undefined;
	sense: string[] | null | undefined;
}

export interface EnglishTranslate {
	english: string[] | null | undefined;
	symbol: string | null | undefined;
	reading: string | null | undefined;
}
