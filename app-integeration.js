
            // Hide "No tickets purchased yet" message if there are tickets
            document.getElementById('noTicketsMessage').style.display = 'none';
        }
        
        // Load ticket types from blockchain
        const ticketTypes = await window.contractsAPI.getTicketTypes();
        if (ticketTypes.length > 0) {
            // Update events with blockchain data
            events = ticket
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
// Override handleTicketTransfer to use blockchain
handleTicketTransfer = async function(e) {
    e.preventDefault();
    
    const ticketId = ticketSelect.value;
    const recipientAddress = document.getElementById('recipientAddress').value;
    
    if (!ticketId || !recipientAddress) {
        showNotification('Please select a ticket and enter a recipient address.', 'error');
        return;
    }
    
    // Validate Ethereum address
    if (!isValidEthereumAddress(recipientAddress)) {
        showNotification('Please enter a valid Ethereum address.', 'error');
        return;
    }
    
    try {
        // Show loading state
        const submitButton = transferForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = 'Processing...';
        submitButton.disabled = true;
        
        // Transfer ticket on blockchain
        const result = await window.contractsAPI.transferTicket(ticketId, recipientAddress);
        
        if (!result.success) {
            throw new Error(result.error || "Transfer failed");
        }
        
        // Remove ticket from user's tickets
        const ticketIndex = userTickets.findIndex(t => t.id === ticketId);
        if (ticketIndex !== -1) {
            userTickets.splice(ticketIndex, 1);
        }
        
        // Remove ticket from UI
        const ticketElement = document.querySelector(`[data-ticket-id="${ticketId}"]`);
        if (ticketElement) {
            ticketElement.remove();
        }
        
        // Show success message
        showNotification('Ticket transferred successfully!', 'success');
        
        // Update ticket buttons state
        updateTicketButtonsState();
        
        // Hide modal
        hideModal(transferModal);
        
        // Check if no tickets left
        if (userTickets.length === 0) {
            document.getElementById('noTicketsMessage').style.display = 'block';
        }
        
        // Log analytics event
        logEvent('ticket_transferred', {
            ticket_id: ticketId,
            recipient: recipientAddress.substring(0, 10) + '...'
        });
    } catch (error) {
        console.error('Transfer failed:', error);
        showNotification('Transfer failed: ' + error.message, 'error');
    } finally {
        // Reset button state
        const submitButton = transferForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = 'Transfer Ticket';
        submitButton.disabled = false;
    }
};

// Override handleSellTicket to use blockchain
handleSellTicket = async function(e) {
    e.preventDefault();
    
    const ticketId = sellTicketSelect.value;
    const price = document.getElementById('ticketPrice').value;
    
    if (!ticketId || !price) {
        showNotification('Please select a ticket and enter a price.', 'error');
        return;
    }
    
    try {
        // Show loading state
        const submitButton = sellTicketForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = 'Processing...';
        submitButton.disabled = true;
        
        // List ticket for sale on blockchain
        const result = await window.contractsAPI.listTicketForSale(ticketId, price);
        
        if (!result.success) {
            throw new Error(result.error || "Listing failed");
        }
        
        // Get ticket details
        const ticket = userTickets.find(t => t.id === ticketId);
        if (!ticket) {
            throw new Error("Ticket not found");
        }
 // Create listing
        const listing = {
            id: 'LST-' + Date.now(),
            ticketId: ticketId,
            eventName: ticket.eventName,
            date: ticket.date,
            time: ticket.time,
            location: ticket.location,
            originalPrice: ticket.price,
            listingPrice: price,
            description: document.getElementById('ticketDescription').value,
            createdAt: new Date().toISOString(),
            status: 'active',
            transactionHash: result.transactionHash
        };
        
        // Add to listings
        userListings.push(listing);
        
        // Add listing to UI
        addListingToUI(listing);
        
        // Show success message
        showNotification('Ticket listed for sale successfully!', 'success');
        
        // Hide modal
        hideModal(sellTicketModal);
        
        // Log analytics event
        logEvent('ticket_listed', {
            ticket_id: ticketId,
            event_name: ticket.eventName,
            price: price,
            transaction_hash: result.transactionHash
        });
    } catch (error) {
        console.error('Listing failed:', error);
        showNotification('Listing failed: ' + error.message, 'error');
    } finally {
        // Reset button state
        const submitButton = sellTicketForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = 'List Ticket for Sale';
        submitButton.disabled = false;
    }
};

// Override updateGroupDiscountSummary to use blockchain
updateGroupDiscountSummary = async function() {
    const quantity = parseInt(ticketQuantity.value);
    const eventId = groupEventSelect.value;
    
    quantityValue.textContent = quantity;
    
    if (!eventId) {
        basePrice.textContent = '0.00 ETH';
        discountRate.textContent = '0%';
        savingsValue.textContent = '0.00 ETH';
        totalGroupPrice.textContent = '0.00 ETH';
        return;
    }
    
    const event = events.find(e => e.id == eventId);
    if (!event) return;
    
    const singlePrice = parseFloat(event.price);
    basePrice.textContent = `${singlePrice.toFixed(2)} ETH`;
    
    try {
        // Get discount from blockchain
        const discountResult = await window.contractsAPI.calculateGroupDiscount(eventId, quantity);
        
        if (!discountResult.success) {
            throw new Error(discountResult.error || "Failed to calculate discount");
        }
        
        const discount = parseFloat(discountResult.discount);
        const discountPercentage = (discount / singlePrice) * 100;
        
        discountRate.textContent = `${discountPercentage.toFixed(0)}%`;
        
        const totalWithoutDiscount = singlePrice * quantity;
        const savings = totalWithoutDiscount * (discountPercentage / 100);
        const totalPrice = totalWithoutDiscount - savings;
        
        savingsValue.textContent = `${savings.toFixed(2)} ETH`;
        totalGroupPrice.textContent = `${totalPrice.toFixed(2)} ETH`;
    } catch (error) {
        console.error("Error calculating group discount:", error);
        
        // Fallback to local calculation
        let discount = 0;
        if (quantity >= 10) {
            discount = 0.25; // 25% discount for 10+ tickets
        } else if (quantity >= 5) {
            discount = 0.15; // 15% discount for 5-9 tickets
        } else if (quantity >= 3) {
            discount = 0.10; // 10% discount for 3-4 tickets
        }
        
        discountRate.textContent = `${(discount * 100).toFixed(0)}%`;
        
        const totalWithoutDiscount = singlePrice * quantity;
        const savings = totalWithoutDiscount * discount;
        const totalPrice = totalWithoutDiscount - savings;
        
        savingsValue.textContent = `${savings.toFixed(2)} ETH`;
        totalGroupPrice.textContent = `${totalPrice.toFixed(2)} ETH`;
    }
};

// Helper function to get ticket details (placeholder)
async function getTicketDetails(ticketId) {
    // In a real implementation, this would fetch details from your contract
    return {
        date: "Coming Soon",
        time: "TBA",
        location: "Blockchain Venue"
    };
}

// Update the checkoutPrices function to use blockchain data
updateCheckoutPrices = function() {
    let subtotal = 0;
    
    cart.forEach(item => {
        if (item.isGroupPurchase) {
            subtotal += parseFloat(item.totalPrice);
        } else {
            subtotal += parseFloat(item.price) * ticketTypeMultiplier;
        }
    });
    
    const fee = subtotal * 0.05; // 5% service fee
    const total = subtotal + fee;
    
    checkoutSubtotal.textContent = `${subtotal.toFixed(2)} ETH`;
    checkoutFee.textContent = `${fee.toFixed(2)} ETH`;
    checkoutTotal.textContent =  ETH`;
    checkoutFee.textContent = `${fee.toFixed(2)} ETH`;
    checkoutTotal.textContent = `${total.toFixed(2)} ETH`;
};

// Override enterLottery to use blockchain
enterLottery = async function() {
    if (!userAddress) {
        showNotification('Please connect your wallet first.', 'error');
        connectWalletBtn.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    if (lotteryEntries === 0) {
        showNotification('You need to purchase tickets to enter the lottery.', 'warning');
        document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    try {
        // This would be implemented in your smart contract
        // For now, we'll simulate it
        showNotification(`You've successfully entered the lottery with ${lotteryEntries} entries!`, 'success');
        
        // Log analytics event
        logEvent('enter_lottery', {
            entries: lotteryEntries
        });
    } catch (error) {
        console.error("Error entering lottery:", error);
        showNotification('Failed to enter lottery: ' + error.message, 'error');
    }
};
