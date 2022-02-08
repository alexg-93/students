import Student from "../models/studentModel.js";

// @description : fetch all students
// @route :  action --> GET /api/students

const getStudents = async (req, res) => {
 

    const studentsData = await Student.find().select(
      '-__v -createdAt -updatedAt'
    );
    res.json({
      message: "All students",
      studentsData
    });
  
  };
  
export default getStudents;