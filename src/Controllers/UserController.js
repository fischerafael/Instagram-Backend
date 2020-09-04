const User = require('../Models/User')

module.exports = {
    async createUser(req, res) {
        const { 
            username,
            password,
            name,
            description,
            site,
            avatar
        } = req.body

        try {
            const userAlreadyExists = await User.findOne({
                username
            })
            if (userAlreadyExists) return res.status(400).send({ message: 'User already exists. Try a different one' })

            const createdUser = await User.create({
                username,
                password,
                name,
                description,
                site,
                avatar
            })

            return res.status(200).send({
                message: 'User created successfully',
                data: createdUser
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async listUser(req, res) {
        try {
            const allUsers = await User.find()

            return res.status(200).send({
                message: 'All users found',
                data: allUsers
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}