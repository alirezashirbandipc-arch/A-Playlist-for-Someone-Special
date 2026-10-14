async function deleteMedia() {
  if (!isAdmin) {
    alert("ابتدا وارد مدیریت شو");
    return;
  }

  try {
    const items = await databaseAction(
      "readonly",
      store => store.getAll()
    );

    const media = items.filter(item =>
      item.type &&
      (
        item.type.startsWith("image/") ||
        item.type.startsWith("video/")
      )
    );

    if (media.length === 0) {
      alert("موردی برای حذف وجود ندارد");
      return;
    }

    const answer = prompt(
      "شماره عکس یا فیلم برای حذف:\n" +
      media.map((item, i) => ${i + 1}. ${item.name}).join("\n")
    );

    if (answer === null || answer.trim() === "") {
      return;
    }

    const index = Number(answer) - 1;

    if (
      !Number.isInteger(Number(answer)) ||
      index < 0 ||
      index >= media.length
    ) {
      alert("شماره نامعتبر است");
      return;
    }

    await databaseAction(
      "readwrite",
      store => store.delete(media[index].id)
    );

    await renderGallery();

    const frame = document.getElementById("mediaFrame");

    if (frame) {
      frame.replaceChildren();

      const placeholder = document.createElement("div");
      placeholder.className = "placeholder";
      placeholder.textContent = "یک عکس یا فیلم انتخاب کن";

      frame.appendChild(placeholder);
    }

    alert("حذف شد");

  } catch (error) {
    console.error(error);
    alert("حذف انجام نشد؛ کد را بررسی کن");
  }
}
async function deleteMedia() {
  if (!isAdmin) {
    alert("ابتدا وارد مدیریت شو");
    return;
  }

  try {
    const items = await databaseAction(
      "readonly",
      store => store.getAll()
    );

    const media = items.filter(item =>
      item.type &&
      (
        item.type.startsWith("image/") ||
        item.type.startsWith("video/")
      )
    );

    if (media.length === 0) {
      alert("عکس یا فیلمی برای حذف وجود ندارد");
      return;
    }

    const list = media
      .map((item, index) => ${index + 1}. ${item.name})
      .join("\n");

    const answer = prompt(
      "شماره عکس یا فیلم را برای حذف وارد کن:\n\n" + list
    );

    if (answer === null || answer.trim() === "") {
      return;
    }

    const number = Number(answer);

    if (
      !Number.isInteger(number) ||
      number < 1 ||
