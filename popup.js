document.getElementById("runButton").addEventListener("click", async () => {
  const repoUrl = document.getElementById("repoInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!repoUrl.startsWith("https://github.com")) {
    resultDiv.innerHTML = `<p style="color:red;">❌ Invalid GitHub URL.</p>`;
    return;
  }

  resultDiv.innerHTML = "⏳ Running project, please wait...";

  try {
    const response = await fetch("https://your-backend-url.com/api/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ repoUrl })
    });

    const data = await response.json();

    if (data.previewUrl) {
      resultDiv.innerHTML = `
        ✅ <a href="${data.previewUrl}" target="_blank">View Live Preview</a><br/>
        🧠 Stack: ${data.stack.join(", ")}
      `;
    } else {
      resultDiv.innerHTML = `❌ Failed to run repo.`;
    }
  } catch (error) {
    resultDiv.innerHTML = `❌ Error: ${error.message}`;
  }
});
