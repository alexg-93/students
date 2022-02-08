

import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    idNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLen: 9,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    homeTelNumber: {
      type: String,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    bornDate: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    aliyahDate: {
      type: Date,
    },
    nation: {
      type: String,
      required: true,
    },
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'College',
    },
    isExported: {
      type:Boolean,
      default: false
    }
  
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student' ,studentSchema);

export default Student;