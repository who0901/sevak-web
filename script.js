let selectedRating = 0;

function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === "aapkagadha") {
    document.getElementById("login").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.body.classList.remove("login-glow");
    document.body.classList.add("default");
  } else {
    alert("Wrong password MAM😢");
  }
}

function changeMood() {
  const mood = document.getElementById("moodSelector").value;
  let message = "";
  document.body.className = mood || "default"; // change background

  switch (mood) {
    case "happy":
      message = "Yiippppeeee! I'm glad you're happy! 😄 Ghumne chalein?";
      break;
    case "sad":
      message = "Kya hua baby gurl. Call Kre? 🥺";
      break;
    case "excited":
      message = "Celebrate krte h 🎉 Shall we plan a surprise?";
      break;
    case "angry":
      message = "Shant Shant GOlu MOlu 💨 aayenge to keema bana dijyega mera  🤗";
      break;
    default:
      message = "";
  }

  document.getElementById("customMessage").innerText = message;
}

document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-value'));
    highlightStars(selectedRating);
    showThankYouEmoji();
  });
});

function highlightStars(rating) {
  document.querySelectorAll('.star').forEach(star => {
    star.classList.remove('selected');
    if (parseInt(star.getAttribute('data-value')) <= rating) {
      star.classList.add('selected');
    }
  });
}

function showThankYouEmoji() {
  const emoji = document.getElementById("emojiThankYou");
  emoji.style.display = "block";
  emoji.style.animation = "popIn 0.8s ease";
}

function waitForRating() {
  return new Promise((resolve, reject) => {
    const check = setInterval(() => {
      if (selectedRating > 0) {
        clearInterval(check);
        resolve();
      }
    }, 500);
    setTimeout(() => {
      if (selectedRating === 0) {
        clearInterval(check);
        reject("Rating not given");
      }
    }, 10000);
  });
}

function submitOrder() {
  const order = document.getElementById("orderText").value;
  const mood = document.getElementById("moodSelector").value;

  if (!order || !mood) {
    alert("Please choose a mood and write your wish 💭");
    return;
  }

  document.getElementById("thankYou").style.display = "block";
  document.getElementById("rating").style.display = "block";

  waitForRating().then(() => {
    const token = "7914276013:AAGwYibQqOJttLk8ixR3nB_PP-nNiYVpkVs";     
    const chatId = "1228360418";      

    const msg = `💌 New Order Received:
Mood: ${mood}
Request: ${order}
Rating: ${selectedRating} ⭐`;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(msg)}`;

    fetch(url)
      .then(() => {
        alert("Your request was sent to Sevak 💌");
        resetForm();
      })
      .catch(() => alert("Telegram message failed 💔"));
  }).catch(() => {
    alert("Please give a rating before we proceed 🌟");
  });
}

function resetForm() {
  document.getElementById("moodSelector").value = "";
  document.getElementById("orderText").value = "";
  document.getElementById("customMessage").innerText = "";
  document.getElementById("thankYou").style.display = "none";
  document.getElementById("rating").style.display = "none";
  document.getElementById("emojiThankYou").style.display = "none";
  selectedRating = 0;
  highlightStars(0);
  document.body.className = "default";
}

// Enable glow effect on login
document.body.classList.add("login-glow");