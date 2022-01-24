Elastic Beanstalk Walkthrough


//Step 4: Elastic Beanstalk Init
D. EB Init

1. Now we are ready to initialize the Elastic Beanstalk project 
2. Move focus into your project folder
      cd study-sync
      ls -la

3. Enter the following command. Esure to default to "us-east-1" -  US East (N. Virginia)
      eb init
      
4. If you think you made a mistake with any of the prompts, run the script again like this
      eb init -i

5. You can always run the following to see available options
      eb init --help

5. Agree to the project name or enter the specific project
6. It is going to ask you to confirm the framework: for example, Node.js
7. It will ask you to confirm the platform branch: 1) Node.js 14 running on 64bit Amazon Linux 2
8. CodeCommit: Y
9. Repository Name: study-sync
10. Enter or confirm branch name: master
11. Use SSH? We would not be using SSH for this, so - n




