import { createElem } from "./createElem.js";

export const renderPhoto = (photoWrapper, photo) => {
  // console.log('photo: ', photo);
  const photoPicture = createElem('img', {
    className: "photo__picture",
    src: photo.urls.regular,
    alt: photo.alt_description || photo.description,
    style: "max-height: 80vh;",
  });
  const photoAuthor = createElem('a', {
    className: "photo__author",
    href: photo.user.links.html,
  });
  const photoAuthorImg = createElem('img', {
    src: photo.user.profile_image.medium,
    alt: photo.user.bio,
    title: photo.user.first_name + ' ' + photo.user.last_name,
  });
  const photoAuthorSpan = createElem('span', {
    textContent: photo.user.first_name + ' ' + photo.user.last_name,
  });
  photoAuthor.append(photoAuthorImg, photoAuthorSpan);

  const photoControl = createElem('div', {
    className: "photo__control",
  });
  const photoControlBtn = createElem('button', {
    id: photo.id,
    className: "photo__like",
    textContent: photo.likes,
    likedByUser: photo.liked_by_user,
  });
  if (!photoControlBtn.likedByUser) {
    photoControlBtn.classList.add('photo__like_o')
  }

  const photoControlDownload = createElem('a', {
    className: "photo__download",
    download: "true",
    // href: photo.links.download,
    href: photo.urls.raw,
    target: "_blank",
  });
  photoControl.append(photoControlBtn, photoControlDownload);

  photoWrapper.append(photoPicture, photoAuthor, photoControl);

  return photoControlBtn;
};