// TODO: Move inside the fetcher.
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

export { Authenticator } from "~/models/Authenticator";
export { Client } from "~/models/Client";

export { getOnlinePayments, type OnlinePayments, type WalletData, type PaymentConfiguration, type User } from "~/api/online-payments";
