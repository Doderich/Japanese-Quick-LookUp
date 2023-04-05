const { JishoPlugin, DEFAULT_SETTINGS } = require("main");
const { App, PluginSettingTab, Setting } = require("obsidian");

export class SettingTab extends PluginSettingTab {
	plugin;

	constructor(app: any, plugin: any) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		new Setting(containerEl)
			.setName("CORS Proxy Url")
			.setDesc("Set your CORS url here")
			.addText((text: any) =>
				text
					.setPlaceholder(DEFAULT_SETTINGS.cors_url)
					.setValue(this.plugin.settings.cors_url)
					.onChange(async (value: any) => {
						this.plugin.settings.cors_url = value;
						await this.plugin.saveSettings();
					})
			);
		new Setting(containerEl)
			.setName("CORS id")
			.setDesc("enter the id needed with out a trailing /")
			.addText((text: any) =>
				text
					.setPlaceholder("")
					.setValue(this.plugin.settings.corse_id)
					.onChange(async (value: any) => {
						this.plugin.settings.corse_id = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
