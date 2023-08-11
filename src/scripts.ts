import axios from "axios";

const form = document.querySelector<HTMLFormElement>('.form');
const submitButton = document.querySelector<HTMLButtonElement>('.submit-button');  

type DataToSend = { [key: string]: unknown };

if (form && submitButton) {  
    form.addEventListener('submit', (e) => {
        e.preventDefault();

       
        submitButton.disabled = true;

        const formData = new FormData(form);
        const finalData: DataToSend = {};

        for (const pair of formData.entries()) {
            finalData[pair[0]] = pair[1];
        }

      
        const requiredFields = ["first-name","last-name","gender", "email", "password"];  
        for (const field of requiredFields) {
            if (!finalData[field]) {
                updateFeedback(`Missing required field: ${field}`);
                submitButton.disabled = false;  
                return;
            }
        }

        axios.post('http://localhost:3004/posts', finalData)
            .then(response => {
                console.log("Data sent successfully", response.data);
                updateFeedback("Registration was successful!");

                form.reset();

            })
            .catch(function (error) {
                console.log(error);
                updateFeedback("Registration failed. Please try again.");
            })
            .finally(() => {
                
                submitButton.disabled = false;
            });
    });
}

function updateFeedback(message: string) {
    const feedbackDiv = document.getElementById("feedback");
    if (feedbackDiv) {
        feedbackDiv.textContent = message;
    }
}
