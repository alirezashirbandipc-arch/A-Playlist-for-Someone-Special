renderGallery();
    alert("ثبت شد");
  };

  reader.readAsDataURL(selectedFile);
}

function renderGallery() {
  const gallery = document.getElementById("gallery");
  gallery.replaceChildren();

  mediaItems.forEach((item, index) => {
    let element;

    if (item.type.startsWith("video/")) {
      element = document.createElement("video");
      element.muted = true;
    } else {
      element = document.createElement("img");
    }

    element.src = item.data;
    element.className = "thumb";

    element.onclick = function() {
      showPreview(item.data, item.type);
    };

    gallery.appendChild(element);
  });
}

function deleteMedia() {
  if (!isAdmin) return;

  const gallery = document.getElementById("gallery");

  if (mediaItems.length === 0) {
    alert("موردی برای حذف وجود ندارد");
    return;
  }

  const answer = prompt(
    "شماره عکس یا فیلم برای حذف را وارد کن:\n" +
    mediaItems.map((item, i) => (i + 1) + ". " + item.name).join("\n")
  );

  if (answer === null) return;

  const index = Number(answer) - 1;

  if (!Number.isInteger(index) index < 0 
      index >= mediaItems.length) {
    alert("شماره نامعتبر است");
    return;
  }

  mediaItems.splice(index, 1);
  renderGallery();

  document.getElementById("mediaFrame").innerHTML =
    '<div class="placeholder">یک عکس یا فیلم انتخاب کن</div>';

  alert("حذف شد");
}
</script>

</body>
</html>
