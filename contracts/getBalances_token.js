const { resolveContent } = require('nodemailer/lib/shared');
const { web3 } = require('../configs/configweb3');
const getBalancesToken = async (data) => {
    let senderAddress = data;
    const ERC20TransferABI = [
        {
        constant: false,
        inputs: [
            {
            name: "_to",
            type: "address",
            },
            {
            name: "_value",
            type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
            name: "",
            type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
        },
        {
        constant: true,
        inputs: [
            {
            name: "_owner",
            type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
            name: "balance",
            type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
        },
    ];
    const contractAdd = "0x70e509a0d868f023a8a16787bd659a3bb1357ee1"; // metaplanet 토큰 컨트렉트 하드코딩
    const contract = new web3.eth.Contract(ERC20TransferABI, contractAdd)
    return new Promise((resolve, reject) => {
        contract.methods.balanceOf(senderAddress).call(function (err, res) {
            if (err) {
            resolve(err);
            }
            resolve(res)
        });
    })
};

module.exports = { getBalancesToken };
