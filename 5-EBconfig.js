Elastic Beanstalk Walkthrough


//Step 5: Elastic Beanstalk Configuration
E. EB Config

1. Our job here is to configure this environment
2. Create the EB Extensions folder
      mkdir .ebextensions

3. Move into the newly created folder and create the following two files
      cd .ebextensions/
      touch 001_envar.config
      touch 002_node_command.config

4. Insert the following into the 001_envar.config file
      aws:elasticbeanstalk:application:environment:
        PORT: 8081
        NODE_ENV: production
        
5. Edit the next file (002_node_command.config) to tell Elastic Beanstalk how to start up our application
      option_settings:
        aws:elasticbeanstalk:container:nodejs:
          NodeCommand: "npm start"
          NodeVersion: 16.13.1 //You can check your node version on the bash shell with "node -v"

6. Commit the configuration on the bash shell
      git add .
      git commit -m "configuration for elastic beanstalk"

7. Push it
      git push
      
Extras:
  Other commands I had to do to commit to repo
      git remote add <name> <url>
        
  Then push using the remote name
      git push <name>
 
  Others:
      git config --global user.name <username>
      git config --global user.email <email>
        
      git push --set-upstream study-sync master







EOF
