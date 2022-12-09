const crypto = require('crypto');
exports.randomNumber = function (length) {
    var text = "";
    var possible = "123456789";
    for (var i = 0; i < length; i++) {
        var sup = Math.floor(Math.random() * possible.length);
        text += i > 0 && sup == i ? "0" : possible.charAt(sup);
    }
    return Number(text);
};

const generatePassword = () =>{
    return (Math.random().toString(36).slice(5) + 
    Math.random().toString(36)
        .toUpperCase().slice(5));
}

exports.randomPassword = generatePassword;
// var generatePassword = (
//     length = 20,
//     wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
//   ) =>
//     Array.from(crypto.getRandomValues(new Uint32Array(length)))
//       .map((x) => wishlist[x % wishlist.length])
//       .join('')
  
//   console.log(generatePassword())