const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileSaveBtn = editProfileModal.querySelector(".modal__save-btn");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostSaveBtn = newPostModal.querySelector(".modal__save-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");

const profileName = document.querySelector(".profile__header-title");
const profileNameInput = editProfileModal.querySelector("#name");
const profileDescription = document.querySelector(".profile__header-subtitle");
const profileDescriptionInput = editProfileModal.querySelector("#description");

const postImgInput = newPostModal.querySelector("#image-link");
const postCaptionInput = newPostModal.querySelector("#caption");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  if (modal === editProfileModal) {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

function handlePostFormSubmit(event) {
  event.preventDefault();
  console.log(postImgInput.value);
  console.log(postCaptionInput.value);
  newPostModal.classList.remove("modal_is-opened");
}

newPostForm.addEventListener("submit", handlePostFormSubmit);

editProfileForm.addEventListener("submit", handleEditFormSubmit);

editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});
