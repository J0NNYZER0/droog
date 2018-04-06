'use strict'

const Fs = require('fs'),
	Path = require('path'),
	Moment = require('moment'),
	Nodemailer = require('nodemailer'),
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
		CreateTimestamp: () => Moment().format('YYYY-MM-DD hh:mm:ss'),
		ReadData: (path, callback) => {

			return Fs.readFile(
				Path.join(__dirname, path), (err, data) => {

					if (err) {
						callback(err)
					}
					else {
						callback(null, JSON.parse(data))
					}
				})
		},
		Email: {
		  ConfirmEmail: (callback, email) => {

		    Nodemailer.createTestAccount((err, account) => {
		      // create reusable transporter object using the default SMTP transport

		      let transporter = Nodemailer.createTransport({
	          host: 'smtp.ethereal.email',
	          port: 587,
	          secure: false, // true for 465, false for other ports
	          auth: {
              user: process.env.ETHEREAL_UN, // generated ethereal user
              pass: process.env.ETHEREAL_PW // generated ethereal password
	          }
		      })

					transporter = Nodemailer.createTransport({
						service: process.env.SMTP_SERVICE,
						auth: {
				        user: process.env.SMTP_UN,
				        pass: process.env.SMTP_PW
				    }
					})

		      // setup email data with unicode symbols
		      let mailOptions = {
	          from: '"Hello from Mind Ctrl" <mindctrlindustries@gmail.com>', // sender address
	          to: email, // list of receivers
	          subject: 'Confirm Your New Account!', // Subject line
	          text: 'Hello world?', // plain text body
	          html: Fs.readFileSync(Path.join(__dirname, '../email_templates/confirmAccount.html'), 'utf8')
		      }

					if (err) callback(err)
		      // send mail with defined transport object
		      transporter.sendMail(mailOptions, (error, info) => {
	          if (error) {
              console.log(error)
							return callback(error)
	          }
	          console.log('Message sent: %s', info.messageId)
	          // Preview only available when sending through an Ethereal account
	          console.log('Preview URL: %s', Nodemailer.getTestMessageUrl(info))
						callback(null, 'Message sent: %s', info.messageId)

	          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
		      })
		    })
		  }
		}
	}

module.exports = {
	Utils
}
