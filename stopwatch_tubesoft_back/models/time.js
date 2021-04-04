'use strict';

module.exports = (sequelize, DataTypes) => {
	const Time = sequelize.define(
		'Time',
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			time: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{}
	);
	return Time;
};
