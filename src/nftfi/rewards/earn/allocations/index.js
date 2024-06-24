/**
 * @class
 * Class for working with Earn allocations.
 */
class RewardsEarnAllocations {
  #account;
  #helper;
  #api;
  #result;
  #error;
  #assertion;

  constructor(options = {}) {
    this.#account = options?.account;
    this.#helper = options?.helper;
    this.#api = options?.api;
    this.#result = options?.result;
    this.#error = options?.error;
    this.#assertion = options?.assertion;
  }

  /**
   * Gets Earn points for your account.
   *
   * @param {object} options - Hashmap of config options for this method
   * @param {object} [options.account.address] - The account address to get the allocations of (optional)
   * @param {string} [options.season.id] - The season id to get the allocations of (optional)
   *
   * @returns {Object} An object containing information about your Earn allocations.
   *
   * @example
   * // Get your Earn reward allocation
   * const points = await nftfi.rewards.earn.allocations.get();
   * const points = await nftfi.rewards.earn.allocations.get({ account: { address: walletAddress } });
   * const points = await nftfi.rewards.earn.allocations.get({ season: { id: seasonId } });
   */
  async get(options) {
    try {
      if (!options?.account?.address) {
        this.#assertion.hasAddress(
          'Account address required, please provide a value in options.account.address or on sdk initialization.'
        );
      }
      const accountAddress = options?.account?.address || this.#account.getAddress();
      const response = await this.#api.get(
        {
          uri: `v0.1/rewards/earn/allocations/${accountAddress}`,
          params: this.#helper.getParams(options)
        },
        options?.httpOptions
      );
      return this.#result.handle(response);
    } catch (e) {
      return this.#error.handle(e);
    }
  }

  /**
   * Gets Earn points for the first 100 accounts sorted by rank.
   *
   * @param {string} [options.season.id] - The season id to get the allocations of (optional)
   * @returns {Object} An array containing objects about user's Earn allocations.
   *
   * @example
   * const list = await nftfi.rewards.earn.allocations.list();
   * const list = await nftfi.rewards.earn.allocations.list({ season: { id: seasonId } });
   */
  async list(options = {}) {
    try {
      const list = await this.#api.get({
        uri: 'v0.1/rewards/earn/allocations',
        params: this.#helper.getParams(options)
      });

      return this.#result.handle(list);
    } catch (e) {
      return this.#error.handle(e);
    }
  }
}

export default RewardsEarnAllocations;
