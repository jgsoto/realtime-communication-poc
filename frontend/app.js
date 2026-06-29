const form = document.getElementById("registerForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };

    try {

        const response = await fetch(
            "http://localhost:3000/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        const data = await response.json();

        result.innerHTML =
            `✅ ${data.message}`;

        form.reset();

    } catch (error) {

        result.innerHTML =
            "❌ Error connecting to the server";

        console.error(error);
    }
});