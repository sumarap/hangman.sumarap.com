const fs = require('fs')
const path = require('path')

// Copy updated app files to s3 into same bucket, new subfolder
const pushFilesToS3Bucket = (S3, BUCKET, file) => {
  let contentType = 'text/html'

  // Check if this is an image file
  const ext = path.extname(file).substring(1)
  switch (ext.toLowerCase()) {
    case 'js':
      contentType = 'application/javascript'
      break
    case 'json':
      contentType = 'application/json'
      break
    case 'ico':
      contentType = 'image/x-icon'
      break
    case 'jpg':
    case 'jpeg':
      contentType = 'image/jpeg'
      break
    case 'png':
      contentType = 'image/png'
      break
    case 'gif':
      contentType = 'image/gif'
      break
    case 'css':
      contentType = 'text/css'
      break
    default:
      contentType = 'text/html'
      break
  }

  // Get file contents
  fs.readFile(file, function(err, data) {
    let params = {
      Bucket: BUCKET,
      Key: file,
      Body: data,
      ContentType: contentType,
      StorageClass: 'STANDARD_IA',
    }
    S3.putObject(params, function(err, data) {
      if (err) console.log(err, err.stack)
      else console.log(data)
    })
  })
}

const pushAllFilesToS3Bucket = (S3, BUCKET, files) => {
  files.forEach(file => {
    pushFilesToS3Bucket(S3, BUCKET, file)
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
  pushAllFilesToS3Bucket: pushAllFilesToS3Bucket,
  fixCloudFrontDistribution: fixCloudFrontDistribution,
  outputToFile,
}
