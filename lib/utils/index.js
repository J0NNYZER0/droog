'use strict'

const Fs = require('fs'),
	Path = require('path'),
	Moment = require('moment'),
	Nodemailer = require('nodemailer'),
	Transporter = () => Nodemailer.createTransport({
		service: process.env.SMTP_SERVICE,
		auth: {
				user: process.env.SMTP_UN,
				pass: process.env.SMTP_PW
		}
	}),
	ParseEmail = (email,token) => {
		let parsed = Fs.readFileSync(Path.join(__dirname, '../email_templates/confirmAccount.html'), 'utf8')

		parsed = parsed.replace(/%%TOKEN%%/, token)
		return parsed
	},
	MailOptions = (email, token) => ({
		from: '"Account Confirmation" <mindctrlindustries@gmail.com>', // sender address
		to: email, // list of receivers
		subject: 'Confirm Your New Account!', // Subject line
		text: 'Hello! You recently created an account with us. Please click the button to verify it. You have 30 minutes. Thanks! <a disabled="" class="button">Verify Your Email</a>', // plain text body
		html: ParseEmail(email,token)
	}),
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
		  ConfirmEmail: (callback, token, email) => new Promise((resolve, reject) => {

		    Nodemailer.createTestAccount((err, account) => {
		      // create reusable transporter object using the default SMTP transport

		      // setup email data with unicode symbols

					if (err) callback(err)
		      // send mail with defined transport object
		      Transporter().sendMail(MailOptions(email, token), (error, info) => {
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
		  })
		}
	}

module.exports = {
	Utils
}
