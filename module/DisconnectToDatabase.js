import mongoose from 'mongoose'

const DisconnectToDatabase = () => {
    mongoose.connection.close()
}

export default DisconnectToDatabase