const API_KEY = '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';

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  appendMessage("bot", "⏳ Mengetik...");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-8b-8192", // atau "llama3-70b-8192" jika ingin lebih pintar
      messages: [
        { role: "system", content: "Kamu adalah asisten chatbot usaha roasting kopi yang bernama Hyngland roastery, sebut saja kamu adalah chatbot HR." },
        { role: "system", content: "Kamu hanya bisa menjawab tentang informasi tentang dunia kopi dan barista." },
        { role: "system", content: "Kamu hanya bisa menjawab maksimal 1 kalimat dan berikan jawaban singkat padat dan langsing pada inti pertanyaan." },
        { role: "system", content: "Ada produk kopi apa saja di highland Roastery?." },
        { role: "system", content: "Berikan informasi mengenai produk kopi yang tersedia di highland Roastery." },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  const botReply = data.choices[0].message.content;
  document.querySelectorAll(".bot-msg").forEach(msg => {
    if (msg.textContent === "⏳ Mengetik...") msg.remove();
  });
  appendMessage("bot", botReply);
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-msg text-end" : "bot-msg text-start";
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
