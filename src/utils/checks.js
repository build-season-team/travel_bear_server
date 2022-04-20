
exports.userRole = (role) => {
  if(role === "user"){
    return "user";
  }
  if(role === "landlord"){
    return "landlord";
  }
  if(role === "admin"){
    return "admin";
  }
};

exports.apartmentsStatus = (apartment) => {
  if(apartment.isVerified === true && isDeleted === false && isOccupied === false && isEnabled === true){
    return true;
  }
};