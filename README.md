# server en express con typescript mysql y mysql ssh

>- se crea una apiRestFull para aprender typescript
>- la funcionalidad se centra en proveer de un usuario que posee cuentas
>- las cuentas se acceden mediante el inicio de sesión del usuario
>- el usuario es unico

## dependencias externas
>- [mysql-server v:8.1.0](https://dev.mysql.com/downloads/mysql/)
>- [mysql-server linux](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04-es)
>>- [nodejs v:18.17.0](https://nodejs.org/es)
>>- [openssh for windows](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_overview)

## dependencias internas
>- crear un archivo ServerEnums que contiene los datos para las conexiones a la base de datos
##_EJM_
>>- crear una carpeta dentro de => `src`, denominada: `configs`
>>- dentro de la carpeta crear un archivo:
```js
export enum ServerApiEnum{
    PORT = puerto para express server,
    SSH_PORT = puerto de ssh; default = 22
    HOST = host local de mysql,
    HOST_SSH = host de mysql por ssh,
    USER_1 = usuario 1 de local mysql,
    USER_2 = usuario 2 de local mysql,
    USER_SSH = usuario de server ssh,
    USER_SSH_DB = usuario de ssh mysql,
    PASSWORD_USER_1 = contraseña usuario 1 mysql local,
    PASSWORD_USER_2 = contraseña usuario 2 mysql local,
    PASSWORD_USER_SSH = contraseña usuario ssh,
    PASSWORD_USER_SSH_DB = contraseña usuario mysql ssh,
    CONECTION_LIMIT = limite de conexiones para el pool,
    QUEUE_LIMIT = limite de consultas para el pool
}
```
## Uso e instalación

>>- revisar el archivo `package.json` para verificar las dependencias de nodejs
>>- instalar las dependencias con el comando: `npm istall`
