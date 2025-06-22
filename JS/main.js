let name = document.getElementById("name");
let url = document.getElementById("url");
let form = document.getElementById("form");
let bookmarks = [];

// ✅ Fix: assign parsed localStorage to bookmarks
if (localStorage.getItem("BookMarkers") != null) {
  bookmarks = JSON.parse(localStorage.getItem("BookMarkers"));
  displayData();
}

function addData() {
  if (bookmarks.findIndex((element) => element.name == name.value.trim()) !== -1) {
    Swal.fire({
      icon: 'error',
      title: 'Duplicate Name',
      text: 'This bookmark name already exists!',
    });
    return;
  } else if (!validateName()) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Name',
      text: 'Should only contain characters & min number of letters is 3!',
    });
    return;
  } else if (!validateURL()) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid URL',
      text: 'Please enter a valid URL that starts with http:// or https://',
    });
    return;
  }

  let bookmark = {
    name: name.value.trim(),
    url: url.value.trim()
  };
  bookmarks.push(bookmark);
  console.log(bookmarks);

  // ✅ Fix: stringify bookmarks before saving
  localStorage.setItem("BookMarkers", JSON.stringify(bookmarks));
  displayData();
  clearInputs();
}

function gotoLink(url) {
  window.open(url, '_blank');
}

function displayData() {
  let cartona = "";
  for (let i = 0; i < bookmarks.length; i++) {
    cartona += ` <tr>
      <th scope="row">${i + 1}</th>
      <td>${bookmarks[i].name}</td>
      <td><button type="button" class="btn btn-success pt-sans-caption-bold" onclick="gotoLink('${bookmarks[i].url}')"> <i class="fa-solid fa-eye"></i> visit</button></td>
      <td> <button type="button" class="btn btn-danger pt-sans-caption-bold" onclick="deleteUrl(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
    </tr>`;
  }
  document.getElementById("table_body").innerHTML = cartona;
}

function deleteUrl(index) {
  bookmarks.splice(index, 1);
  // ✅ Fix: stringify when updating localStorage
  localStorage.setItem("BookMarkers", JSON.stringify(bookmarks));
  displayData();
}

function validateName() {
  let name_regex = /^[a-zA-Z]{3,}$/;
  if (name_regex.test(name.value.trim())) {
    name.classList.add("is-valid");
    name.classList.remove("is-invalid");
    return true;
  } else {
    name.classList.add("is-invalid");
    name.classList.remove("is-valid");
    return false;
  }
}

function validateURL() {
  let url_regex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  if (url_regex.test(url.value.trim())) {
    url.classList.add("is-valid");
    url.classList.remove("is-invalid");
    return true;
  } else {
    url.classList.add("is-invalid");
    url.classList.remove("is-valid");
    return false;
  }
}

function clearInputs() {
  name.value = '';
  url.value = '';
}
