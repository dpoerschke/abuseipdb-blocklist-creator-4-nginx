import fetch from "node-fetch";
import AbortController from "abort-controller";
import fs from "fs";
import path from "path";

const apiEndPoint = "https://api.abuseipdb.com/api/v2/blacklist";
const blocklistFileName = "abusipdb-blocklist.txt";
const version = "1.0.0";

const controller = new AbortController();
const timeout = setTimeout(() => {
  controller.abort();
}, 5000);

console.log("");
console.log("Starting abuseipdb blocklist creator (v" + version + ")..");

const pathToKeys = process.cwd() + path.sep + "apikey" + path.sep;
let dirCont = fs.readdirSync(pathToKeys);
let keyfiles = dirCont.filter(function (elm) {
  return elm.match(/.*\.(key?)$/gi);
});

if (keyfiles.length > 0) {
  if (keyfiles.length > 1) {
    console.log("\x1b[31mProblem occured:\x1b[0m");
    console.log(
      "Found more than 1 file with extension .key in in " + pathToKeys
    );
    console.log(
      "Make sure that there is only 1 file with extension .key in that directory."
    );
    console.log("");
  } else {
    let dapiKey = fs.readFileSync(pathToKeys + keyfiles[0], "utf8");

    if (dapiKey.trim() === "") {
      console.log("\x1b[31mProblem occured:\x1b[0m");
      console.log("The key-File is empty: " + pathToKeys + keyfiles[0]);
      console.log("Can't continue without a key. Sorry!");
      infotext();
    } else {
      try {
        console.log("Fetching ip-blocklist from abuseipdb.com..");
        const response = await fetch(apiEndPoint, {
          // These properties are part of the Fetch Standard
          method: "GET",
          headers: {
            //'Accept': 'application/json',
            Accept: "text/plain",
            Key: dapiKey,
          }, // Request headers. format is the identical to that accepted by the Headers constructor (see below)
          body: null, // Request body. can be null, a string, a Buffer, a Blob, or a Node.js Readable stream
          redirect: "follow", // Set to `manual` to extract redirect headers, `error` to reject redirect
          signal: null, // Pass an instance of AbortSignal to optionally abort requests

          // The following properties are node-fetch extensions
          follow: 20, // maximum redirect count. 0 to not follow redirect
          compress: true, // support gzip/deflate content encoding. false to disable
          size: 0, // maximum response body size in bytes. 0 to disable
          agent: null, // http(s).Agent instance or function that returns an instance (see below)
          highWaterMark: 16384, // the maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource.
          insecureHTTPParser: false, // Use an insecure HTTP parser that accepts invalid HTTP headers when `true`.
        });
        let data = await response.text();
        console.log("Data received.. length: " + data.length);

        if (data.indexOf("AbuseIPDB APIv2 Server") > -1 || data.length < 200) {
          console.log("\x1b[31mProblem occured:\x1b[0m");
          console.log(
            "Could not receive the ip blocklist. Please make sure that the api-key is valid. Received this instead:"
          );
          console.log(data);
        } else {
          console.log(
            "Creating blocklist-file for Nginx: " + blocklistFileName
          );

          // create Nginx config file format
          let newString = data.split("\n");

          newString.forEach(function (part, index, theArray) {
            theArray[index] = "deny " + part + ";";
          });

          fs.writeFile(
            "./" + blocklistFileName,
            newString.join("\n"),
            (err) => {
              if (err) {
                console.error(err);
                return;
              }

              console.log("File \x1b[32msuccessfully \x1b[0mcreated.");
              console.log("");
            }
          );
        }
      } catch (error) {
        if (error instanceof fetch.AbortError) {
          console.log("\x1b[31mProblem occured:\x1b[0m");
          console.log("request aborted:");
          console.error(error);
        }
      } finally {
        clearTimeout(timeout);
      }
    }
  }
} else {
  console.log("\x1b[31mProblem occured:\x1b[0m");
  console.log(
    "Could not find the \x1b[31mapi.key \x1b[0mfile in " + pathToKeys
  );
  infotext();
}

function infotext() {
  console.log("To get an api key do the following:");
  console.log("1) Create an account at https://www.abuseipdb.com");
  console.log("2) Go to the blocklist section and create an api-key.");
  console.log(
    "3) Create an empty file called \x1b[31mmapi.key \x1b[0min " + pathToKeys
  );
  console.log(
    "4) Copy and paste the apikey from abuseipdb.com to that file and save it."
  );
  console.log("");
}
