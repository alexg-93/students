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

  //update all isExported property to true after clicked export
export const updateAll = async (req, res) => {

  Student.updateMany({}, {'$set': {'isExported' : true}}, {multi: true},
   function(error, properties){
})

res.status(201).json({
  message: "updated",
 
});
}
  
export default getStudents;