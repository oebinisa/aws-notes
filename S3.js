S3
==
      
A. Create and Delete a Bucket
B. Private and Public Access
C. Versioning
D. Encryption
E. S3 CLI
F. Lifecycle Rules/Policies
G. S3 Cross-Region Replication
H. Bucket Policy


Notes:
1. S3 is in a Global region unlike most of other AWS services (N. Virginia, Ohio etc.)
2. Bucket names have to be unique across AWS, and have to be DNS compliant


A. Create and Delete a Bucket
=============================
1. Create a Bucket
      Console => S3 => Create Bucket
        Bucket Name: Enter a unique, DNS compliant name
        Region: Select a Region    
2. Delete a Bucket
      Select Bucket => Delete => Copy and Paste Bucket Name into the Field => Delete


B. Private and Public Access
============================
1. S3 Buckets and their contents are Private by default // You need to explicitly make them public
2. Make the Buckets Public first
      Bucket Page => Permissions Tab => Block Public Access => Edit => Block all Public Access (uncheck)
3. Now you can individually make the Bucket contents Public


C. Versioning
=============
1. Versioning allows us to keep old copies of our objects
2. Versioning cannot be turned OFF once it is turned ON. You can only SUSPEND it
3. Turn ON Versioning
      Bucket Page => Properties Tab => Versioning => Enable Versioning      
4. Note that the first/initial copies of objects uploaded before Versioning was turned ON would have Version ID set to NULL 
5. New uploads after Versioning was turned ON would always have a Version ID
6. When you delete an object, the immediate previous version would be promoted to the "latest" version


D. Encryption
=============
1. This property does not affect existing objects in your S3 Bucket // Only new objects
2. Encryption properties can be set for a Bucket as well as individual objects
3. There are 3 State of Encryption in AWS
      None
      AES-256
      AWS-KMS
4. Turn ON encryption for a Bucket
      Bucket Page => Properties Tab => Default Encryption

      
E. S3 CLI
=========
1. Download AWS CLI on your computer
2. Common Commands
      List all Buckets
            aws s3 ls
      List all Folders and Objects in a Bucket
            aws s3 ls s3://bucket_name
      List all Folders and Objects in a Folder
            aws s3 ls s3://bucket_name/folder_name
      Download Object to my Desktop
            aws s3 cp s3://bucket_name/image.jpg ~/Desktop/image.jpg
      Upload Object to my S3 Bucket
            aws s3 cp ~/Desktop/image.jpg s3://bucket_name/image.jpg
      Create Presigned URL that expires in 300 seconds
            aws s3 presign s3://bucket_name --expires-in 300

3. Presigned URLs comes in handy when giving access to Private objects for a limited amount of time
   The command will generate a URL, which can be used to temporarily access the file


F. Lifecycle Rules/Policies
===========================
1. There are 7 Storage Classes available for storing objects in AWS S3. They come in different prices and availabilities
      Standard (Default), Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier, Glacier Deep Archive, and Reduced Redundancy (Not Recommended)
2. Storage classes can only be applied at Objects level // Not at Bucket level
3. Set Object Storage Class: Individually
      Select Object => Properties => Storage Class => Select Staorage Class
      
4. Set Object Storage Class: Bulk (Automate)
      Bucket Page => Management Tab => Lifecycle => Add Lifecycle Rule
            Rule Name: Enter a Rule Name (My30DayRule)
            Choose Storage Class: Current Version
                  Transition: Select preferred Transition (Transition to Standard-IA)
                  Days after Creation: 30 Days // Minimum value allowed
          

G. S3 Cross-Region Replication
==============================
1. This covers replicating a Bucket's content to another Bucket, which could be in another Region
2. Ensure you have versioning turned ON in both Source and Destination Buckets
3. Set Cross-Region Replication
      Bucket Page => Management Tab => Replication => Add Rule 
            You can change Storage Class for the Destination Bucket to save money (Standar-IA)
            You can also change Bucket Ownership in Destination to Destination Bucket's Owner
            IAM Role
            Enter Rule Name (S3 Access Policy)
 

H. Bucket Policy
================












