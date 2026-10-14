# Phase 1: Provision AWS Infrastructure with Terraform & Ansible

## Objective
Use Terraform to provision an AWS EC2 instance along with networking components, and use Ansible to configure the server environment.

## Deliverables & Structure
*   `terraform/`: Contains configuration files (`main.tf`, `variables.tf`, `outputs.tf`) for VPC, Subnet, Security Groups, and EC2 instances.
*   `ansible/`: Contains automated playbooks to update the server and install Docker.
*   `screenshots/`: Contains visual verification of the running EC2 instance and successful Ansible provisioning logs.