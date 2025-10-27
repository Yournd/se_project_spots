const initialCards = [
  {
    name: "Val Thorens",
    link: "./images/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "./images/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "./images/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest",
    link: "./images/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "./images/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "./images/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileSaveBtn = editProfileModal.querySelector(".modal__save-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostSaveBtn = newPostModal.querySelector(".modal__save-btn");
const newPostForm = newPostModal.querySelector(".modal__form");

const profileName = document.querySelector(".profile__header-title");
const profileNameInput = editProfileModal.querySelector("#name");
const profileDescription = document.querySelector(".profile__header-subtitle");
const profileDescriptionInput = editProfileModal.querySelector("#description");

const postImgInput = newPostModal.querySelector("#image-link");
const postCaptionInput = newPostModal.querySelector("#caption");

const closeButtons = document.querySelectorAll(".modal__close-btn");

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
  closeModal(editProfileModal);
}

function handlePostFormSubmit(event) {
  event.preventDefault();
  console.log(postImgInput.value);
  console.log(postCaptionInput.value);
  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handlePostFormSubmit);

editProfileForm.addEventListener("submit", handleEditFormSubmit);

editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

initialCards.forEach(function (item) {
  console.log(item.name);
});
