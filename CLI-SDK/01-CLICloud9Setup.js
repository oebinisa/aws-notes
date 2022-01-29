CLI SDK

CLI Cloud9 Setup (Part 1)

1. First, create a new IAM user so we can generate some AWS credentials
      IAM => New User: spock, Programmatic access [check] => Add user to group, Group: Developers (PowerUserAccess policy)
      => Download access key (.csv) OR copy both AccessKeyId and SecretAccessKey

2. Cloud9 => Create Environment: SpockDev, EC2, t2.micro, Amazon Linux 2, 30 mins, IAM Role enabled: AWSServiceRoleForAWSCloud9
3. AWS CLI comes pre-installed with Cloud9.
4. If you would like to install AWS CLI outside of Cloud9, use the following command for Python 3
      pip3 install awscli --upgrade --user


      
CLI (Part 2)

1. Install the node package manager for c9, which allows us to open files from the terminal into Cloud9
      npm i c9 -g

2. Go to the home directory
      cd ~/
      ls -la //lists out the content of the current directory

3. If you do not have the .aws folder listed, create it using the following:
      mkdir .aws

4. the .aws folder should contain a credentials and a config file
      cd .aws
      ls -la

5. If it does not contain the config file, create it and open the file
      touch config
      c9 config
      
6. Enter the following content into the config file. Use the details from the .csv file saved for use spock early on, and save.      
      [profile spock]
      aws_access_key_id =
      aws_secret_access_key =
      output = json
      region = us-east-1      

7. You can now access other AWS services (such as S3) using the user profile just entered in the credentials file
      aws s3 ls --profile spock

      

SDK (Part 3)

1. ...



      
      
      
      
      


