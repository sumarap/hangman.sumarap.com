# Use this to upload web site files.
#aws s3api create-bucket --bucket hangman.sumarap.com --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2

# Copy ALL files to site, except git, psd (photoshop) and sh scripts.
DATE=`date +%Y%m%d%H%M`
aws s3 cp . s3://hangman.sumarap.com/$DATE --recursive --exclude ".*" --exclude "package.json" --exclude "node_modules/*" --exclude ".git/*" --exclude ".gitignore" --exclude "*.sh" --exclude ".DS*" --exclude ".psd" --exclude "playground/*" --exclude "aws/*"

# To update the cloudfront distrubution (pushes changes to edge locations).
#aws cloudfront get-distribution-config --id E1NP1XD3IG47GS
#aws cloudfront update-distribution --id E1NP1XD3IG47GS --default-root-object index.html
