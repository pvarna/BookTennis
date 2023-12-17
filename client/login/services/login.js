const onLoginHandler = () => {
const email = document.getElementById("email").value
console.log("email: ", email)

const pass = document.getElementById("pass").value
console.log("pass: ", pass)

if(email.length === 0){
    window.alert("Email cannot be empty!")
}

    
if(pass.length === 0){
    window.alert("Password cannot be empty!")
}

}

