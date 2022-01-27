Elastic Beanstalk Walkthrough

I. EB Single-Container with ECR

1. The reason why you want to dockerize is because it allows you to ship your configuration with your codebase.
2. To build a docker image
      cd study-sync-prod
      docker build -t study-sync
2. Retrieve the IP address of the server/instance
      curl http://169.254.169.254/latest/meta-data/public-ipv4

3. 


....


