const fs = require('fs')

// Copy updated app files to s3 into same bucket, new subfolder
const pushFilesToS3Bucket = (S3, BUCKET, file) => {
  let params = {
    Bucket: BUCKET,
    Key: file,
    StorageClass: 'STANDARD_IA',
  }

  S3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack)
    else console.log(data)
  })
}

// Update the cloudfront distribution configuration
const fixCloudFrontDistribution = (data, NEW_ORIGIN_PATH, ETAG) => {
  data.DistributionConfig.Origins.Items[0].OriginPath = NEW_ORIGIN_PATH
  delete data.ETag
  delete data.Distribution
  data.IfMatch = ETAG
}

// Used for outputing cloudfront distribution configuration to a file.
const outputToFile = (path, buffer) => {
  fs.open(path, 'w', function(err, fd) {
    if (err) {
      throw 'could not open file: ' + err
    }

    // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
      if (err) throw 'error writing file: ' + err
      fs.close(fd, function() {
        console.log('wrote the file successfully')
      })
    })
  })
}

module.exports = {
  pushFilesToS3Bucket: pushFilesToS3Bucket,
  fixCloudFrontDistribution: fixCloudFrontDistribution,
  outputToFile,
}
