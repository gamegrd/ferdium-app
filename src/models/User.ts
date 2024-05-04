import { action, makeObservable, observable } from 'mobx';

interface IUser {
  id: string | null;
  email: string | null;
  firstname: string | null;
  lastname: string | null;
  organization: string | null;
  accountType: string | null;
  beta: boolean;
  locale: string;
  isSubscriptionOwner: boolean;
  team: object;
}

// TODO: Need to cleanup these fields since we have removed the tiers of the paid plans from Ferdium
export default class User {
  id: string | null = null;

  @observable email: string | null = null;

  @observable firstname: string | null = null;

  @observable lastname: string | null = null;

  @observable organization: string | null = null;

  @observable accountType: string | null = null;

  // Note: Kept around to be able to handle the response from Franz server
  // better assume it's confirmed to avoid noise
  @observable subscription = {};

  @observable isSubscriptionOwner = false;

  @observable beta = false;

  @observable balance = 0;

  @observable locale: string | null = null;

  @observable team = {};

  constructor(data: IUser) {
    makeObservable(this);

    if (!data) {
      throw new Error('User config not valid');
    }

    if (!data.id) {
      throw new Error('User requires Id');
    }
    this.balance = 0;
    this.id = data.id;
    this.email = data.email || this.email;
    this.firstname = data.firstname || this.firstname;
    this.lastname = data.lastname || this.lastname;
    this.organization = data.organization || this.organization;
    this.accountType = data.accountType || this.accountType;
    this.beta = data.beta || this.beta;
    this.locale = data.locale || this.locale;

    this.isSubscriptionOwner =
      data.isSubscriptionOwner || this.isSubscriptionOwner;

    this.team = data.team || this.team;
  }

  @action
  setBalance(balance: number) {
    this.balance = balance;
  }
}
