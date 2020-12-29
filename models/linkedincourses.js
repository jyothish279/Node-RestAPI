
var settings = require("../db/settings");

var LinkedinSchema = settings.mongoose.Schema
(
    {
    name: { type: String, required: [true, "name is needed"] },
    price:{type:Number, required:true},
    moq: { type: Number, required: true },
    place: {landmark : String,
             district : String, 
             state :  String,
             pin : Number
    },
    leadTime:{ type: Date, required: true },
    supplierDetails:{Name: String,
                     Phone: Number,
    },
    size: { type: Number, required: true },
    pictures: { type: [String] }
  
    }
);
  
exports.details = settings.mongoose.model("linkedincourses", LinkedinSchema);
  