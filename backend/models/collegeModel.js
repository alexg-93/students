import mongoose from 'mongoose';

const collegeSchema = mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
});

const College = mongoose.model('College', collegeSchema);

export default College;