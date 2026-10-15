# ZeetaFin Cloud and DevOps Project (IOTBTECH2026)

A three-phase guided project that provisions AWS infrastructure as code, containerizes a full-stack application, and deploys it automatically with a CI/CD pipeline.

**End-to-end flow**

```
Terraform ──► AWS EC2 server ──► Ansible installs Docker
                                        │
App code ──► Docker images ──► Amazon ECR ──► EC2 pulls and runs
   ▲                                  ▲
   └── git push ──► GitHub Actions ───┘  (build, push, deploy)
```

## The three phases

| Phase | What it does | Folder |
|---|---|---|
| 1 | Terraform builds the VPC, subnet, security group and EC2 instance; Ansible updates the server and installs Docker | [Phase 1](Phase%201%20-%20AWS%20Infrastructure%20with%20Terraform%20and%20Ansible/) |
| 2 | Dockerfiles for the NestJS backend and Next.js frontend, tested locally and pushed to Amazon ECR | [Phase 2](Phase%202%20-%20Containerization%20and%20Amazon%20ECR%20Deployment/) |
| 3 | GitHub Actions builds both images, pushes them to ECR and deploys them to EC2 on every push to `main` | [Phase 3](Phase%203%20-%20CICD%20Pipeline%20and%20Automated%20AWS%20Deployment/) |

Each folder has its own README with the steps, commands and screenshot evidence.

## Tech stack

| Area | Tools |
|---|---|
| Infrastructure as code | Terraform |
| Configuration management | Ansible |
| Cloud | AWS (VPC, EC2, ECR, IAM) |
| Containers | Docker, `node:18-alpine`, PostgreSQL 15 |
| CI/CD | GitHub Actions |
| Application | NestJS (backend), Next.js 14 (frontend) |

## Repository layout

```
.
├── .github/workflows/deploy.yml     # CI/CD pipeline
├── Phase 1 - AWS Infrastructure with Terraform and Ansible/
├── Phase 2 - Containerization and Amazon ECR Deployment/
├── Phase 3 - CICD Pipeline and Automated AWS Deployment/
└── README.md
```

## How the pipeline works

1. A push to `main` triggers the workflow (documentation-only changes are ignored).
2. Both images are built and pushed to ECR, tagged with the commit SHA and `latest`.
3. The pipeline connects to the EC2 server over SSH and logs it in to ECR with a short-lived token.
4. The server pulls the new images, replaces the old containers, and a health check confirms the application responds.

## Security practices

- No secrets in the repository: credentials are GitHub Secrets, and `.env*`, `*.pem`, Terraform state and `inventory.ini` are git-ignored.
- SSH is restricted to a single IP; PostgreSQL is never exposed to the internet.
- Images are tagged by commit SHA so every release is traceable and can be rolled back.
- Containers run as a non-root user and restart automatically.

## Notes and limitations

- The application code in Phase 2 is the compiled build output recovered from previously built images, not the original TypeScript and React source.
- The Phase 1 Terraform state file was lost, so Terraform should not be re-applied against the existing server. A remote state backend (S3 with locking) is the recommended fix.
- The pipeline uses long-lived IAM keys; a least-privilege IAM user or OIDC would be better.

## Cost note

The EC2 instance and Elastic IP are billed while they exist. When the project is finished, terminate the instance first, then release the Elastic IP.