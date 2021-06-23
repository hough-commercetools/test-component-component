resource "azurerm_key_vault" "main" {
  name                        = replace(format("%s-kv-%s", var.azure_name_prefix, var.azure_short_name), "-", "")
  location                    = var.azure_resource_group.location
  resource_group_name         = var.azure_resource_group.name
  enabled_for_disk_encryption = true
  tenant_id                   = var.azure_tenant_id
  sku_name                    = "standard"

  tags = var.tags
}


resource "azurerm_key_vault_access_policy" "service_access" {
  for_each = var.azure_service_object_ids
  
  key_vault_id = azurerm_key_vault.main.id
  tenant_id = var.azure_tenant_id
  object_id = each.value

  secret_permissions = [
    "get",
    "list",
    "set",
    "delete"
  ]
}

resource "azurerm_key_vault_access_policy" "function_app" {
  key_vault_id = azurerm_key_vault.main.id

  tenant_id = var.azure_tenant_id
  object_id = azurerm_function_app.main.identity.0.principal_id

  secret_permissions = [
    "get",
    "list",
    "set",
    "delete"
  ]
}

resource "azurerm_key_vault_secret" "secrets" {
  for_each = var.secrets

  name         = replace(each.key, "_", "-")
  value        = each.value
  key_vault_id = azurerm_key_vault.main.id
  tags         = var.tags

  depends_on = [
    azurerm_key_vault_access_policy.service_access,
  ]
}

resource "azurerm_key_vault_secret" "ct_client_secret" {
  name         = "ct-client-secret"
  value        = commercetools_api_client.main.secret
  key_vault_id = azurerm_key_vault.main.id
  tags         = var.tags

  depends_on = [
    azurerm_key_vault_access_policy.service_access,
  ]
}
