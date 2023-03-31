import { Editor, Plugin } from "obsidian";
import { ExplanationModalEnglish, ExplanationModalJapanese } from "./src/modal";
import { EnglishTranslate, Jisho, Kanji } from "src/Jisho";
import { SettingTab } from "src/settings";

const JISHO_URL = "https://jisho.org/api/v1/search/words?keyword=";

// Regex to look for Japaneses Chars
const regex =
	/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;

interface PluginSettings {
	cors_url: string;
	corse_id: string;
}

// eslint-disable-next-line prefer-const
export let DEFAULT_SETTINGS: Partial<PluginSettings> = {
	cors_url: "https://justcors.com/",
	corse_id: "tl_1823fe6",
};
export default class JishoPlugin extends Plugin {
	settings: PluginSettings;

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}
	async saveSettings() {
		await this.saveData(this.settings);
	}
	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SettingTab(this.app, this));

		this.addCommand({
			id: "whats-this-kanji",
			name: "Whats this Kanji",
			hotkeys: [{ modifiers: ["Shift"], key: "s" }],
			editorCallback: async (editor: Editor) => {
				const selectedText = editor.getSelection();
				const url =
					this.settings.cors_url + this.settings.corse_id + "/";
				const res: Jisho = await getDataJisho(url, selectedText);
				if (regex.test(selectedText)) {
					new ExplanationModalJapanese(
						this.app,
						selectedText,
						formatForJapanesetoEnglish(res)
					).open();
				} else {
					new ExplanationModalEnglish(
						this.app,
						selectedText,
						formatForEnglishtoJapanese(res)
					).open();
				}
			},
		});
	}
}

async function getDataJisho(corsUrl: string, query: string): Promise<Jisho> {
	return await fetch(corsUrl + JISHO_URL + query).then((response) =>
		response.json()
	);
}

function formatForJapanesetoEnglish(jisho: Jisho): Kanji[] {
	const returnArr: Kanji[] = [];
	jisho.data?.forEach((elm) => {
		returnArr.push({
			symbol: elm.japanese[0].word,
			reading: elm.japanese[0].reading,
			sense: elm.senses[0].english_definitions,
		});
	});
	return returnArr;
}

function formatForEnglishtoJapanese(jisho: Jisho): EnglishTranslate[] {
	const returnArr: EnglishTranslate[] = [];
	jisho.data?.forEach((elm) => {
		returnArr.push({
			symbol: elm.japanese[0].word,
			reading: elm.japanese[0].reading,
			english: elm.senses[0].english_definitions,
		});
	});
	return returnArr;
}
