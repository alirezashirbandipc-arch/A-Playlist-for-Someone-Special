/*
   * اطلاعات ورود نمونه‌اند.
   * برای سایت عمومی از این روش به‌عنوان امنیت واقعی استفاده نکن.
   */
  if (username === "admin" && password === "1234") {
    isAdmin = true;
    $("loginPanel").classList.add("hidden");
    $("adminPanel").classList.remove("hidden");
    $("loginMessage").textContent = "";
    alert("وارد مدیریت شدی");
  } else {
    $("loginMessage").textContent =
      "نام کاربری یا رمز عبور اشتباه است";
  }
});

$("logoutBtn").addEventListener("click", () => {
  isAdmin = false;
  $("adminPanel").classList.add("hidden");
  alert("از مدیریت خارج شدی");
});

$("mediaInput").addEventListener("change", async event => {
  if (!isAdmin) {
    alert("ابتدا وارد مدیریت شو");
    event.target.value = "";
    return;
  }

  try {
    for (const file of event.target.files) {
      await saveFile(file);
    }

    await renderGallery();
    alert("عکس یا فیلم اضافه شد");
  } catch (error) {
    console.error(error);
    alert("ذخیره انجام نشد");
  }

  event.target.value = "";
});

$("audioInput").addEventListener("change", async event => {
  if (!isAdmin) {
    alert("ابتدا وارد مدیریت شو");
    event.target.value = "";
    return;
  }

  try {
    for (const file of event.target.files) {
      await saveFile(file);
    }

    await renderAudio();
    alert("صدا اضافه شد");
  } catch (error) {
    console.error(error);
    alert("ذخیره صدا انجام نشد");
  }

  event.target.value = "";
});

$("addTextBtn").addEventListener("click", async () => {
  if (!isAdmin) {
    alert("ابتدا وارد مدیریت شو");
    return;
  }

  const text = prompt("متن خود را وارد کن:");

  if (text === null || !text.trim()) return;

  const blob = new Blob([text], { type: "text/plain" });

  try {
    await databaseAction("readwrite", store => store.add({
      name: "نوشته",
      type: "text/plain",
      blob,
      created: Date.now()
    }));

    await renderTexts();
    alert("متن ذخیره شد");
  } catch (error) {
    console.error(error);
    alert("ذخیره متن انجام نشد");
  }
});

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

    if (!items.length) {
      alert("رسانه‌ای برای حذف وجود ندارد");
      return;
    }

    const answer = prompt(
      "شماره مورد برای حذف:\n" +
      items.map((item, i) => ${i + 1}. ${item.name}).join("\n")
    );

    if (answer === null || answer.trim() === "") return;

    const number = Number(answer);

    if (!Number.isInteger(number)  number < 1  number > items.length) {
      alert("شماره نامعتبر است");
      return;
    }

    await databaseAction(
      "readwrite",
      store => store.delete(items[number - 1].id)
    );

    await renderAll();

    $("mediaFrame").replaceChildren(
      Object.assign(document.createElement("p"), {
        textContent: "یک عکس یا فیلم انتخاب کن"
      })
    );

    alert("حذف شد");
  } catch (error) {
    console.error(error);
    alert("حذف انجام نشد");
  }
}

$("deleteBtn").addEventListener("click", deleteMedia);

$("homeBtn").addEventListener("click", () => {
  $("loginPanel").classList.add("hidden");
  $("adminPanel").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

openDatabase()
  .then(renderAll)
  .catch(error => {
    console.error(error);
    alert("پایگاه داده باز نشد؛ سایت را در مرورگر به‌روز امتحان کن");
  });
