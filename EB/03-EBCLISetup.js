Elastic Beanstalk Walkthrough


//Step 3: Elastic Beanstalk CLI Setup
C. EB CLI Setup

1. Ensure that you are in the root folder
      cd ..
      
2. Enter the following command to 
      git clone https://github.com/aws/aws-elastic-beanstalk-cli-setup.git

3. Next, enter the command below to install packages
      python ./aws-elastic-beanstalk-cli-setup/scripts/ebcli_installer.py

4. Complete the installation by adding "eb" into the path
      echo 'export PATH="/home/ec2-user/.ebcli-virtual-env/executables:$PATH"' >> ~/.bash_profile && source ~/.bash_profile

5. You can declutter by removing the "aws-elastic-beanstalk-cli-setup" folder
      rm -rf aws-elastic-beanstalk-cli-setup/


EOF
