# psynth
Peter's Superfun Browser-synth playground.

## Live updating with Docker & P5 Manager
- First time: `docker build -t p5manager .`
- Then run
```
docker run -it -p 5555:5555 -p 35729:35729 -v"$(PWD)":/app p5manager bash
#Inside the container run:
cd /app && p5 s
```
- open a browser and visit http://localhost:5555/#/. (note the dot at the end)
- NOTE the provided `.p5rc` file in the root folder to tell p5manager to look in '.' for projects

## AWS Deployment
You might put this into a `deploy.sh` file to make life easier.
`s3cmd sync ./ s3://<YOUR_BUCKET_NAME> --delete-removed -P --rexclude=.git*`
