const Post = require('../Models/Post')

module.exports = {
    async createPost(req, res) {
        const {
            picture,
            description
        } = req.body

        const { user } = req.headers

        try {           
            const newPost = await Post.create({
                picture,
                description,
                user
            })            

            return res.status(200).send({
                message: 'Post created successfully',
                data: newPost
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async listAllPosts(req, res) {
        try {
            const allPosts = await Post.find()
                .populate('user')

            return res.status(200).send({
                message: 'All posts',
                data: allPosts
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async deletePost(req, res) {
        const { post_id } = req.params
        const { user_id } = req.headers
        
        try {
            const belongsToUser = await Post.findOne({ user: user_id }).where({ _id: post_id })
            if (!belongsToUser) return res.status(400).send('Operation not allowed')

            const postExists = await Post.findById(post_id)
            if (!postExists) return res.status(400).send('Post does not exist')

            const deletedPost = await Post.findByIdAndDelete(post_id)            

            return res.status(200).send({
                message: 'Deleted successfully',
                data: deletedPost
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async editPost(req, res) {
        const { post_id } = req.params
        const { description } = req.body
        const { user_id } = req.headers

        try {
            const postExists = await Post.findById(post_id)
            if (!postExists) return res.status(400).send('Post does not exist')

            const belongsToUser = await Post.findOne({ user: user_id }).where({ _id: post_id })
            if (!belongsToUser) return res.status(400).send('Operation not allowed')

            const editPost = await Post.findByIdAndUpdate(post_id, {
                description
            }, {
                new: true
            })

            return res.status(200).send({
                message: 'Updated successfully',
                data: editPost
            })
        } catch(err) {
            return res.status(400).send(err)
        }
    }
}