exports.apartmentsStatus = (apartment) => {
  if(apartment.isVerified === true && isDeleted === false && isOccupied === false && isEnabled === true){
    return true;
  } else {
    return false;
  }
};