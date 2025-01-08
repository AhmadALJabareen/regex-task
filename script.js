let formData = document.querySelector("form");

formData.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let date = document.getElementById("date").value;
    let gender = document.getElementById("gender").value;
    let phone = document.getElementById("phone").value;

    let checkInput = document.querySelectorAll('input[name="order"]');
    let selectedOrder = "";
    for (const order of checkInput) {
        if (order.checked) {
            selectedOrder = order.value;
            break;
        }
    }

    let orderInput = document.querySelectorAll('input[name="option"]');
    let selectedOption = "";
    orderInput.forEach((item) => {
        if (item.checked) {
            selectedOption = item.value;
        }
    });




    let nameRegex = /^[a-zA-Z]+([-'\s][a-zA-Z]+)*$/;
    // let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phoneRegex = /^\d{10}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    let dateReg = /^\d{2}-\d{2}-\d{4}$/;


    if (!nameRegex.test(name)) {
        alert("Invalid user name!");
        return;
    }
    // if (!emailRegex.test(email)) {
    //     alert("Invalid email address!");
    //     return;
    // }

    // Validate phone number
    if (!phoneRegex.test(phone)) {
        alert("Invalid phone number. Must be 10 digits.");
        return;
    }
    if (!dateReg.test(date)) {
        alert("Invalid date.");
        return;
    }

    // Validate password
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters, including uppercase, lowercase, a number, and a symbol.");
        return;
    }

    // If all validations pass
    alert("Form submitted successfully!");

    // Clear the form after successful submission
    // document.getElementById("myForm").reset();


    let dataUser = {
        userName: name,
        userPassword: password,
        birthday: date,
        userGender: gender,
        userPhone: phone,
        userOrder: selectedOrder,
        userOption: selectedOption
    };

    localStorage.setItem("user", JSON.stringify(dataUser));

    let x = JSON.parse(localStorage.getItem("user"));

    let customer1 = new Customer(
        x.userName,
        x.userPassword,
        x.birthday,
        x.userGender,
        x.userOrder,
        x.userOption,
        x.userPhone
    );
    customer1.createCard();
})






    

function Customer(fullName, password, date, gender, orderType, orderOption, phoneNumber) {
    this.fullName = fullName;
    this.password = password;
    this.date = date;
    this.gender = gender;
    this.orderType = orderType;
    this.orderOption = orderOption;
    this.phoneNumber = phoneNumber;

    this.createCard = function () {
        let box = document.createElement("div");
        box.classList.add("customer-card");

        box.innerHTML = `
            <h2>${this.fullName}</h2>
            <p><strong>Gender:</strong> ${this.gender}</p>
            <p><strong>Date of Birth:</strong> ${this.date}</p>
            <p><strong>Phone Number:</strong> ${this.phoneNumber}</p>
            <p><strong>Password:</strong> ${this.password}</p>
            <p><strong>Order Type:</strong> ${this.orderType}</p>
            <p><strong>Order Option:</strong> ${this.orderOption}</p>
        `;

        document.body.appendChild(box);
    };
}