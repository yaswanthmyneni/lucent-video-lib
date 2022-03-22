import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "youth-and-truth",
    image:
      "https://images.sadhguru.org/d/46272/1631021008-sadhguru-isha-wisdom-video-image-youth-and-truth-lets-gossip-about-truth.jpg?fit=max&fm=jpg&w=1000",
    description:
      "Computer programming is the process of designing and building an executable computer program to accomplish a specific computing",
  },
  {
    _id: uuid(),
    categoryName: "yoga-sessions",
    image: 'https://i.pinimg.com/originals/ba/98/28/ba9828a5ef5ee11c8fb32151e0cd78f1.jpg',
    description:
      "Front-end web development, also known as client-side development is the practice of producing HTML, CSS and JavaScript for a website or Web Application",
  },
  {
    _id: uuid(),
    categoryName: "yogic-lifestyle",
    image: 'https://pbs.twimg.com/media/E4pP2UpUYAAyij4.jpg:large',
    description:
      "Backend Development is also known as server-side development. It is everything that the users don't see and contains behind-the-scenes activities that occur when performing any action on a website.",
  },
];
