emotionalList.appendChild(card);
  });
}

function renderSettings() {
  $("section1").hidden = !settings.music;
  $("section2").hidden = !settings.emotional;

  $("toggleMusic").checked = settings.music;
  $("toggleEmotional").checked = settings.emotional;
}

function renderAll() {
  renderSongs();
  renderContents();
  renderSettings();
}

$("loginBtn").addEventListener("click", () => {
  $("loginMessage").textContent = "";
  loginDialog.showModal();
});

$("closeLogin").addEventListener("click", () => {
  loginDialog.close();
});

$("loginForm").addEventListener("submit", event => {
  event.preventDefault();

  /*
    این ورود فقط نمونه آزمایشی است.
    برای سایت واقعی، ورود باید در سرور بررسی شود.
  */

  const username = $("username").value.trim();
  const password = $("password").value;

  if (username === "Alireeza" && password === "ChangeMe-123!") {
    isAdmin = true;
    adminPanel.hidden = false;
    loginDialog.close();
    renderAll();
  } else {
    $("loginMessage").textContent = "نام کاربری یا رمز اشتباه است.";
  }
});

$("logoutBtn").addEventListener("click", () => {
  isAdmin = false;
  adminPanel.hidden = true;
  renderAll();
});

$("toggleMusic").addEventListener("change", event => {
  if (!isAdmin) return;

  settings.music = event.target.checked;
  saveData();
  renderSettings();
});

$("toggleEmotional").addEventListener("change", event => {
  if (!isAdmin) return;

  settings.emotional = event.target.checked;
  saveData();
  renderSettings();
});

$("musicForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!isAdmin) return;

  songs.push({
    title: $("songTitle").value.trim(),
    artist: $("artistName").value.trim(),
    url: $("songUrl").value.trim(),
    cover: $("coverUrl").value.trim()
  });

  saveData();
  renderSongs();
  event.target.reset();
});

$("emotionalForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!isAdmin) return;

  contents.push({
    title: $("contentTitle").value.trim(),
    text: $("contentText").value.trim(),
    image: $("imageUrl").value.trim(),
    video: $("videoUrl").value.trim(),
    voice: $("voiceUrl").value.trim(),
    song: $("contentSongUrl").value.trim()
  });

  saveData();
  renderContents();
  event.target.reset();
});

renderAll();
