function renderSettings() {
  const musicSection = $("musicSection");
  const emotionSection = $("emotionSection");

  if (musicSection) {
    musicSection.hidden = !settings.music;
  }

  if (emotionSection) {
    emotionSection.hidden = !settings.emotion;
  }

  const musicToggle = $("musicEnabled");
  const emotionToggle = $("emotionEnabled");

  if (musicToggle) musicToggle.checked = settings.music;
  if (emotionToggle) emotionToggle.checked = settings.emotion;

  const empty = $("emptyMessage");

  if (empty) {
    empty.hidden =
      (settings.music && songs.length > 0) ||
      (settings.emotion && emotions.length > 0);
  }
}

function renderAll() {
  renderSongs();
  renderEmotions();
  renderSettings();
}

function setupAdmin() {
  const loginForm = $("loginForm");

  loginForm.addEventListener("submit", event => {
    event.preventDefault();

    /*
      ورود این نسخه فقط نمایشی است.
      اطلاعات ورود واقعی را در فایل عمومی قرار نده.
    */

    const username = $("username").value.trim();
    const password = $("password").value;

    if (
      username === "Alireeza" &&
      password === "ChangeMe-123!"
    ) {
      isAdmin = true;
      $("loginSection").hidden = true;
      $("adminContent").hidden = false;
      $("loginMessage").textContent = "";

      renderAll();
    } else {
      $("loginMessage").textContent =
        "نام کاربری یا رمز عبور اشتباه است.";
    }
  });

  $("musicForm").addEventListener("submit", event => {
    event.preventDefault();
    if (!isAdmin) return;

    songs.push({
      title: $("songTitle").value.trim(),
      artist: $("artist").value.trim(),
      url: $("songUrl").value.trim(),
      cover: $("coverUrl").value.trim()
    });

    saveData();
    renderAll();
    event.target.reset();
  });

  $("emotionForm").addEventListener("submit", event => {
    event.preventDefault();
    if (!isAdmin) return;

    emotions.push({
      title: $("emotionTitle").value.trim(),
      text: $("emotionText").value.trim(),
      image: $("emotionImage").value.trim(),
      video: $("emotionVideo").value.trim(),
      audio: $("emotionAudio").value.trim(),
      song: $("emotionSong").value.trim()
    });

    saveData();
    renderAll();
    event.target.reset();
  });

  $("musicEnabled").addEventListener("change", event => {
    if (!isAdmin) return;

    settings.music = event.target.checked;
    saveData();
    renderSettings();
  });

  $("emotionEnabled").addEventListener("change", event => {
    if (!isAdmin) return;

    settings.emotion = event.target.checked;
    saveData();
    renderSettings();
  });

  $("logoutButton").addEventListener("click", () => {
    isAdmin = false;
    $("adminContent").hidden = true;
    $("loginSection").hidden = false;
    $("loginForm").reset();
  });
}

renderAll();

if (document.body.dataset.page === "admin") {
  setupAdmin();
}
