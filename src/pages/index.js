import { enableValidation, config, disableButton, resetValidation } from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";
import { setLoadingText } from "../utils/Helper.js";

const modals = document.querySelectorAll(".modal");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileSaveBtn = editProfileModal.querySelector(".modal__save-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostSaveBtn = newPostModal.querySelector(".modal__save-btn");
const newPostForm = newPostModal.querySelector(".modal__form");

const profileAvatar = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__header-title");
const profileNameInput = editProfileModal.querySelector("#name");
const profileDescription = document.querySelector(".profile__header-subtitle");
const profileDescriptionInput = editProfileModal.querySelector("#description");

const postImgInput = newPostModal.querySelector("#image-link");
const postCaptionInput = newPostModal.querySelector("#caption");

const closeButtons = document.querySelectorAll(".modal__close-btn");

const cardTemplate = document.querySelector("#card__template");
const cardList = document.querySelector(".cards__list");

const previewModal = document.querySelector("#modal__preview");
const previewImage = previewModal.querySelector(".modal__image");
const previewSubtitle = previewModal.querySelector(".modal__subtitle");

const avatarModal = document.querySelector("#avatar-modal");
const avatarEditBtn = document.querySelector(".profile__avatar-btn");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#avatar-link");
const avatarSaveBtn = avatarModal.querySelector(".modal__save-btn");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteModalDeleteBtn = deleteModal.querySelector(".modal__delete");

let selectedCard;
let selectedCardId;


const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "316bb6b1-f72e-4127-8bac-e7ad4238b8d0",
    "Content-Type": "application/json"
  }
});

api.getAppInfo()
.then(([cards, users]) => {
  console.log(cards);
  cards.forEach(function (card) {
    const cardEl = getCardElement(card);
    cardList.prepend(cardEl);
  })
  profileAvatar.src = users.avatar;
  profileDescription.textContent = users.about;
  profileName.textContent = users.name;
}).catch(console.error);

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
  if (modal === editProfileModal) {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  }
}

function handleEscape(event) {
  modals.forEach((modal) => {
    if (modal.classList.contains("modal")) {
      const currentModal = modal;
      if (event.key === "Escape") {
        closeModal(currentModal);
      }
    }
  });
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleAvatarSubmit(event) {
  event.preventDefault();
  const saveBtn = event.submitter;
  setLoadingText(saveBtn, true, "Saving...", "Save");
  api.editAvatarInfo({ avatar: avatarInput.value })
  .then((data) => {
    profileAvatar.src = data.avatar;
    closeModal(avatarModal);
    event.target.reset();
  }).catch(console.error)
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  const saveBtn = event.submitter;
  setLoadingText(saveBtn, true, "Saving...", "Save");
  api.editUserInfo({name: profileNameInput.value, about: profileDescriptionInput.value})
  .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    closeModal(editProfileModal);
  })
  .catch(console.error)
}

function handlePostFormSubmit(event) {
  event.preventDefault();
  const saveBtn = event.submitter;
  setLoadingText(saveBtn, true, "Saving...", "Save");
  api.addCardInfo({name: postCaptionInput.value, link: postImgInput.value})
  .then((data) => {
    let card = getCardElement(data);
    cardList.prepend(card);
    event.target.reset();
    resetValidation(newPostForm, [postImgInput, postCaptionInput]);
    disableButton(newPostSaveBtn, config);
    closeModal(newPostModal);
  }).catch(console.error)
}

function handleDeleteCard(cardElement, cardId) {
    selectedCard = cardElement;
    selectedCardId = cardId;
    openModal(deleteModal);
}

function handleDeleteSubmit(event) {
  event.preventDefault();
  const saveBtn = event.submitter;
  setLoadingText(saveBtn, true, "Deleting...", "Delete");
  api.removeCard(selectedCardId)
  .then(() => {
    selectedCard.remove();
    closeModal(deleteModal);
  })
  .catch(console.error)
}

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-btn_active") ? true : false;
  api.toggleLike(id, isLiked)
  .then(() => {
    evt.target.classList.toggle("card__like-btn_active");
  }).catch(console.error)
}

function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__subtitle");
  const cardImg = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardTitle.textContent = data.name;

  data.isLiked ? cardLikeBtn.classList.add("card__like-btn_active"): cardLikeBtn.classList.remove("card__like-btn_active");

  cardLikeBtn.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  cardDeleteBtn.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id)
  });

  cardImg.addEventListener("click", function (event) {
    event.preventDefault();
    previewSubtitle.textContent = data.name;
    previewImage.src = data.link;
    previewImage.alt = data.name;
    openModal(previewModal);
  });
  
  return cardElement;
}

newPostForm.addEventListener("submit", handlePostFormSubmit);

editProfileForm.addEventListener("submit", handleEditFormSubmit);

avatarForm.addEventListener("submit", handleAvatarSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

editProfileBtn.addEventListener("click", function () {
  resetValidation(editProfileForm, [profileNameInput, profileDescriptionInput]);
  openModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

avatarEditBtn.addEventListener("click", function () {
  openModal(avatarModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal_is-opened")) {
      closeModal(modal);
    }
  });
});

enableValidation(config);
