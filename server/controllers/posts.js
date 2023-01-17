import Post from "../models/Post.js"
import User from "../models/User.js";

//CREATE
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        // console.log('Creating a new post Disabled. In controllers/posts.js')
        await newPost.save();

        const post = await Post.find();//getting all posts to send to frondend 
        res.status(201).json(post)

    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}


//READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();//getting all posts to send to frondend 
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });//getting all users posts to send to frondend 
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
};


//UPDATE
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);//getting all users posts to send to frondend 
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        // console.log('Updating posts Disabled. In controllers/posts.js')
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )

        res.status(200).json(updatedPost); //Updating frondend when liked button was clicked
    } catch (err) {
        res.status(404).json({ message: err.message })
    }

};