variable "azure_short_name" {
  type        = string
  description = "Short name passed by MACH. Will not be more than 10 characters"
}

variable "azure_name_prefix" {
  type = string
}

variable "azure_subscription_id" {
  type = string
}

variable "azure_tenant_id" {
  type = string
}

variable "azure_service_object_ids" {
  type        = map(string)
  default     = {}
  description = "Map of object ids that should have access to the keyvaults. (f.e. jenkins + developers)"
}

variable "azure_region" {
  type        = string
  default     = ""
  description = "Region: Azure region"
}

variable "azure_resource_group" {
  type = object({
    name     = string
    location = string
  })
  description = "Information of the resource group the component should be created in"
}

variable "azure_app_service_plan" {
  type = object({
    id   = string
    name = string
  })
}

variable "azure_monitor_action_group_id" {
  type        = string
  description = "Azure Monitor action group to send alerts to."
  default     = ""
}


variable "azure_endpoint_main" {
  type = object({
    url          = string
    frontdoor_id = string
  })
}


variable "tags" {
  type        = map(string)
  default     = {}
  description = "Additional tags (e.g. `map('BusinessUnit','XYZ')`"
}

variable "component_version" {
  type        = string
  description = "Version to deploy"
}

variable "environment" {
  type        = string
  description = "Specify what environment it's in (e.g. `test` or `production`)"
}

variable "site" {
  type        = string
  description = "Identifier of the site."
}

variable "ct_project_key" {
  type = string
}

variable "ct_api_url" {
  type    = string
  default = ""
}

variable "ct_auth_url" {
  type    = string
  default = ""
}

variable "ct_stores" {
  type = map(object({
    key       = string
    variables = any
    secrets   = any
  }))
  default = {}
}

variable "variables" {
  type        = any
  description = "Generic way to pass variables to components. Some of these can also be used as environment variables."
}

variable "secrets" {
  type        = any
  description = "Map of secret values. Will be put in the key vault."
  default     = {}
}
