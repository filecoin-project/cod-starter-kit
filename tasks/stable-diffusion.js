task(
    "stable-diffusion",
    "Sends a prompt to stable diffusion running on Bacalhau."
  )
    .addParam("contract", "The address of the StableDiffusionCaller contract")
    .addParam("prompt", "The stable diffusion prompt")
    .setAction(async (taskArgs) => {
        //store taskargs as useable variables
        const contractAddr = taskArgs.contract
        const prompt = taskArgs.prompt
        const networkId = network.name
        console.log("Sending a prompt to stable diffusion running on Bacalhau on network", networkId)

        //create a new wallet instance
        const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)

        //create a StableDiffusionCallerV2 contract factory
        const StableDiffusionCallerV2 = await ethers.getContractFactory("StableDiffusionCallerV2", wallet)
        //create a StableDiffusionCallerV2 contract instance 
        //this is what you will call to interact with the deployed contract
        const stableDiffusionCallerV2 = await StableDiffusionCallerV2.attach(contractAddr)
        
        //send transaction to call StableDiffusion() method
        const options = {value: ethers.utils.parseEther("0.03")}
        transaction = await stableDiffusionCallerV2.StableDiffusion(prompt,options)
        const receipt = await transaction.wait()
        console.log("Complete!")
    })