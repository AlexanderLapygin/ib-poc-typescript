import fetch from "isomorphic-unfetch";
import Router from 'next/router'
import { login } from "../utils/auth";

const api = false;

export default function(req) {
//  console.log('service: req = ' + JSON.stringify(req));
  console.log('service: req.url = ' + req.url);

  const serviceImpl = api ? apiService : hardcodeService;
  return serviceImpl(req);
}

const apiService = function (req) {
  const {url} = req;
  
  console.log('service.apiService: url = ' + url);

  if (url.indexOf("/api/login") != -1) {
    return serverLogin(req);
  } else if (url.indexOf("/api/logout") != -1) {
    return serverLogout(req);
  } else if (url.indexOf("/api/contract") != -1) {
    if (url.indexOf("/api/contract/details") == -1) {
      return serverContract(req);
    }
  } else {
    console.log('Unkonwn url: ' + url);
  }
}

const serverLogin = async (req) => {
  const {url, username, password} = req;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    .catch((error) => null);

    if (response.ok) {
      const responseJson = await response.json();
      login(responseJson);

      // TODO Переложить cookies из response в браузер !!!

      //...
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      //return Promise.reject(error); //TODO how about exception on 404 ?
    }
  } catch (error) {
    throw new Error(error);
  }  
}

const serverLogout = async (req) => {
  const {url} = req;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const jsonResult = await response.json()
      return jsonResult
    } else {
      return redirectOnError()
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError()
  }
}

// serverContract

const redirectOnError = (ctx) =>
process.browser
  ? Router.push('/login')
  : ctx.res.writeHead(301, { Location: '/login' })

const serverContract = async (req) => {
  try {
    const response = await fetch(req.url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('service.serverContract: response = ' + JSON.stringify(response));
    if (response.ok) {
      const jsonResult = await response.json()
      console.log('service.serverContract: jsonResult = ' + jsonResult);
      return jsonResult
    } else {
      return redirectOnError(req.ctx)
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError(req.ctx)
  }
}

let currentUser = "";

const hardcodeService = function (req) {
  const {url} = req;
  console.log('Hardcore');
  console.log("api.index.js: req.url = " + req.url);

  if (url.indexOf("/api/login") != -1) {
    return hardcodeServerLogin(req);
  } else if (url.indexOf("/api/credit") != -1) {
    return credit(req, res);
  } else if (url.indexOf("/api/logout") != -1) {
    return hardcodeServiceLogout(req);
  } else if (url.indexOf("/api/contract") != -1) {
    if (url.indexOf("/api/contract/details") == -1) {
      return hardcodeServiceContract(req);
    } else {
      return contractDetails(req, res);
    }
  } else {
    send(res, 404, "404. Not found.");
  }
};

const hardcodeServerLogin = req => {
  const response = hardcodeServiceLogin(req);
  if (response.statusCode === 200) {
    console.log('service.hardcodeServerLogin: response = ' + JSON.stringify(response))
    login(response.result);
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    //return Promise.reject(error); //TODO how about exception on 404 ?
  }
}

const LOGIN_ERROR = {
  "error_code": 4,
  "error_description": "Login failed",
  "error_message": "Указан неверный логин или пароль"
};

const AUTORIZATION_REQUIRED = {
  "error_code": 10,
  "error_description": "You have to authorize in system",
  "error_message": "Требуется авторизация для выполнения операции",
  "status_code": 401
};

const ARENAV2_LOGIN_SUCCESS = {
  "operator_id": 304762064,
  "first_name": "Арен",
  "patronymic": "Варужанович",
  "last_name": "Асламазян",
  "mobile_phone": "79062190888",
  "addresses": [
    {
      "address_type_code": "FACT",
      "value": "236001, КАЛИНИНГРАДСКАЯ ОБЛ, КАЛИНИНГРАД Г, СОГЛАСИЯ УЛ, дом 8, квартира 8"
    },
    {
      "address_type_code": "REG",
      "value": "238530, КАЛИНИНГРАДСКАЯ ОБЛ, ЗЕЛЕНОГРАДСКИЙ Р-Н, ЗЕЛЕНОГРАДСК Г, ПОБЕДЫ УЛ, дом 1, квартира 11"
    }
  ]
}

const SELIVANOVA_LOGIN_SUCCESS = {
  "operator_id": 101004863,
  "first_name": "Тамара",
  "patronymic": "Александровна",
  "last_name": "Селиванова",
  "mobile_phone": "79069619790",
  "addresses": [
    {
      "address_type_code": "FACT"
    },
    {
      "address_type_code": "REG"
    }
  ]
}

let result;

const hardcodeServiceLogin = req => {
  const {username, password} = req;

  let statusCode = 404;

  if(username === 'arenav2') {
    if(password === '123') {
      currentUser = username;
      result = ARENAV2_LOGIN_SUCCESS;
      statusCode = 200;
    } else {
      result = LOGIN_ERROR;
    }
  } else if(username === 'Selivanova') {
    if(password === '123') {
      currentUser = username;
      result = SELIVANOVA_LOGIN_SUCCESS;
      statusCode = 200;
    } else {
      result = LOGIN_ERROR;
    }
  } else {
    result = LOGIN_ERROR;
  }

  let response = {statusCode, result}
  console.log(`api/index/login: response = ${JSON.stringify(response)}`);
  return response;
}

const hardcodeServiceLogout = async (req) => {
  console.log('api/index: logout');
  const LOGOUT_SUCCESS = {
    "success": "OK"
  }

  statusCode = 200;

  currentUser = ""

  return {statusCode, loginResult: result};
}


let statusCode;

const hardcodeServiceContract = async (req) => {
  let contractResult;

  const SELIVANOVA_CONTRACT =
  [
    {
      "contract_type": "Потребительский",
      "contract_type_code": "P",
      "credit_date": "20.10.2008",
      "credit_sum": 14019.75,
      "contract_currency": "RUR",
      "is_debt_overdue_sum": false,
      "is_assignment": false,
      "is_closed": 1,
      "contract_number": "22011652619",
      "actual_date": "22.03.2018"
    },
    {
      "contract_type": "Потребительский",
      "contract_type_code": "P",
      "credit_date": "25.12.2008",
      "credit_sum": 27517,
      "contract_currency": "RUR",
      "is_debt_overdue_sum": false,
      "is_assignment": false,
      "is_closed": 1,
      "contract_number": "22012245090",
      "actual_date": "22.03.2018"
    },
    {
      "contract_type": "Потребительский",
      "contract_type_code": "P",
      "credit_date": "28.12.2009",
      "credit_sum": 30677,
      "contract_currency": "RUR",
      "is_debt_overdue_sum": false,
      "is_assignment": false,
      "is_closed": 1,
      "contract_number": "22014068603",
      "actual_date": "22.03.2018"
    }
  ];

  const ARENAV2_CONTRACT = [
    {
      "contract_type": "Автокредит",
      "contract_type_code": "A",
      "credit_date": "01.04.2012",
      "credit_sum": 549298,
      "contract_currency": "RUR",
      "is_debt_overdue_sum": false,
      "is_assignment": false,
      "is_closed": 0,
      "contract_number": "959935",
      "actual_date": "21.11.2017"
    }
  ];

  console.log('api/contract: currentUser =' + currentUser);

  if(currentUser === 'arenav2') {
    contractResult = ARENAV2_CONTRACT;
    statusCode = 200;
  } else if(currentUser === 'Selivanova') {
    contractResult = SELIVANOVA_CONTRACT;
    statusCode = 200;
  } else {
    contractResult = AUTORIZATION_REQUIRED;
    statusCode = 401;
    return redirectOnError(req.ctx)
  }

  console.log(`api/contract: contractResult = ${JSON.stringify(contractResult)}`);
  return contractResult;
}
