import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  // Init the NFTfi SDK
  const nftfi = await NFTfi.init({
    config: { api: { key: process.env.NFTFI_SDK_API_KEY } },
    ethereum: {
      account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_LENDER_ACCOUNT_PRIVATE_KEY },
      provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
    }
  });
  // Get loans
  const response = await nftfi.loans.get({
    filters: {
      lender: {
        address: nftfi.account.getAddress()
      },
      status: 'active'
    }
  });
  const loans = response.data.results;

  console.log(`[INFO] found ${loans.length} active loan(s) for account ${nftfi.account.getAddress()}.`);
  if (loans.length > 0) {
    for (var i = 0; i < loans.length; i++) {
      const loan = loans[i];
      console.log(`[INFO] on ${nftfi.config.website.baseURI}/assets/${loan.nft.address}/${loan.nft.id}`);
    }
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
