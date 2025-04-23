// Smart Contract Integration for Tixify
// This file handles all interactions with the blockchain contracts

// Contract Addresses
const CONTRACT_ADDRESSES = {
    upgradeability: "0x0cE2475b04dE1BF2fbc3DE267F731707b766fd35",
    ticketTypes: "0x66Bbe67230d35142f85C7D932c7457ee448969e0",
    ticketMarketplace: "0xeEF8487CD2225C5C6f4a7DE175d9A60281121806",
    access: "0xd48144679D25fBAaecDCA1Ef81a37EBC75dcEc92",
    groupDiscounts: "0xAee0E1f6dD19A03066C7c5C10cf098Bc7b8437DB"
};

// ABIs (Application Binary Interfaces)
// These will need to be replaced with your actual contract ABIs
const TICKET_TYPES_ABI = [
    // Example ABI for TicketTypes contract
    {
        "inputs": [{"internalType": "string", "name": "eventName", "type": "string"}],
        "name": "createTicketType",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "typeId", "type": "uint256"}],
        "name": "getTicketType",
        "outputs": [
            {"internalType": "string", "name": "eventName", "type": "string"},
            {"internalType": "uint256", "name": "price", "type": "uint256"},
            {"internalType": "uint256", "name": "supply", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const TICKET_MARKETPLACE_ABI = [
    // Example ABI for TicketMarketplace contract
    {
        "inputs": [
            {"internalType": "uint256", "name": "typeId", "type": "uint256"},
            {"internalType": "uint256", "name": "quantity", "type": "uint256"}
        ],
        "name": "purchaseTickets",
        "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
        "stateMutability": "payable",
        "type": "function"
    },
    {
"inputs": [
            {"internalType": "uint256", "name": "ticketId", "type": "uint256"},
            {"internalType": "address", "name": "to", "type": "address"}
        ],
        "name": "transferTicket",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "ticketId", "type": "uint256"},
            {"internalType": "uint256", "name": "price", "type": "uint256"}
        ],
        "name": "listTicketForSale",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "ticketId", "type": "uint256"}],
        "name": "buyTicket",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];

const ACCESS_ABI = [
    // Example ABI for Access contract
    {
        "inputs": [{"internalType": "uint256", "name": "ticketId", "type": "uint256"}],
        "name": "validateTicket",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "ticketId", "type": "uint256"}],
        "name": "useTicket",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const GROUP_DISCOUNTS_ABI = [
     // Example ABI for GroupDiscounts contract
    {
        "inputs": [
            {"internalType": "uint256", "name": "typeId", "type": "uint256"},
            {"internalType": "uint256", "name": "quantity", "type": "uint256"}
        ],
        "name": "calculateGroupDiscount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "typeId", "type": "uint256"},
            {"internalType": "uint256", "name": "quantity", "type": "uint256"}
        ],
        "name": "purchaseGroupTickets",
        "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
        "stateMutability": "payable",
        "type": "function"
    }
];

// Contract instances
let ticketTypesContract;
let ticketMarketplaceContract;
let accessContract;
let groupDiscountsContract;

// Initialize Web3 and contracts
async function initContracts() {
    if (window.ethereum) {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Initialize Web3
            window.web3 = new Web3(window.ethereum);
            
            // Initialize contract instances
            ticketTypesContract = new web3.eth.Contract(
                TICKET_TYPES_ABI,
                CONTRACT_ADDRESSES.ticketTypes
            );
            
            ticketMarketplaceContract = new web3.eth.Contract(
                TICKET_MARKETPLACE_ABI,
                CONTRACT_ADDRESSES.ticketMarketplace
            );
            
            accessContract = new web3.eth.Contract(
                ACCESS_ABI,
                CONTRACT_ADDRESSES.access
            );
              groupDiscountsContract = new web3.eth.Contract(
                GROUP_DISCOUNTS_ABI,
                CONTRACT_ADDRESSES.groupDiscounts
            );
            
            console.log("Smart contracts initialized successfully");
            return true;
        } catch (error) {
            console.error("User denied account access or error occurred:", error);
            return false;
        }
    } else {
        console.error("Ethereum provider not detected. Please install MetaMask.");
        return false;
    }
}

// Get available ticket types from the blockchain
async function getTicketTypes() {
    try {
        // This is a placeholder. You'll need to implement the actual method
        // based on your contract's structure
        const count = await ticketTypesContract.methods.getTicketTypeCount().call();
        const types = [];
        
        for (let i = 0; i < count; i++) {
            const typeInfo = await ticketTypesContract.methods.getTicketType(i).call();
            types.push({
                id: i,
                name: typeInfo.eventName,
                price: web3.utils.fromWei(typeInfo.price, 'ether'),
                supply: typeInfo.supply
            });
        }
        
        return types;
    } catch (error) {
        console.error("Error fetching ticket types:", error);
        return [];
    }
}

// Purchase tickets
async function purchaseTickets(typeId, quantity, value) {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await ticketMarketplaceContract.methods.purchaseTickets(typeId, quantity)
            .send({
                from: accounts[0],
                value: web3.utils.toWei(value.toString(), 'ether')
            });
