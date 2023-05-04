require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { networkConfig } = require("../helper-hardhat-config")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy } = deployments;
    console.log("Wallet Ethereum Address:", wallet.address)
    const chainId = network.config.chainId
    const tokensToBeMinted = networkConfig[chainId]["tokensToBeMinted"]

    
    //deploy Simplecoin
    const stableDiffusionCaller = await deploy("StableDiffusionCallerV2", {
        from: wallet.address,
        args: ["0x489656E4eDDD9c88F5Fe863bDEd9Ed0Dc29B224c"],
        log: true,
    });
}