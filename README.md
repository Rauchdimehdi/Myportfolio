# Myportfolio
## Summary
I decided to create my own portfolio website to showcase my projects.
I created then a Devops pipeline for the CI/CD from my github repository to [S3 Bucket where I hosted my profile](https://youtu.be/21endzyDgkQ)

## Step 1 
1. Create a instance on AWS
2. install Jenkins : [pkg.jenkins.io](https://pkg.jenkins.io/)
I decided to install Jenkins-stable Redhat Packages 
    > sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
    sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
    yum install jenkins
3. start jenkins :
    > systemctl start jenkins
    > systemctl status jenkins to confirm that jenkins was started
    > <instance_public_ip>:8080 
    on your browser to access to jenkins. Create an account and install packages













## Links:
[Hosting a static website for free on AWS S3](https://youtu.be/21endzyDgkQ)