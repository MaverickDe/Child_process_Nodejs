process.on("message", (msg) => {
  console.log("Message from parent:", msg);
});

let counter = 0;

setTimeout(() => {
  process.send({ counter: counter++ });
}, 1000);
