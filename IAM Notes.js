Identity and Access Management (IAM) Notes

A. Activate MFA on your account
B. Apply an IAM Policy
C. IAM Users Sign-in Link
      This is a customizable link to the AWS Console you share with your users
      It makes it easier for your users to login to the Console
      
D. IAM Components
1. Users
      Actual users within your AWS
      You can individually attach Policies to Users // Not best practice though
      IAM => Left Menu => Users
            Username: Enter a username for the user // You can create multiple users at a go
            User Type: Programmatic Access | AWS Management Console Access (The latter requires Console access password)
            
2. User Groups
      Groups is the best-practice way to manage user's permissions by Job functions
      You attach Policies to these Groups
      Then assign them to Users
            Admin: Policy - AdministratorAccess
            Developers: Policy - PowerUserAccess
            
3. Roles
      Roles are a way to manage user's permission by Responsibilities
      You also attach Policies to Roles 
      Then assign Roles to Users // Same as User Groups

4. Policies
      These are the permissions you grant on AWS
      They are written in JSON
      There are two types
            AWS Managed Policies, and
            User Managed Policies // Defined by the Administrator
   
            
            
EOF
