
const simpleUrl = "https://www.example.com/path/to/page";
const complexUrl =
  "https://api.example.com/data?param1=value1&param2=value2#section";

const parsedSimpleUrl = new URL(simpleUrl);
const parsedComplexUrl = new URL(complexUrl);

console.log(parsedSimpleUrl);
console.log(parsedComplexUrl);

parsedSimpleUrl.username = "user";
parsedSimpleUrl.password = "123";

parsedSimpleUrl.searchParams.set("param3", "value3");

parsedSimpleUrl.searchParams.delete("param3");
console.log(parsedSimpleUrl);

const myURLs = [
  new URL("https://www.example.com"),
  new URL("https://test.example.org"),
];

console.log(JSON.stringify(myURLs))