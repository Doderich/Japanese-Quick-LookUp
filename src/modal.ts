import { EnglishTranslate, Kanji } from "src/Jisho";
import { App, Modal } from "obsidian";

export class ExplanationModalJapanese extends Modal {
	searchedChar: string;
	results: Kanji[];
	constructor(app: App, searchedChareter: string, res: Kanji[]) {
		super(app);
		this.searchedChar = searchedChareter;
		this.results = res;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.createEl("h1", {
			text: `Whats this ${this.searchedChar}?`,
		});

		this.results.forEach((kanji) => {
			contentEl.createEl("div");
			contentEl.createEl("h3", { text: kanji.symbol });
			contentEl.createEl("p", { text: kanji.reading });
			contentEl.createEl("p", { text: kanji.sense.toString() });
		});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

export class ExplanationModalEnglish extends Modal {
	searchedChar: string;
	results: EnglishTranslate[];
	constructor(app: App, searchedChareter: string, res: EnglishTranslate[]) {
		super(app);
		this.searchedChar = searchedChareter;
		this.results = res;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.createEl("h1", {
			text: `Whats this ${this.searchedChar} in Japanese?`,
		});

		this.results.forEach((kanji) => {
			contentEl.createEl("div");
			contentEl.createEl("h3", { text: this.searchedChar });
			contentEl.createEl("p", { text: kanji.symbol });
			contentEl.createEl("p", { text: kanji.reading });
		});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
