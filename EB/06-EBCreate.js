Elastic Beanstalk Walkthrough


//Step 6: Elastic Beanstalk Configuration
F. EB Config

1. We will create our Elastic Beanstalk environment. Remember to include the --single flag so that a single instance is created. 
      //If you ommit the flag, it would create multiple instances with ELB, etc., which costs money
      eb create --single

2. Enter the following when prompted:
      Enter Environment Name: study-sync-prod
      DNS Change Prefix
      Enable Spot Fleet: N
      
3. Once completed, you would see the following:
      2022-01-26 14:47:08    INFO    Instance deployment completed successfully.

4. Type in the following command to verify your server status:
      eb status
      
      eb logs
      
      eb events
      
5. Copy and paste eith the EIP (Elastic IP) or the CNAME in a browser to see the application.


EOF
