#!/bin/bash
set -e

echo "=== Step 1: Fetching EC2 Public IP from Terraform ==="
cd terraform
EC2_IP=$(terraform output -raw ec2_public_ip)
cd ..

if [ -z "$EC2_IP" ]; then
  echo "Error: Could not retrieve IP from Terraform."
  exit 1
fi

echo "Discovered Server IP: ${EC2_IP}"

echo "=== Step 2: Generating Dynamic Ansible Inventory ==="
cat << INVENTORY > ansible/inventory.ini
[webserver]
${EC2_IP} ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/devops-key.pem ansible_ssh_common_args='-o StrictHostKeyChecking=no'
INVENTORY

echo "=== Step 3: Running Ansible Playbook ==="
ansible-playbook -i ansible/inventory.ini ansible/playbook.yml

echo "=== Deployment Completed Successfully! ==="
