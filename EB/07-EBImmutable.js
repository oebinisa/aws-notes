Elastic Beanstalk Walkthrough

//Step 7: Elastic Beanstalk Configuration
G. EB Immutable

1. Immutable deploys ensures that your users are never out of service.
   It switches on a replaceable server automatically before taking a server out of service.
   It also disables Health Checks.
   
2. In the project folder, create a folder named .ebextensions
      mkdir .ebextensions
      cd .ebextensions  //change focus into the new folder
      touch 000_deploy.config //create this file in the .ebextensions folder

3. Open and enter the following line into the just created file
      option_settings:
        aws:elasticbeanstalk:command:
          DepploymentPolicy: Immutable
          HealthCheckThreshold: Warning
          IgnoreHealthCheck: true
          TimeOut: "600"

4. Move focus back into project folder
5. Enter the following git commands
      git status
      git add .
      git commit -m "Immutable deploys"
      git push
    
6. Go ahead and deploy
      eb deploy


EOF
