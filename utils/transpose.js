// let l = require('../assets/reunions.csv')
let fs = require("fs") 

async function transpose () {
  var array =  fs.readFileSync('C:/Users/chron/Documents/Lambda/Labs/miracle-messages-be/assets/reunions.csv').toString().split("\r\n");

 function createObject(chapterid,volunteerid,longitude,latitude,city,state,title,story,link_to_media, reunion_img, approved) {
  return { chapterid,volunteerid,longitude,latitude,city,state,title,story: story,link_to_media, reunion_img, approved}}
let arrayOfObjects = array.map(async e => {
  e = e.replace("\n", " ")

  const info = await e.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
  e = await createObject(info[0],info[1],info[2],info[3],info[4],info[5],info[6],info[7],info[8],info[9],info[10],info[11])
  e.story =  e.story.replace(/"/g,"")
  
  // console.log(e)
  return e
})

Promise.all(arrayOfObjects).then(values => {
  console.log(values)
});
}
transpose()

module.exports = transpose;