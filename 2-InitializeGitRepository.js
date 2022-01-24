Elastic Beanstalk Walkthrough


//Step 2: Git Repository
B. Initialize Git Repository

1. Stop the Cloud9 Server (Ctrl+C)    
2. Ensure that you are in the project folder
      cd ~/environment/study-sync/
        
3. Create the .gitignore file
      touch .gitignore

4. Open the newly created file and type in node_module. This would ignore the entire node_modules folder
      c9 .gitignore

5. Next, set up the git repo. The command would create a .git directory
      git init

6. Check the status of the files in your project, add them to git repo, then check the status again
      git status
      git add .
      git status
      
7. If you need to, use the following command to clear the cache before committing:
      git rm -r --cached .


EOF

      
      



