exports.formatDate = (dateObj) => {
  return dateObj.toISOString().split('T')[0];
};
