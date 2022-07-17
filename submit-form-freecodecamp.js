const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    // prevent the form submit from refreshing the page
    event.preventDefault();

    const { senderName, senderEmail, senderDetails, senderLaunchDate, senderBudget } = event.target;

    // Use your API endpoint URL you copied from the previous step
    const endpoint =
        "https://h2tw22mzj7.execute-api.us-west-2.amazonaws.com/default/sendContactEmail";
    // We use JSON.stringify here so the data can be sent as a string via HTTP
    const body = JSON.stringify({
        senderEmail: senderEmail.value,
        senderName: senderName.value,
        senderDetails: senderDetails.value,
        senderLaunchDate: senderLaunchDate.value,
        senderBudget: senderBudget.value
    });
    const requestOptions = {
        method: "POST",
        body
    };

    fetch(endpoint, requestOptions)
        .then((response) => {
            if (!response.ok) throw new Error("Error in fetch");
            return response.json();
        })
        .then((response) => {
            document.getElementById("result-text").innerText =
                "Email sent successfully!";
        })
        .catch((error) => {
            document.getElementById("result-text").innerText =
                "An unkown error occured.";
        });
});