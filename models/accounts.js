const fs = require('fs').promises;

class Account {
  async listAccount() {
    try {
      const { accounts } = JSON.parse(await fs.readFile('./data/accounts.json', "utf8"));
      
      if (accounts.length === 0)
        return [];

      return accounts;
    } catch (error) {
      return [];
    }

  };

  async addAccount({login, surname, email}) {
        
      const accountsJSON = JSON.parse(await fs.readFile('./data/accounts.json', "utf8"));
      const { accounts, accountsId } = accountsJSON;
      let id = accountsId;
        
      if(!accounts.every((account) => account.email !== email)) {
        throw "such email already exist";
      }
        
      
      accounts.push({id, login, surname, email});

      const list = {
        accountsId: ++id,
        accounts
      }

      await fs.writeFile('./data/accounts.json', JSON.stringify(list));          

  };

  async updateAccount({id, login, surname, email}) {

        
      const accountsJSON = JSON.parse(await fs.readFile('./data/accounts.json', "utf8"));
      const { accounts, accountsId } = accountsJSON;

      if(!accounts.every((account) => account.email !== email)) {
        throw "such email already exist";
      }
        
      
      let newAccounts = accounts.map((account) => (account.id === parseInt(id)) ?
          
          {id: parseInt(id), login, surname, email} :
          account);
      console.log(newAccounts);
      
      const list = {
        accountsId,
        accounts: newAccounts
      }

      await fs.writeFile('./data/accounts.json', JSON.stringify(list));          
  };

  async deleteAccount(id) {
    try {
      const { accounts, accountsId } = JSON.parse(await fs.readFile('./data/accounts.json', "utf8"));
      const accountsFilter = accounts.filter(account => account.id !== parseInt(id));
      const list = {
        accountsId,
        accounts: accountsFilter
      }

      await fs.writeFile('./data/accounts.json', JSON.stringify(list));

    } catch (error) {
        console.log(error);
    }
  };
}

module.exports = Account;