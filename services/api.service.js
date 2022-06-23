"use strict";

const web = require("moleculer-web");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "api",
	mixins:[web],

	/**
	 * Settings
	 */
	settings: {
		routes:[{
			path: "/api",
			whitelist:"**",
			autoAliases: true
		}]
	},
};
