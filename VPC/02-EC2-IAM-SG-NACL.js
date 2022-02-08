EC2 

Note:
Always ensure you have your region set to N. Virginia before performing operations

A. EC2 
      Create EC2
      IAM Role
      Security Group (SG)
B. Notes of SGs and NACLs


A. EC2 
1. Create EC2 Instances
      Console => EC2 => Left Menu => Instances => Launch Instances
            Chooce AMI: Amazon Linux 2
            Instance Type: General Purpose - t2.micro
            Configure Instance Details
                  Number of Instaces: 1
                  Network: Select preferred VPC
                  Subnet: Select a (public) subnet
                  IAM Role: Your IAM Role should have the following policies (create new Role if required)
                        SSM: AmazonSSMManagedInstanceCore
                        S3: AmazonS3FullAccess
                  Advanced Details: User Data (Provide or upload startup script - optional) // See sample startup script below
            Configure Security Group (SG)
                  Select existing or create a new Security Group. To create a new SG
                        Security Group Name: Enter a name
                        Add Rule: Type - HTTP, Protocol - TCP, Port - 80, Source - My IP (restricts access to only my computer)
                                  Type - SSH, Protocol - TCP, Port - 22, Source - My IP (restricts access to only my computer)
            Key Pair: Use existing or generate ne Key Pair
            
2. Create another Instance for a Private Subnet.
      Note: Configure Instance Details => Subnet: Ensure to select a Private Subnet
            Configure Security Group => Add Rule: Only include "SSH" type (No HTTP)
==================================================
// The sample startup script below would install an Apache server and display a sample webpage (Public EC2 Instance)
// Sample Startup Script - public.userdata.sh
#!/usr/bin/env bash
su ec2-user
sudo yum install httpd -y
sudo service httpd start
sudo su -c "cat > /var/www/html/index.html <<EOL
<html>
  <head>
    <title>Call to Arms</title>
    <style>
      html, body { background: #000; padding: 0; margin: 0; }
      img { display: block; margin: 0px auto; }
    </style>
  </head>
  <body>
    <img src='https://media.giphy.com/media/10YoCxWqM3NHxK/giphy.gif' height='100%'/>
  </body>
</html>
EOL"
==================================================
// The sample startup script (Private EC2 Instance)
// Sample Startup Script - private.userdata.sh
#!/usr/bin/env bash
su ec2-user
echo -e "kaiwinn\nkaiwinn" | passwd ec2-user
sudo sed -i "/^[^#]*PasswordAuthentication[[:space:]]no/c\PasswordAuthentication yes" /etc/ssh/sshd_config
sudo service sshd restart
==================================================      
====================

                  
B. Notes on SG and NACL

Security Groups
1. SGs can only allow things, everything else is denied
      E.g. You can (explicitly) set/allow inbound rules for SGs i.e My IP above - every other thing is implicitly denied
      Outbound rules are just set to 0.0.0.0/0 (allow connection to the Internet)
2. SGs are associated with EC2 Instances


NACL
1. NACLs on the other hand take both allow and deny rules
      E.g. you can block specific IPs      
2. NACLs are associated with Subnets     
3. NACLs take precedence over SGs
====================


