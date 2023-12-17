const validatePhoneNumber = (phone) => {
    const isNum = /^\d+$/.test(phone);

    return isNum && phone.length === 10
}

const onRegisterHandler = () => {
    const email = document.getElementById("email").value
    console.log("email: ", email)

    if(email.length === 0){
        window.alert("Email cannot be empty!")
    }

    const fullname = document.getElementById("name").value
    console.log("fullname: ", fullname)

    if(fullname.length === 0){
        window.alert("Fullname cannot be empty!")
    }

    const pass = document.getElementById("pass").value
    console.log("pass: ", pass)
    
    
    if(pass.length === 0){
        window.alert("Password cannot be empty!")
    }

    const city = document.getElementById("city").value
    console.log("city: ", city)

    const phone = document.getElementById("phone").value
    console.log("phone: ", phone)

    
    // Validate phone is 10 digits long
    const isPhoneNumberValid = validatePhoneNumber(phone)
    if(phone.length === 0){
        window.alert("Phone number cannot be empty!")
    }
    if(!isPhoneNumberValid && phone.length > 0){
        window.alert("Phone number should contain only 10 digits.")
        phone.value=""
    }
    }
    
    