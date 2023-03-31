import JishoPlugin, { DEFAULT_SETTINGS } from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class SettingTab extends PluginSettingTab {
	plugin: JishoPlugin;

	constructor(app: App, plugin: JishoPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		new Setting(containerEl)
			.setName("CORS Proxy Url")
			.setDesc("Set your CORS url here")
			.addText((text) =>
				text
					.setPlaceholder(DEFAULT_SETTINGS.cors_url)
					.setValue(this.plugin.settings.cors_url)
					.onChange(async (value) => {
						this.plugin.settings.cors_url = value;
						await this.plugin.saveSettings();
					})
			);
		new Setting(containerEl)
			.setName("CORS id")
			.setDesc("enter the id needed with out a trailing /")
			.addText((text) =>
				text
					.setPlaceholder("")
					.setValue(this.plugin.settings.corse_id)
					.onChange(async (value) => {
						this.plugin.settings.corse_id = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
