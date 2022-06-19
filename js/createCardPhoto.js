import { createElem } from "./createElem.js";

const loadImg = (url, description) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.width = 200;
    img.src = url;
    img.alt = description;
    img.addEventListener('load', () => {
      resolve(img);
    });
    img.addEventListener('error', (err) => {
      reject(new Error(err));
    });
  });
};

export const createCardPhoto = async (data) => {
  const card = createElem('li', {
    className: 'card',
    // style: 'min-height: 300px;'
  });

  const cardItem = createElem('a', {
    id: data.id,
    className: 'grid-item',
    href: `page.html?photo=${data.id}`,
  });

  const photo = await loadImg(data.urls.small, data.alt_description);


  const author = createElem('a', {
    className: "card__author",
    href: data.user.links.html,
    target: "_blank",
  });

  const avatarAuthor = new Image();
  avatarAuthor.className = "author__photo";
  avatarAuthor.src = data.user.profile_image.medium;
  avatarAuthor.width = "32";
  avatarAuthor.height = "32";
  avatarAuthor.alt = data.user.bio;
  avatarAuthor.title = data.user.username;

  author.append(avatarAuthor);

  const likeBtn = createElem('button', {
    className: "card__photo-like",
    textContent: data.likes,
  });

  const downloadLink = createElem('a', {
    className: "card__download",
    href: data.links.download,
    download: true,
    target: "_blank",
  });

  cardItem.append(photo, author, likeBtn, downloadLink);
  card.append(cardItem);

  return card;
};