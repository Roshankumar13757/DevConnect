const validator = require('validator');

const validateSignUpData=(req)=>{
    const{firstName,emailId,password}=req.body;
    if(!firstName.length>1){
        throw new Error("Name Not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Please Enter a valid email address");

    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Your password is not Strong");
    }

};
const validateEditProfileData=(req)=>{
    const allowedEditFields=["skills","about","photoUrl","gender","age","password","lastName","middleName","firstName"];
        
    const isUpdateAllowed=Object.keys(req.body).every((k)=>allowedEditFields.includes(k));
    return isUpdateAllowed;
    
 

};
module.exports={
    validateSignUpData,
    validateEditProfileData,
}




