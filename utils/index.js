'use strict'

const Fs = require('fs'),
	Path = require('path'),
	Utils = {
		CreateHumanReadableDate: () => {
			const today = new Date(),
				year = today.getFullYear(),
				month = today.getMonth(),
				day = today.getDate(),
				hour = today.getHours(),
				minute = today.getMinutes(),
				second = today.getSeconds(),
				date = new Date(Date.UTC(year, month, day, hour, minute, second)).toString()

			return date
		},
		ReadData: (path, callback) => {
			const file = Fs.readFile(Path.join(__dirname, path), (err, data) => {
				if (err) {
					callback(err)
				}
				else {
					callback(null, JSON.parse(data))
				}
			})
		}
	}

module.exports = {
	Utils
}
