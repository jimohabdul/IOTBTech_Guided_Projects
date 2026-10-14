variable "aws_region" {
  description = "AWS region for resources"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "subnet_cidr" {
  description = "CIDR block for the public subnet"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance size"
  type        = string
}

variable "key_name" {
  description = "Name of the existing AWS SSH key pair"
  type        = string
}
