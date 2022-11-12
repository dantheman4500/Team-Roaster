//! Used in `npm run reset` script 

const fs = require('fs');
if (fs.existsSync("./dist/Homepage.html")) {
  fs.unlinkSync("./dist/Homepage.html");
  console.log("/dist/ folder was deleted");
}
