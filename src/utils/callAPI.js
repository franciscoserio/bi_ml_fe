import Cookies from 'universal-cookie';
import axios from "axios";

// API host
const host = 'http://localhost:8090';

// Get cookies
const cookies = new Cookies();
const token = 'Bearer '.concat(cookies.get('token'))

// Get headers
const header = {
    headers: { 'Authorization': token }
};

export default {

    // querying
    querying: (id, query) => {
        return axios.post(
            host + "/api/datasource/query",
            {
                id: id,
                query: query
            },
            header
          )
    },

    // test datasource
    testDatasource: (name, database_name, db_host, password, port, user, database) => {
        return axios.post(
            host + "/api/datasource/test",
            {
                name: name,
                database_name: database_name,
                host: db_host,
                password: password,
                port: port,
                ssl: 0,
                user: user,
                tenant: "b374f9f4-f012-47f4-ad27-2a44cf03dea6",
                database: database
            },
            header
          )
    },

    // add datasource
    addDatasource: (name, database_name, db_host, password, port, user, database) => {
        return axios.post(
            host + "/api/datasource",
            {
                name: name,
                database_name: database_name,
                host: db_host,
                password: password,
                port: port,
                ssl: 0,
                user: user,
                tenant: "b374f9f4-f012-47f4-ad27-2a44cf03dea6",
                database: database
            },
            header
          )
    },

    // Get all datasources
    getDatasources: () => {
        return axios.get(
            host + "/api/datasource",
            header
          )
    },

    // Get all databases
    getDatabases: () => {
        return axios.get(
            host + "/api/database",
            header
          )
    },

    // Get all tenants
    getTenants: () => {
        return axios.get(
            host + "/api/tenant",
            header
          )
    },

    // Check login
    checkLogin: () => {
        return axios.get(
            host + "/api/checklogin",
            header
          )
    },

    // Login
    Login: (username, password) => {
        return axios.post(
            host + "/api/auth/signin",
            {
                username: username,
                password: password
            },
            {
                withCredentials: false
            }
          )
    }

  }