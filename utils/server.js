import http from "http";

const server = http.createServer();
const PORT = +process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Bot Started on PORT:" + PORT);
});
