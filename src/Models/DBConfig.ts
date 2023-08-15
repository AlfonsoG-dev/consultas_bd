import { ServerApiEnum } from "./ServerEnums";

export class DbConfig {
    private ssh_port: Readonly<number> = ServerApiEnum.SSH_PORT;
    private host: Readonly<string> = ServerApiEnum.HOST;
    private ssh_host: Readonly<string> = ServerApiEnum.HOST_SSH;
    private user_test: Readonly<string> = ServerApiEnum.USER_1;
    private user_root: Readonly<string> = ServerApiEnum.USER_2;
    private ssh_user: Readonly<string> = ServerApiEnum.USER_SSH;
    private ssh_user_db: Readonly<string> = ServerApiEnum.USER_SSH_DB;
    private password_1: Readonly<string> = ServerApiEnum.PASSWORD_USER_1;
    private password_2: Readonly<string> = ServerApiEnum.PASSWORD_USER_2;
    private ssh_user_password: Readonly<string> = ServerApiEnum.PASSWORD_USER_SSH;
    private ssh_user_password_db: Readonly<string> = ServerApiEnum.PASSWORD_USER_SSH_DB;
    private connection_limit: Readonly<number> = ServerApiEnum.CONECTION_LIMIT;
    private queue_limit: Readonly<number> = ServerApiEnum.QUEUE_LIMIT;

    get normal_config() {
        return {
            host: this.host,
            user: this.user_test,
            password: this.password_1
        }
    }
    get pool_config() {
        return {
            host: this.host,
            user: this.user_root,
            password: this.password_2,
            connectionLimit: this.connection_limit,
            maxIdle: this.connection_limit,
            queueLimit: this.queue_limit
        }
    }
    get db_server_config(){
        return {
            host: 'localhost',
            port: 3306,
            user: 'pym',
            password: '5x5W12',
            database: 'consulta'
        }
    }
}
