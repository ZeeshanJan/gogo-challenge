import * as dotenv from "dotenv";
dotenv.config();

const alchemyKey = process.env.ALCHEMY_GOERLI_KEY || "";

const config = {
  
    MATIC_MUMBAI_URL: "https://rpc-mumbai.maticvigil.com/v1/c47616be21a0b8fd38911415127da912c8d2a799",
  
    MATIC_MAINNET_URL:
      "https://rpc-mainnet.maticvigil.com/v1/c47616be21a0b8fd38911415127da912c8d2a799",
  
    LOCALHOST: "HTTP://127.0.0.1:8545",
  
    ALCHEMYURL: "https://eth-rinkeby.alchemyapi.io/v2/hKOK2kDWPVZlnUJKMxFTwvMNjAwkkrvX",
  
    ropstenUrl: "https://eth-rinkeby.alchemyapi.io/v2/kptReX_G_sWqY6cFegek-y29-m-bzPyw",

    goerliURL: "https://eth-goerli.g.alchemy.com/v2/"+alchemyKey,
  };
  
  export default config;