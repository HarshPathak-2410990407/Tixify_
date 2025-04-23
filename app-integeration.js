// This file extends the existing app.js with blockchain integration

// Wait for both the DOM and Web3 to be ready
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize the original app
    initApp();
    logPageView();
    
    // Initialize blockchain contracts
    const contractsInitialized = await window.contractsAPI.initContracts();
    if (contractsInitialized) {
        console.log("Blockchain contracts initialized successfully");
        // Load blockchain data
        loadBlockchainData();
    } else {
        console.warn("Blockchain contracts initialization failed");
    }
});

// Load data from blockchain
async function loadBlockchainData() {
    try {
        // Load user's tickets from blockchain
        const blockchainTickets = await window.contractsAPI.getUserTickets();
        if (blockchainTickets.length > 0) {
            // Clear existing tickets
            userTickets = [];
            
            // Add blockchain tickets to the UI
            blockchainTickets.forEach(ticket => {
                userTickets.push(ticket);
                addTicketToMyTickets(ticket);
            });
            
            // Update ticket buttons state
            updateTicketButtonsState();
            
            // Update lottery entries
            updateLotteryEntries();
            
            // Hide "No tickets purchased yet" message if there are tickets
            document.getElementById('noTicketsMessage').style.display = 'none';
        }
        
        // Load ticket types from blockchain
        const ticketTypes = await window.contractsAPI.getTicketTypes();
        if (ticketTypes.length > 0) {
            // Update events with blockchain data
            events = ticketTypes.map((type, index) => ({
                id: type.id,
                title: type.name,
                date: "Coming Soon", // These would come from your contract
                time: "TBA",
                price: type.price,
                location: "Blockchain Venue",
                image: `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(type.name)}`,
                category: "blockchain",
                description: `Blockchain verified event with ${type.supply} available tickets.`,
                remaining: type.supply
            }));
            
            // Render updated events
            renderEvents();
        }
    } catch (error) {
        console.error("Error loading blockchain data:", error);
        showNotification("Failed to load blockchain data. Please try again.", "error");
    }
}

// Override the connectWallet function to also initialize contracts
const originalConnectWallet = connectWallet;
connectWallet = async function() {
    const result = await originalConnectWallet();
    
    // Initialize contracts after wallet connection
    if (userAddress) {
        const contractsInitialized = await window.contractsAPI.initContracts();
        if (contractsInitialized) {
            loadBlockchainData();
        }
    }
    
    return result;
};

// Override handleCheckout to use blockchain
handleCheckout = async function() {
    if (!userAddress) {
        alert('Please connect your wallet first.');
        hideModal(checkoutModal);
        return;
    }
