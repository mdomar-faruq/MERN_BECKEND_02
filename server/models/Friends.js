const mongoose=require('mongoose');
const FriendsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:false
    },
});

//create model
//represent instend collection
const FriendModel = mongoose.model('friends',FriendsSchema);
module.exports=FriendModel;