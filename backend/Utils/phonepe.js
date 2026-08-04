const sha256 = require("sha256");

const generateChecksum = (
  payloadMain,
  endpoint,
  saltKey,
  saltIndex
) => {

  const string =
    payloadMain + endpoint + saltKey;

  const sha256Value = sha256(string);

  return (
    sha256Value + "###" + saltIndex
  );
};

module.exports = {
  generateChecksum,
};