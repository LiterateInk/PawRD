import { cookiesObjectToString } from "~/utils/cookies";
import { createEndpointURL } from "~/utils/endpoints";
import { findAndReadGecData } from "~/utils/finders";

export interface OnlinePayments {
  /** Homepage relative link. */
  homePageLink: string
  /** Logout relative link. */
  logoutPageLink: string

  walletConfig: {
    minReloadAmount: number
    maxReloadAmount: number
  }

  /** @example "Europe/Paris" */
  gecTimeZone: string

  sessionDuration: number
  siteName: string

  paymentConfigurationArray: Array<PaymentConfiguration>

  /**
   * Whether we're on a mobile device or not.
   * Probably uses the User-Agent to know.
   */
  mobile: boolean

  /** Probably useless. */
  page: string

  user: User
  walletData: Array<WalletData>
  feesData: Array<unknown> // TODO
}

export interface PaymentConfiguration {
  gecTimeZone: string
  xml_message_version: string
  sessionDuration: number
  minReloadAmount: number
  maxReloadAmount: number
  uid: number
  scellius_plugin_path: string
  scellius_etab_configuration_path: string
  paymentid: string
  payline_file_log: string
  internal_site_description: string
  reloadingDisablingStart: number
  reloadingDisablingEnd: number
  reloadingDisabled: boolean
  reload_isReloadingEnabled: boolean
  external_siteId: number
}

export interface User {
  isGuardian: boolean
  isComensal: boolean
  firstName: string
  lastName: string
  /** Empty string when not given. */
  email: string
  /** User ID. */
  uid: number
  associatedSite: number
  sessionTransactions: Array<unknown> // TODO
}

export type WalletData = {
  /** User ID. */
  ownerUid: number
  updateTimeStamp: number
  walletUid: number
  walletAmount: number
  walletConfig: Array<number>
  isUserInputAllowed: boolean
  externalSiteId: number
  paymentMode: "credit"
} & (
  | { walletName: "CAFETARIA", walletOrid: 3 }
  | { walletName: "RESTAURATION", walletOrid: 2 }
);

export const getOnlinePayments = async (schoolID: string, cookies: Record<string, string>): Promise<OnlinePayments> => {
  const response = await fetch(createEndpointURL(schoolID, "menu-utilisateur/paiement-en-ligne.html"), {
    headers: { "Cookie": cookiesObjectToString(cookies) }
  });

  const html = await response.text();
  return findAndReadGecData<OnlinePayments>(html);
};
