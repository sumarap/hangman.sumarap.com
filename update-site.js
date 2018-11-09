/////////////////////////////////////////////////////////
// Push the hangman app to AWS s3,
// get the existing cloudfront distribution config
// modify the config file and
// Update the cloudfront distribution
/////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// 1) DONE: Create a timeStamp variable to use for the subfolder name to copy
//    hangman files.
// 2) DONE: Copy files to s3
// 3) DONE: Pull current cloudfront JSON configuration file
// 4) DONE: Modify config file
//    a) Change OriginPath
//    b) Remove ETag (save it to a variable first)
//    c) Remove Distribution
//    d) Add IfMatch (original ETag, saved above)
//  5) Update Cloudfront distribution with new configuration
////////////////////////////////////////////////////////////////////////////////

// const fs = require('fs')
const moment = require('moment')

const {
  pushFilesToS3Bucket,
  fixCloudFrontDistribution,
  updateCloudFrontDistribution,
  outputToFile,
} = require('./utils')

const CONFIG_FILE = 'update.json'
console.log('configFile', CONFIG_FILE)

const NEW_ORIGIN_PATH = '/' + moment().format('YYYYMMDDHHmm')
console.log('timeStamp', NEW_ORIGIN_PATH)

const AWS = require('aws-sdk')
const S3 = new AWS.S3()
const CLOUD_FRONT = new AWS.CloudFront()
const BUCKET = `hangman.sumarap.com${NEW_ORIGIN_PATH}`

// Files to copy to s3
const files = [
  'index.html',
  'pen.png',
  'scripts/app.js',
  'scripts/functions.js',
  'scripts/hangman.js',
  'scripts/requests.js',
  'styles/styles.css',
]
// Copy ALL app files to s3
pushFilesToS3Bucket(S3, BUCKET, files)

// We need the cloudfront distribution id to call getDistribution
let getDistParams = {
  Id: 'E1NP1XD3IG47GS',
}

// Get the current cloudfront distribution
CLOUD_FRONT.getDistribution(getDistParams, function(err, data) {
  if (err) console.log(err, err.stack)
  else {
    // Output the original distribution config to a file.
    //const fileOriginal = './original.json'
    //outputToFile(fileOriginal, JSON.stringify(data, null, ' '))

    const ETAG = data.ETag // Save for later
    fixCloudFrontDistribution(data, NEW_ORIGIN_PATH, ETAG)

    CLOUD_FRONT.updateDistribution(data, function(err, data) {
      if (err) console.log(err, err.stack)
      else {
        console.log('updateDistribution was successful')
        // Output the modified distribution config to a file.
        //const fileModified = './data.json'
        //outputToFile(fileModified, JSON.stringify(data, null, ' '))
      }
    })
  }
})

return
