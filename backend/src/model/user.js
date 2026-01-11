
import mongoose from 'mongoose';

const userSchema  = new mongoose.Schema ({

    userId : {
        type : String,
        unique : true,
    },

    userName : {
        type : String,
    },

    refresh_token : {
        type : String,
    },

})

const User = mongoose.model('User', userSchema);

export default User;