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
try {
        // Show loading state
        confirmPurchaseBtn.innerHTML = 'Processing...';
        confirmPurchaseBtn.disabled = true;
        
        // Process each item in cart
        for (const item of cart) {
            let result;
            
            if (item.isGroupPurchase) {
                // Use group discount contract for group purchases
                result = await window.contractsAPI.purchaseGroupTickets(
                    item.eventId,
                    item.quantity,
                    item.totalPrice
                );
            } else {
                // Use regular purchase for single tickets
                result = await window.contractsAPI.purchaseTickets(
                    item.eventId,
                    1,
                    parseFloat(item.price) * ticketTypeMultiplier
                );
            }
            
            if (!result.success) {
                throw new Error(result.error || "Transaction failed");
            }
            
            // Process the purchased tickets
            if (result.ticketIds && result.ticketIds.length > 0) {
                for (const ticketId of result.ticketIds) {
                    // Get ticket details from the blockchain
                    // This is a placeholder - you would need to implement getTicketDetails in your contract
                    const ticketDetails = await getTicketDetails(ticketId);
                    
                    // Add ticket to user's tickets
                    const newTicket = {
                        id: ticketId,
                        eventId: item.eventId,
                        eventName: item.title.replace(` (Group of ${item.quantity})`, ''),
                        date: ticketDetails.date || item.date,
                        time: ticketDetails.time || item.time,
                        location: ticketDetails.location || item.location,
                        price: item.isGroupPurchase ? 
                            (parseFloat(item.totalPrice) / item.quantity).toFixed(2) : 
                            (parseFloat(item.price) * ticketTypeMultiplier).toFixed(2),
                        purchaseDate: new Date().toISOString(),
                        status: 'active',
                        ticketType: item.isGroupPurchase ? 'standard' : selectedTicketType
                    };
                    
                    userTickets.push(newTicket);
                    
                    // Add ticket to "My Tickets" section
                    addTicketToMyTickets(newTicket);
                }
            }
        }
        
        // Update ticket buttons state
        updateTicketButtonsState();
        
        // Update lottery entries
        updateLotteryEntries();
        
        // Clear cart
        cart = [];
        updateCartUI();
        saveCart();
        
        // Hide checkout modal
        hideModal(checkoutModal);
        
        // Hide cart sidebar
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        
        // Show success message
        showNotification('Purchase completed successfully! Your tickets are now available in the My Tickets section.', 'success');
        
        // Scroll to tickets section
        document.getElementById('tickets').scrollIntoView({ behavior: 'smooth' });
        
        // Log analytics event
        logEvent('purchase_completed', {
            total_amount: calculateCartTotal(),
            items_count: cart.length,
            ticket_type: selectedTicketType
        });
    } catch (error) {
        console.error('Transaction failed:', error);
        showNotification('Transaction failed: ' + error.message, 'error');
    } finally {
        // Reset button state
        confirmPurchaseBtn.innerHTML = 'Confirm Purchase';
        confirmPurchaseBtn.disabled = false;
    }
};

// Helper function to calculate cart total
function calculateCartTotal() {
    let total = 0;
    cart.forEach(item => {
        if (item.isGroupPurchase) {
            total += parseFloat(item.totalPrice);
        } else {
            total += parseFloat(item.price) * ticketTypeMultiplier;
        }
    });
    return total.toFixed(2);
}
