const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://hamidkaamouch123:VR8LPccOXCSSmJLU@cluster0.d207e.mongodb.net/")
.then(()=>console.log('db connected successfully'))
.catch((e)=>console.log(e))


//create user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: {type: Date, default: Date.now}
})

//create user model

const User = mongoose.model("User",userSchema)


async function runQueryExample(){
    try{
        //create new user
        // const newUser = new User({
        //     name: "jhone doe",
        //     email: "jhonedoe@gmail.com",
        //     age: 40,
        //     isActive: true,
        //     tags: ["developer", "web designer","photographer"]
        // })

        // await newUser.save();
        
        //show all users
        const allUsers = await User.find();
        console.log(allUsers);

        //get users of active is false;
        // const getUsersOfActiveFalse = await User.find({isActive: false});
        // console.log(getUsersOfActiveFalse);
 
        //find user and update
        // const userUpdated = await User.findOneAndUpdate({name: "jhone doe"},{email:'jhonedoe1@gmail.com',age: 30});
        // console.log(userUpdated)

        // const userByname = await User.findOne({name: "jhone doe"}).select('-_id name');

        // console.log(userByname)

        // const limitUsers = await User.find({}).limit(2).skip(1);
        // console.log(limitUsers);

        // const sortedUsers = await User.find().sort({age: 1});
        // console.log(sortedUsers);

        // const deleteUser = await User.findOneAndDelete({name: "jhone doe"});
        // console.log(deleteUser);

        // const updateUser = await User.findByIdAndUpdate('6789621327266222b037b834',{name: "hamid oukaamouch", email: "hamid@gmail.com"});
        // console.log(updateUser);

    }catch(err){
        console.log('Error -->', err.message)
    }
}
runQueryExample();

