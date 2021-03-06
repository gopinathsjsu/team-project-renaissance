import axios from "axios";

const API_URL = "http://localhost:8081/api/";

class AccountService {
  create(account_type, account_balance, username) {
    return axios.post(API_URL + "addAccount", {
      account_type,
      account_balance,
      username
    }).then(response => {
      return response.data;
    });
  }

  getAll() {
    return axios.get(API_URL + `fetchAllAccounts/`, {})
  }

  // TODO: id shgould be a part of body
  update(id, account_type) {
    return axios.put(API_URL + `updateAccount/${id}`, {

    })
  }

  // updateBeneficiaryAccountBalance(beneficiary_account_number, transaction_amount) {
  //   return axios.post(API_URL + 'updateBeneficiaryAccountBalance/',{
  //     data: {
  //       beneficiary_account_number: beneficiary_account_number,
  //       transaction_amount: transaction_amount
  //     }
  //   })
  // }

  // updatePayeeAccountBalance(payee_account_number, transaction_amount) {
  //   return axios.post(API_URL + 'updatePayeeAccountBalance/', {
  //     data: {
  //       payee_account_number: payee_account_number,
  //       transaction_amount: transaction_amount
  //     }
  //   })
  // }

  getAccountNumber(username) {
    return axios.get(API_URL + 'getAccountNumber/', {
      params: {username: username}
    })
  }

  fetchAccountBalance(id) {
    return axios.get(API_URL + 'fetchAccountBalance/', {
      data: {account_number: id}
    })
  }


  getOne(id) {
    return axios.get(API_URL + `fetchAccount/`, {
      data: {
        username: id
      }
    })
  }

  delete(id) {
    return axios.delete(API_URL + `deleteAccount/`, {
      data: {
        account_number: id
      }
    })
  }

  getAccountsForUser(username) {
    return axios.get(API_URL + `fetchBalanceFromUserName`, {
      params: {
        username: username
      }
    })
  }


withdraw(uname, withdraw) {
  return axios.post(API_URL + 'withdraw/', {
    params: {
      account_number: uname,
      amount: withdraw
    }
  })
}

deposit(uname, deposit) {
  return axios.post(API_URL + 'deposit/', {
    data: {
      account_number: uname,
      amount: deposit
    }
  })
}

}
export default new AccountService();
