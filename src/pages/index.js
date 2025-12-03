import { enableValidation, config, disableButton, resetValidation } from "../scripts/validation.js";
import "./index.css";
import image1 from "../images/1-photo-by-moritz-feldmann-from-pexels.jpg";
import image2 from "../images/2-photo-by-ceiline-from-pexels.jpg";
import image3 from "../images/3-photo-by-tubanur-dogan-from-pexels.jpg";
import image4 from "../images/4-photo-by-maurice-laschet-from-pexels.jpg";
import image5 from "../images/5-photo-by-van-anh-nguyen-from-pexels.jpg";
import image6 from "../images/6-photo-by-moritz-feldmann-from-pexels.jpg";
import image7 from "../images/pexels-griffin-wooldridge-4953434 1.png";

const initialCards = [
  {
    name: "Val Thorens",
    link: image1,
  },
  {
    name: "Restaurant terrace",
    link: image2,
  },
  {
    name: "An outdoor cafe",
    link: image3,
  },
  {
    name: "A very long bridge, over the forest",
    link: image4,
  },
  {
    name: "Tunnel with morning light",
    link: image5,
  },
  {
    name: "Mountain house",
    link: image6,
  },
  {
    name: "Golden Gate Bridge",
    link: image7,
  },
];

const modals = document.querySelectorAll(".modal");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileSaveBtn = editProfileModal.querySelector(".modal__save-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostSaveBtn = newPostModal.querySelector("#modal__save-btn");
const newPostForm = newPostModal.querySelector(".modal__form");

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

function handleEditFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
}

function handlePostFormSubmit(event) {
  event.preventDefault();
  const data = {
    name: postCaptionInput.value,
    link: postImgInput.value,
  };
  let card = getCardElement(data);
  cardList.prepend(card);
  event.target.reset();
  resetValidation(newPostForm, [postImgInput, postCaptionInput]);
  disableButton(newPostSaveBtn, config);
  closeModal(newPostModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true).content;
  const cardTitle = cardElement.querySelector(".card__subtitle");
  const cardImg = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardTitle.textContent = data.name;

  cardLikeBtn.addEventListener("click", function (event) {
    event.preventDefault();
    cardLikeBtn.classList.toggle("card__like-btn");
    cardLikeBtn.classList.toggle("card__like-btn_active");
  });

  cardDeleteBtn.addEventListener("click", function (event) {
    event.preventDefault();
    cardDeleteBtn.parentElement.remove();
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

editProfileBtn.addEventListener("click", function () {
  resetValidation(editProfileForm, [profileNameInput, profileDescriptionInput]);
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
  const cardEl = getCardElement(item);
  cardList.prepend(cardEl);
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal_is-opened")) {
      closeModal(modal);
    }
  });
});

enableValidation(config);
