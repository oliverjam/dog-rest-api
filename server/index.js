const server = require("./server");

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

process.on("unhandledRejection", (error) => {
  console.error(error);
  process.exit(1);
});
