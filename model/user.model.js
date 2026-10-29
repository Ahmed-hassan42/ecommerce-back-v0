const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    name:String,
    password:String,
    email:{type:String, unique:true,required:true},
    phoneNumber:String,
    adress:[String],
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
})

userSchema.pre('save', async function () {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    
});

userSchema.methods.isCorrectPassword= async function (inputPassword) {
    return await bcrypt.compare(inputPassword,this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;