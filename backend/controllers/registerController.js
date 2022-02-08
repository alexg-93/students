import Student from "../models/studentModel.js";
import College from '../models/collegeModel.js'



const state = false;
const init = async () => {

  const name = 'אורט סינגלובסקי';
  const address = 'דרך הטייסים 28, תל אביב יפו';
  const newCollege = new College({ name, address });
   
  try {
    const existingCollege = await College.findOne({name})
    if(existingCollege){
        console.log('College already exisiting!')
    }else{
        await newCollege.save(); 
    }
  
  } catch (error) {
    console.log(error);
  }
};



if (state) {
  init();
} else {
  College.findOne({}).then(college =>{
   //console.log(college)
  });
}


const registerStudent = async (req, res) => {
   
   const {
        idNumber,
        firstName,
        lastName,
        mobileNumber,
        homeTelNumber,
        nation,
        gender, 
        email,
        bornDate,
        aliyahDate,
        country,
        college_id
       } = req.body;
       const studentExist = await Student.findOne({idNumber});
     
       //check if college exisit
       const existingCollege = await College.findOne({college_id})
      

       //check if student already registered in database
       if (studentExist) {
         res.status(400).json({
           message: "סטודנט עם תז זו קיים במערכת",
         });
       } else {
         //create new brand to database
         const newStudent = await Student.create({
           // student: req.student._id,
           idNumber,
           firstName,
           lastName,
           mobileNumber,
           homeTelNumber,
           nation,
           gender, 
           email,
           bornDate,
           aliyahDate,
           country,
           college_id:existingCollege?._id
          
         });
     
         //check if new brand is created
         if (newStudent) {
           const createdStudent = await newStudent.save();
           res.status(201).json({
             message: "סטודנט חדש נוצר בהצלחה",
             student: createdStudent,
           });
         } else {
           res.status(400).json({
             message: "מידע לא תקין",
           });
         }
       }
  };



export default registerStudent