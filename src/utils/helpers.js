//Test
const isValidEmail = email => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

const isValidPassword = password => {
    // Password validation criteria
    // Add your own password validation logic here
    return password.length >= 8;
};

const isValidString = value => {
    if (value === '') {
      return false;
    }
    return true;
};

function formatCurrency(number) {
  if (typeof number !== 'undefined' && number !== null) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return "0"; 
  }
}

function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('.').toString();
}
function formatSoldQuantity(quantityStr) {
    const quantity = parseInt(quantityStr, 10);
  
    if (isNaN(quantity)) {
      throw new Error("Invalid input: not a number");
    }
  
    if (quantity >= 1000) {
      const formattedQuantity = (quantity / 1000).toFixed(1).replace(/\.0$/, '');
      return `${formattedQuantity}k`;
    }
    
    return quantityStr;
  }
const avatarDefault = 'https://firebasestorage.googleapis.com/v0/b/shoppingapp-ada07.appspot.com/o/images%2Fusers%2FuserCustomer.png?alt=media&token=16225e3a-c284-4a14-bdc6-710ae891f34b';
export { isValidEmail, isValidPassword, isValidString, avatarDefault, formatSoldQuantity, formatCurrency, formatDate };