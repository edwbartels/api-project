'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'Reviews',
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				// model: { tableName: 'Spots', schema: process.env.SCHEMA },

				spotId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'Spots',
						key: 'id',
					},
					onDelete: 'CASCADE',
				},
				userId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						// model: { tableName: 'Users', schema: process.env.SCHEMA },
						model: 'Users',
						key: 'id',
					},
					onDelete: 'CASCADE',
				},
				review: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				stars: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
			},
			options
		);

		// await queryInterface.addConstraint('Reviews', {
		// 	fields: ['userId', 'spotId'],
		// 	type: 'unique',
		// 	name: 'unique_user_spot',
		// });
	},
	async down(queryInterface, Sequelize) {
		options.tableName = 'Reviews';
		// await Promise.all([
		// 	// queryInterface.removeConstraint('Reviews', 'unique_user_spot'),
		// 	queryInterface.removeConstraint(
		// 		'ReviewImages',
		// 		'ReviewImages_reviewId_fkey'
		// 	),
		// ]);
		await queryInterface.dropTable(options);
	},
};
