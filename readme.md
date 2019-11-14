pb-framework

## Tiene que tener una carpeta de framework
  - framework
  - client
  - server

## Eliminar .meanivan-conf y dar soporte a .env
## El sistema tiene que funcionar en cualquier ambiante: ejecutar como testing o como produccion (https://github.com/motdotla/dotenv-expand)
## Dar soporte a Fixtures
## Dar soporte a ES6
## Dar soporte para grunt o gulp
## Dar soporte para typeScript
## Dar soporte a Sass
## Dar soporte a Angualar 6
## Si .env no existe, el framework tiene que crearlo la primera vez que se levanta el servidor
## Eliminar la dependencia del modelo Environment y reemplazarlo por process.env
## dbClient tiene que estar adentro de la carpeta framework
## Actualizar todas las dependencias que se queja Git
## npm i dice: WARNING! this npm package "angular-ui-router" has been renamed to "@uirouter/angularjs".

### Meanivan

Welcome!

## Command line tools

In order to develop better and faster, use the command line tools provided in the framework. Simply run `$ meanivan` and follow the instructions.

```bash
$ meanivan help
```

## Reports

#### Linter
```bash
$ grunt lint
```

#### Test
```bash
$ mocha
```

#### Coverage
```bash
$ grunt coverage
```
