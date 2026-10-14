# ZeetaFin Full-Stack ERP - Cloud & DevOps Portfolio

Welcome to the **ZeetaFin Enterprise Resource Planning (ERP)** Cloud and DevOps project repository. This repository is structured into three main phases, demonstrating Infrastructure as Code, containerization, and automated CI/CD pipeline deployment.

---

## Project Phases & Navigation

*   ### [Phase 1: Provision AWS Infrastructure with Terraform & Ansible](./Phase%201%20-%20AWS%20Infrastructure%20with%20Terraform%20and%20Ansible)
    *   Provisioned an AWS VPC, Subnet, Security Group, and EC2 instance using Terraform.
    *   Configured the server automatically using Ansible playbooks to install and run Docker.

*   ### [Phase 2: Containerization and Amazon ECR Deployment](./Phase%202%20-%20Containerization%20and%20Amazon%20ECR%20Deployment)
    *   Containerized the Next.js frontend and NestJS backend applications with Docker.
    *   Tested, authenticated, and pushed application images to Amazon Elastic Container Registry (ECR).

*   ### [Phase 3: CI/CD Pipeline and Automated AWS Deployment](./Phase%203%20-%20CICD%20Pipeline%20and%20Automated%20AWS%20Deployment)
    *   Created an automated GitHub Actions workflow to build, push, and deploy updates to AWS EC2.
    *   Managed secure credentials safely using GitHub Secrets.