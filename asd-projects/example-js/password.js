function generatePassword() {
    var length = prompt("How long is your password?"),
        letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%",
        pass = "";
    for (var i = 0, x = letters.length; i < length; i++) {
        pass += letters.charAt(Math.floor(Math.random() * x));
    }
    alert(pass);
    console.log(pass);
}

generatePassword()