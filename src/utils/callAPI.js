import Cookies from 'universal-cookie';
import axios from "axios";

// API host
const host = 'http://localhost:8080';

// Get cookies
const cookies = new Cookies();
const token = 'Bearer '.concat(cookies.get('token'))
const tenant = '14043f3e-5d20-4a26-8170-8f0593cbabe3'

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
    getTenants: (limit, page) => {
        return axios.get(
            host + "/api/tenants?limit=" + limit + "&page=" + page,
            header            
          )
    },

    // Get all devices
    getDevices: (limit, page) => {
        return axios.get(
            host + "/api/" + tenant + "/devices?limit=" + limit + "&page=" + page,
            header            
          )
    },

    // Login
    Login: (email, password) => {
        return axios.post(
            host + "/api/login",
            {
                email: email,
                password: password
            },
            {
                withCredentials: false
            }
          )
    }

  }