resource "commercetools_api_client" "main" {
  name  = "${var.azure_name_prefix}_test-component"
  scope = local.ct_scopes
}



data "azurerm_function_app_host_keys" "function_keys" {
  name                = azurerm_function_app.main.name
  resource_group_name = var.azure_resource_group.name
  depends_on = [
    azurerm_function_app.main
  ]
}

locals {
  function_app_key = data.azurerm_function_app_host_keys.function_keys.default_function_key
}

resource "commercetools_api_extension" "main" {
  key = "create-order"

  destination = {
    type                 = "http"
    url                  = "https://${azurerm_function_app.main.name}.azurewebsites.net/ct_api_extension"
    azure_authentication = local.function_app_key
  }

  trigger {
    resource_type_id = "order"
    actions          = ["Create"]
  }

  depends_on = [
    azurerm_function_app.main
  ]
}
