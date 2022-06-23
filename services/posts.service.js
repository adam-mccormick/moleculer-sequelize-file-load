"use strict";
const db = require("moleculer-db");
const SequelizeAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");
const fs = require("fs");

/**
 * We create an instance of Sequelize here so we can
 * add our after connect hook before the db adapter
 * tries to create the connection
 */
const sequelize = new Sequelize("posts", "root", "example", {
	dialect: "mysql",
	dialectOptions: {
		flags: "LOCAL_FILES"
	},
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,

});

module.exports = {
	name: "posts",
	mixins: [db],
	/**
	 * Use the Moleculer Sequelize Adapter and pass our instance
	 * as the only argument
	 */
	adapter: new SequelizeAdapter(sequelize),
	model: {
		name: "post",
		define: {
			title: Sequelize.STRING,
			content: Sequelize.TEXT,
			votes: Sequelize.INTEGER,
			author: Sequelize.INTEGER,
			status: Sequelize.BOOLEAN
		},
		options: {

		}
	},
	settings: {
		fields: ["id", "title", "content", "votes", "status", "updatedAt"]
	},

	/**
	 * Set the connection instance you get from the
	 * after connect hooks as a property of this
	 * service
	 */
	created() {
		sequelize.afterConnect(connection => {
			this.connection = connection;
		});
	},

	/**
	 * Fired after database connection establishing and models, tables
	 * are created. Do our bulk load
	 */
	async afterConnected() {
		try {
			const res = await this.connection.promise().query({
				sql: "LOAD DATA LOCAL INFILE './data.csv' INTO TABLE posts FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY \"\\n\" IGNORE 1 LINES;",
				infileStreamFactory: (name) => {
					return fs.createReadStream(name);
				}
			});
			this.logger.info("BULK LOAD DONE", res);
		}
		catch (err) {
			this.logger.error("BULK LOAD ERROR", err);
			throw err;
		}
	}
};
