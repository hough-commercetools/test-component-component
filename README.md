# test-component-component

Just a dumb function to test MACH composer

# Usage

Use the following attributes to configure this component in MACH:

```yaml
sites:
  - identifier: some-site
    components:
    - name: test-component
      variables:
        ...

...

components:
- name: test-component
  source: ...
  endpoints:
    main: ...
  version: <git hash of version you want to release>
```

## Required endpoints

- **`main`**<br>
  Description


# Getting started

Create a virtualenv and install the dev dependencies.

`make install`

Make sure you have the following installed:

- azure cli: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
- azure functions core tools: https://github.com/Azure/azure-functions-core-tools


## Code style

The Python source code should be formatted using [black](https://github.com/python/black) and isort.
You can use `make format` to run them.

This project uses [pre-commit](https://pre-commit.com) to validate the changed
files before they are committed. You can install it on MacOS using brew:

    $ brew install pre-commit

In the repository you need to register the hooks in git the first time using:

    $ pre-commit install

The pre-commit config (`.pre-commit-config.yaml`) currently runs black and
flake8.


## Development

You'll need to have the Azure functions core tools installed to be able to run the function locally;

    $ brew tap azure/functions
    $ brew install azure-functions-core-tools@3


And create a `local.settings.json` based on the example:

    $ cp local.settings.example.json local.settings.json

Or retrieve it from Azure:

    $ func azure functionapp fetch-app-settings <name of the function>

## Run the function
The function can be run locally by running

`func start --python`