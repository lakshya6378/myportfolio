 
var typed = new Typed(".text",{
    strings:["React " , "Javascript" , "NodeJs"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true

})


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar");
hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-item").forEach(n => n.addEventListener("click",()=>{
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

 function sendEmail(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let subject = document.getElementById("subject").value;
    let finalmessage = `Name : ${name} <br>  Email : ${email} <br> Subject:${subject} Message : ${message} <br>`;
    let form=document.querySelector('form');
    Email.send({
        SecureToken : "5fbe1300-225f-44f3-9af2-44669e99d6e1",
        To : 'agarwallakshya99@gmail.com',
        From : "agarwallakshya99@gmail.com",
        Subject : "portfolio mail submissions",
        Body : finalmessage
    }).then(
      () =>{ alert(`form submitted successfully`)
       form.reset();
       }
    );
}

const submitbutton=document.querySelector('.send');
submitbutton.addEventListener('click',(e)=>{
    sendEmail(e);
})