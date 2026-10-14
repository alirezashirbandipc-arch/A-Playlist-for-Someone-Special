async function deleteMedia() {
  if (!isAdmin) {
    alert("ابتدا وارد مدیریت شو");
    return;
  }

  const items = await databaseAction("readonly", store => store.getAll());
  const media = items.filter(item =>
    item.type.startsWith("image/") || item.type.startsWith("video/")
  );

  if (!media.length) {
    alert("موردی برای حذف وجود ندارد");
    return;
  }

  const answer = prompt(
    "شماره عکس یا فیلم برای حذف:\n" +
    media.map((item, i) => ${i + 1}. ${item.name}).join("\n")
  );

  if (answer === null) return;

  const index = Number(answer) - 1;

  if (!Number.isInteger(index)  index < 0  index >= media.length) {
    alert("شماره نامعتبر است");
    return;
  }

  await databaseAction("readwrite", store => store.delete(media[index].id));
  await renderGallery();

  const frame = document.getElementById("mediaFrame");
  frame.replaceChildren();

  const placeholder = document.createElement("div");
  placeholder.className = "placeholder";
  placeholder.textContent = "یک عکس یا فیلم انتخاب کن";
  frame.appendChild(placeholder);

  alert("حذف شد");
}

async function saveAudio() {
  if (!isAdmin) {
    alert("ابتدا وارد مدیریت شو");
    return;
  }

  const input = document.getElementById("audioInput");
  const file = input.files[0];

  if (!file || !file.type.startsWith("audio/")) {
    alert("یک فایل صوتی انتخاب کن");
    return;
  }

  try {
    const items = await databaseAction("readonly", store => store.getAll());

    if (items.filter(item => item.type.startsWith("audio/")).length >= 100) {
      alert("ظرفیت صوت تکمیل شده است");
      return;
    }

    await databaseAction("readwrite", store =>
      store.add({
        name: file.name,
        type: file.type,
        data: file
      })
    );

    input.value = "";
    await renderAudio();
    alert("صوت ثبت شد");
  } catch (error) {
    alert("ذخیره صوت انجام نشد");
    console.error(error);
  }
}

async function renderAudio() {
  const gallery = document.getElementById("audioGallery");
  gallery.replaceChildren();

  const items = await databaseAction("readonly", store => store.getAll());
  audioItems = items.filter(item => item.type.startsWith("audio/"));

  audioItems.forEach(item => {
    const row = document.createElement("div");
    row.className = "media-item";

    const title = document.createElement("p");
    title.textContent = item.name;

    const player = document.createElement("audio");
    player.controls = true;
    player.src = URL.createObjectURL(item.data);

    row.append(title, player);

    if (isAdmin) {
      const button = document.createElement("button");
      button.className = "delete";
      button.textContent = "حذف صوت";
      button.onclick = async () => {
        await databaseAction("readwrite", store => store.delete(item.id));
        renderAudio();
      };
      row.appendChild(button);
    }

    gallery.appendChild(row);
  });
}

async function saveText() {
  if (!isAdmin) {
    alert("ابتدا وارد مدیریت شو");
    return;
  }

  const input = document.getElementById("textInput");
  const text = input.value.trim();

  if (!text) {
    alert("ابتدا متن بنویس");
    return;
  }

  try {
    const items = await databaseAction("readonly", store => store.getAll());
    if (items.filter(item => item.type === "text/plain").length >= 100) {
      alert("ظرفیت متن تکمیل شده است");
      return;
    }

    await databaseAction("readwrite", store =>
      store.add({
        name: "متن",
        type: "text/plain",
        data: text
      })
    );

    input.value = "";
    await renderTexts();
    alert("متن ثبت شد");
  } catch (error) {
    alert("ذخیره متن انجام نشد");
    console.error(error);
  }
}

async function renderTexts() {
  const gallery = document.getElementById("textGallery");
  gallery.replaceChildren();

  const items = await databaseAction("readonly", store => store.getAll());
  textItems = items.filter(item => item.type === "text/plain");

  textItems.forEach(item => {
    const row = document.createElement("div");
    row.className = "media-item";
