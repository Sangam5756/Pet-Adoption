const mongoose = require('mongoose')

const addpetSchema = mongoose.Schema({
   productId : {
        ref : 'petmodel',
        type : String,
   },
   userId : String,
},{
    timestamps : true
})


const addpet = mongoose.model("addpet",addpetSchema)

export default addpet;