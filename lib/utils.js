const utils = {
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  getPageTitle(string) {
    return utils.capitalize(string.split('/')[1]);
  }
};

module.exports = utils;
