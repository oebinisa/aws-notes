Elastic Beanstalk Walkthrough

//Step 8: Elastic Beanstalk Blue/Green Deployments
H. EB Blue/Green Deployements

1. Blue/Green maintans two instances of the server: one is live, and the other is the updated version.
   You can always switch the live instance between the two servers
     
2. This would guide to clone the instance
     eb clone
     
     Enter instance name
     Confirm CNAME
     
3. Make achange to your files, then push to git repo
     git status
     git add ..
     git commit -m "Change to version 2"
     git push
 
4. You can now deploy to a specific instance. 
     eb deploy study-sync-clone
     
5. You can now swap your live environment
     eb swap study-sync-prod --destination_name study-sync-prod-clone
     
6. You can now terminate the old instance
     eb terminate study-sync-prod
     
EOF
