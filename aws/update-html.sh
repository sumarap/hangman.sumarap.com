# Use this to upload web site files.

# Copy html files
aws s3 cp . s3://sydney.sumarap.com --recursive --include "*.html" --exclude "dev-playground/*" --exclude "*.sh" --exclude ".DS_Store" --exclude ".git/*" --exclude "css/*" --exclude "fonts/*" --exclude "images/*" --exclude "js/*" --exclude "logs/*"

# Copy js files
aws s3 cp js/ s3://sydney.sumarap.com/js/ --recursive 

# Copy css files
aws s3 cp css/ s3://sydney.sumarap.com/css/ --recursive 

# Copy font files
#aws s3 cp fonts/ s3://sydney.sumarap.com/fonts/ --recursive 

# Copy images files
#aws s3 cp images/ s3://sydney.sumarap.com/images/ --recursive 

