"use strict";

const [form] = document.forms;
console.log(form);

form.addEventListener("submit", async e => {
    await e.preventDefault();

    const body = Object.fromEntries( new FormData(form).entries() );
    console.log(body);
    const response = await fetch("?method=post", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log(json);

    document.getElementById("isFree").innerHTML = json.nickname.isFree ? "free" : "not free";
    document.getElementById("lengthOk").innerHTML = json.password.lengthOk ? "✅" : "❌";
    document.getElementById("doesMatch").innerHTML = json.password.doesMatch ? "✅" : " ❌ ";
});