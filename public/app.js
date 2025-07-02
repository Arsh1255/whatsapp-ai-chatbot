// const chatBox = document.getElementById("chat-box");
// let lastMessages = [];

// function updateChat() {
//   fetch("/chat")
//     .then(res => res.json())
//     .then(messages => {
//       if (JSON.stringify(messages) === JSON.stringify(lastMessages)) return;

//       messages.slice(lastMessages.length).forEach(msg => {
//         const wrapper = document.createElement('div');
//         wrapper.className = `message ${msg.from}`;

//         const bubble = document.createElement('div');
//         bubble.className = 'bubble';
//         bubble.textContent = msg.text;

//         wrapper.appendChild(bubble);
//         chatBox.appendChild(wrapper);
//       });

//       lastMessages = messages;
//       chatBox.scrollTop = chatBox.scrollHeight;
//     });
// }

// setInterval(updateChat, 1000);

const chatBox = document.getElementById("chat-box");
let lastMessages = [];
let typingShown = false;

function updateChat() {
  fetch("/chat")
    .then(res => res.json())
    .then(messages => {
      if (JSON.stringify(messages) === JSON.stringify(lastMessages)) {
        // Show typing only if it's not already shown
        if (!typingShown) {
          showTyping();
        }
        return;
      }

      removeTyping(); // Remove if new message is available

      messages.slice(lastMessages.length).forEach(msg => {
        const wrapper = document.createElement('div');
        wrapper.className = `message ${msg.from}`;

        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = msg.text;

        wrapper.appendChild(bubble);
        chatBox.appendChild(wrapper);
      });

      lastMessages = messages;
      chatBox.scrollTop = chatBox.scrollHeight;
    });
}

function showTyping() {
  typingShown = true;

  const typing = document.createElement("div");
  typing.className = "message bot typing-indicator";
  typing.innerHTML = `
    <div class="bubble">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  `;
  typing.setAttribute("id", "typing");

  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) {
    typing.remove();
    typingShown = false;
  }
}

setInterval(updateChat, 1000);
