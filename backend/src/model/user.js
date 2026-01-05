
import mongoose from 'mongoose';

const userSchema  = new mongoose.Schema ({

    userName : {
        type : String,
    },

    access_token : {
        type : String,
    }, 
    
    refresh_token : {
        type : String,
    },

    session_id : {
        type : String,
    }

})

const User = mongoose.model('User', userSchema);

export default User;