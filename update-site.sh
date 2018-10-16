# Use this to upload web site files.
#aws s3api create-bucket --bucket hangman.sumarap.com --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2

# Copy ALL files to site, except git, psd (photoshop) and sh scripts.
aws s3 cp . s3://hangman.sumarap.com --recursive --exclude ".git/*" --exclude "*.sh" --exclude ".DS*" --exclude ".psd" --exclude "playground/*"

# To update the cloudfront distrubution (pushes changes to edge locations).
aws cloudfront update-distribution --id E1NP1XD3IG47GS --default-root-object index.html
