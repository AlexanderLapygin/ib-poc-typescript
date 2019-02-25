const { json, send } = require("micro");

let currentUser = "";

const dev = async (req, res) => {
  console.log("api.index.js: req.url = " + req.url);

  if(req.url.indexOf("/api/login") != -1) {
    return login(req, res);
  } else if(req.url.indexOf("/api/credit") != -1) {
    return credit(req, res);
  } else if(req.url.indexOf("/api/logout") != -1) {
    return logout(req, res);
  } else if(req.url.indexOf("/api/contract") != -1) {
    if(req.url.indexOf("/api/contract/details") == -1) {
      return contract(req, res);
    } else {
      return contractDetails(req, res);
    }
  } else {
    send(res, 404, "404. Not found.");
  }
};

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

let loginResult;

const login = async (req, res) => {
  console.log('api/index/login: BEFORE const { username } = await json(req)');
  const jsonRequest = await json(req)
  console.log('api/index/login: AFTER const { username } = await json(req)');
  const { username, password } = jsonRequest
  console.log(`api/index/login: username = ${username}`);
  console.log(`api/index/login: password = ${password}`);

  let statusCode = 404;

  if(username === 'arenav2') {
    if(password === '123') {
      currentUser = username;
      loginResult = ARENAV2_LOGIN_SUCCESS;
      statusCode = 200;
    }
  } else if(username === 'Selivanova') {
    if(password === '123') {
      currentUser = username;
      loginResult = SELIVANOVA_LOGIN_SUCCESS;
      statusCode = 200;
    }
  } else {
    loginResult = LOGIN_ERROR;
  }

  send(res, statusCode, loginResult)
}

const credit = async (req, res) => {
  const ARENAV2_PROFILE = {
    operator_id: 304762064,
    first_name: "Арен",
    patronymic: "Варужанович",
    last_name: "Асламазян",
    mobile_phone: "79062190888",
    addresses: [
      {
        address_type_code: "FACT",
        value:
          "236001, КАЛИНИНГРАДСКАЯ ОБЛ, КАЛИНИНГРАД Г, СОГЛАСИЯ УЛ, дом 8, квартира 8"
      },
      {
        address_type_code: "REG",
        value:
          "238530, КАЛИНИНГРАДСКАЯ ОБЛ, ЗЕЛЕНОГРАДСКИЙ Р-Н, ЗЕЛЕНОГРАДСК Г, ПОБЕДЫ УЛ, дом 1, квартира 11"
      }
    ]
  };

  send(res, 200, ARENAV2_PROFILE)
}

const logout = async (req, res) => {
  console.log('api/index: logout BEGIN');
  const LOGOUT_SUCCESS = {
    "success": "OK"
  }

  currentUser = ""
  send(res, 200, LOGOUT_SUCCESS)
  console.log('api/index: logout END');
}

const contract = async (req, res) => {
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

  console.log('api/index: contract: currentUser =' + currentUser);

  if(currentUser === 'arenav2') {
    contractResult = ARENAV2_CONTRACT;
    statusCode = 200;
  } else if(currentUser === 'Selivanova') {
    contractResult = SELIVANOVA_CONTRACT;
    statusCode = 200;
  } else {
    contractResult = AUTORIZATION_REQUIRED;
    statusCode = 401;
  }
  send(res, statusCode, contractResult)
}

const contractDetails = async (req, res) => {
  let contractDetailsResult;

  const ARENAV2_CONTRACT_DETAILS = {
    "contract_gid": 12716207,
    "contract_type": "Автокредит",
    "contract_type_code": "A",
    "credit_date": "01.04.2012",
    "credit_sum": 549298,
    "contract_currency": "RUR",
    "credit_period": 60,
    "debt_outstanding_sum": 122204.5,
    "debt_overdue_sum": 0,
    "show_schedule": 1,
    "show_repayment": 1,
    "show_payment_card_log": 1,
    "show_payment_card_button": 1,
    "payment_sum": 8370.38,
    "early_payment_date": "",
    "is_debt_overdue_sum": false,
    "is_fer_available": false,
    "last_payment_date": "23.10.2017",
    "last_payment": 8400,
    "full_credit_rate": 29.31,
    "is_enough_money_for_ep": false,
    "is_closed": 0,
    "percent_rate": 16.5,
    "date_closed": "01.03.2019",
    "rest_sum_with_hold": 0,
    "rest_sum_without_hold": 0,
    "balloon_prolongation_condition": 0,
    "debt_overdue_sum_without_interest": 0,
    "debt_overdue_interest": 0,
    "contract_number": "959935",
    "payment_by_credit_card": true,
    "account_number": "42301810900006625376",
    "actual_date": "21.11.2017"
  };

  const SELIVANOVA_CONTRACT_DETAILS =
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

  console.log('api/index: contractDetails: currentUser =' + currentUser);

  if(currentUser === 'arenav2') {
    contractDetailsResult = ARENAV2_CONTRACT_DETAILS;
    statusCode = 200;
  } else if(currentUser === 'Selivanova') {
    contractDetailsResult = SELIVANOVA_CONTRACT_DETAILS;
    statusCode = 200;
  } else {
    contractResult = AUTORIZATION_REQUIRED;
    statusCode = 401;
  }

  send(res, statusCode, contractDetailsResult)
}

module.exports = dev;
