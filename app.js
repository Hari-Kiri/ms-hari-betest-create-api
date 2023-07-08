import express from 'express'
import connectToDatabase from './module/ConnectToDatabase.js'
import UserDataModel from './model/UserData.js'
import { model } from 'mongoose'
import DeleteModel from './module/DeleteModel.js'
import DisconnectToDatabase from './module/DisconnectToDatabase.js'

const app = express()

app.use(express.json())

app.post('/create', (request, response) => {

	connectToDatabase(process.env.DATABASE_CONNECTION_URL)

	const hrTime = process.hrtime()
	const userDataModel = model("userdata", UserDataModel())
	const newData = new userDataModel({
		id: new Date().getTime(),
		username: request.body.username,
		accountNumber: hrTime[0],
		emailAddress: request.body.emailAddress,
		identityNumber: hrTime[1]
	})
	newData.save().then(() => {
		response.writeHead(200, {'Content-Type': 'application/json'}).end(JSON.stringify({
			code: 200,
			response: true,
			message: "ok"
		}))
		console.log("save new data success")
	}).catch((error) => {
		response.writeHead(500, {'Content-Type': 'application/json'}).end(JSON.stringify({
			code: 500,
			response: false,
			message: "failed save new data"
		}))
		console.error(`save new data failed: ${error}`)
	}).finally(() => {
		DeleteModel("userdata")
		DisconnectToDatabase()
		console.log("database disconnected and connection model deleted")
	})
	
})

app.listen(process.env.HTTP_PORT, () => {
	console.log(`Example app listening on port ${process.env.HTTP_PORT}`)
})