import "dotenv/config";
import axios from "axios";
import parser from "rss-parser";

const Parser = new parser();
let currentDate = new Date();

async function getRSS(url) {
  let data = await Parser.parseURL(url);
  return data;
}

const anime2youInterval = async function () {
  getRSS(process.env.Anime2You).then((res) => {
    res.items.forEach((item) => {
      if (new Date(item.pubDate) > new Date(currentDate)) {
        axios
          .post(process.env.AnimeWebHook, {
            username: "Diener der Herrscher Anime2you",
            avatar_url:
              "https://pbs.twimg.com/profile_images/1323574739537973248/DkYw2Nop_400x400.jpg",
            content: item.link,
          })
          .then((res) => {
            currentDate = new Date();
          })
          .catch((err) => console.log(err));
      }
    });
  });
};

const animeInterval = setInterval(anime2youInterval, 900000);
