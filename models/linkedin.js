

var settings = require('../db/settings')


var LinkedinSchema = settings.mongoose.Schema(
    {
        /** No schema defined for hotels - Student may do it themselves */
    },
    /** remove the following if you define the schema */
    { strict: false }
);

// Export the model
exports.Users = settings.mongoose.model('linkedin', LinkedinSchema' )
  