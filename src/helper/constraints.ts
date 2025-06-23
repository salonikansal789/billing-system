import { string } from "joi"

export interface IConfigApp { 
    port:number
jwtSecret:string
mysqlHost:string
mysqlUser:string
mysqlPassword:string
mysqlDatabse:string
mysqlPort:number

}