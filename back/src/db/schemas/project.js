const mongoose = require('mongoose');


// Define the Project schema
const projectSchema = new mongoose.Schema({
  userId: {//<--userID from user Schema
    /*
    type: Schema.Types.ObjectId,
    ref: 'User',
    */
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    default: ''
  },
  startDate: {
    type: String,
    match: /^\d{4}-\d{2}-\d{2}$/
  },
  endDate: {
    type: String,
    match: /^\d{4}-\d{2}-\d{2}$/
  },
  description: {
    type:String
  }
});


// Create the Project model
const ProjectModel = mongoose.model('Project', projectSchema);

// Export the Project model
module.exports = ProjectModel;