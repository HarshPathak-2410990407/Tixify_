// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7W_sGElhADcTmdXQBaH0Fd50u6mb43FA",
    authDomain: "tixify-fa41a.firebaseapp.com",
    projectId: "tixify-fa41a",
    storageBucket: "tixify-fa41a.firebasestorage.app",
    messagingSenderId: "737457511810",
    appId: "1:737457511810:web:116643f18851b67cb7c39b",
    measurementId: "G-FYD3K14VG4"
  };
  
  // Initialize Firebase
  const firebase = window.firebase; // Declare firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Initialize Analytics if available
  let analytics;
  if (firebase.analytics) {
      analytics = firebase.analytics();
  }
  
  // DOM Elements
  const connectWalletBtn = document.getElementById('connectWallet');
  const walletStatus = document.getElementById('walletStatus');
  const loginButton = document.getElementById('loginButton');
  const userProfile = document.getElementById('userProfile');
  const userPhoto = document.getElementById('userPhoto');
  const userName = document.getElementById('userName');
  const userMenuToggle = document.getElementById('userMenuToggle');
  const userMenu = document.getElementById('userMenu');
  const logoutButton = document.getElementById('logoutButton');
  const loginModal = document.getElementById('loginModal');
  const closeModal = document.querySelector('.close-modal');
  const googleLoginBtn = document.getElementById('googleLogin');
  const emailLoginForm = document.getElementById('emailLoginForm');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.querySelector('nav');
  const exploreEventsBtn = document.getElementById('exploreEvents');
  const filterButton = document.getElementById('filterButton');
  const searchInput = document.getElementById('searchEvents');
  const categoryFilter = document.getElementById('categoryFilter');
  const dateFilter = document.getElementById('dateFilter');
  const eventList = document.getElementById('eventList');
  const loadMoreEventsBtn = document.getElementById('loadMoreEvents');
  const ticketTabs = document.querySelectorAll('.tab-btn');
  const transferTicketBtn = document.getElementById('transferTicketBtn');
  const sellTicketBtn = document.getElementById('sellTicketBtn');
  const transferModal = document.getElementById('transferModal');
  const sellTicketModal = document.getElementById('sellTicketModal');
  const createListingModal = document.getElementById('createListingModal');
  const checkoutModal = document.getElementById('checkoutModal');
  const ticketSelect = document.getElementById('ticketSelect');
  const sellTicketSelect = document.getElementById('sellTicketSelect');
  const transferForm = document.getElementById('transferForm');
  const sellTicketForm = document.getElementById('sellTicketForm');
  const createListingForm = document.getElementById('createListingForm');
  const openChatbotBtn = document.getElementById('openChatbot');
  const closeChatbotBtn = document.getElementById('closeChatbot');
  const chatbot = document.getElementById('chatbot');
  const chatbotInput = document.getElementById('chatbotInput');
  const sendMessageBtn = document.getElementById('sendMessage');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const newsletterForm = document.getElementById('newsletterForm');
  const cartBtn = document.getElementById('cartBtn');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCart = document.getElementById('closeCart');
  const cartItems = document.getElementById('cartItems');
  const emptyCartMessage = document.getElementById('emptyCartMessage');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutItems = document.getElementById('checkoutItems');
  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutFee = document.getElementById('checkoutFee');
  const checkoutTotal = document.getElementById('checkoutTotal');
  const confirmPurchaseBtn = document.getElementById('confirmPurchaseBtn');
  const cancelCheckoutBtn = document.getElementById('cancelCheckoutBtn');
  const sellMyTicketsBtn = document.getElementById('sellMyTicketsBtn');
  const createListingBtn = document.getElementById('createListingBtn');
  const listingsContainer = document.getElementById('listingsContainer');
  const noListingsMessage = document.getElementById('noListingsMessage');
  const groupDiscountBtn = document.getElementById('groupDiscountBtn');
  const groupDiscountModal = document.getElementById('groupDiscountModal');
  const ticketQuantity = document.getElementById('ticketQuantity');
  const decreaseBtn = document.querySelector('.decrease-btn');
  const increaseBtn = document.querySelector('.increase-btn');
  const groupEventSelect = document.getElementById('groupEventSelect');
  const basePrice = document.getElementById('basePrice');
  const quantityValue = document.getElementById('quantityValue');
  const discountRate = document.getElementById('discountRate');
  const savingsValue = document.getElementById('savingsValue');
  const totalGroupPrice = document.getElementById('totalGroupPrice');
  const addGroupToCartBtn = document.getElementById('addGroupToCartBtn');
  const enterLotteryBtn = document.getElementById('enterLotteryBtn');
  const userEntries = document.getElementById('userEntries');
  const ticketTypeOptions = document.querySelectorAll('.ticket-type-option');
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  
  // Web3 Variables
  let web3;
  let userAddress = '';
  let connectedChainId;
  let userTickets = [];
  let userListings = [];
  let events = [];
  let cart = [];
  
  // Declare undeclared variables
  let logPageView;
  let showModal;
  let hideModal;
  let handleGoogleLogin;
  let handleEmailLogin;
  let updateCheckoutPrices;
  
  // Add these variables to the global variables section
  let selectedTicketType = 'standard';
  let ticketTypeMultiplier = 1;
  let lotteryEntries = 0;
  let lotteryEndDate = new Date();
  lotteryEndDate.setDate(lotteryEndDate.getDate() + 14); // Set lottery end date to 14 days from now
  
  // Sample event data
  const sampleEvents = [
      {
          id: 1,
          title: "Concert: Rock Night",
          date: "October 25, 2025",
          time: "8:00 PM",
          price: "0.1",
          location: "Crypto Arena, New York",
          image: "/rocknight.jpg?height=200&width=300",
          category: "concert",
          description: "Experience an unforgettable night of rock music with top bands and artists.",
          remaining: 150
      },
      {
          id: 2,
          title: "Conference: Web3 Summit",
          date: "November 10, 2025",
          time: "9:00 AM",
          price: "0.2",
          location: "Blockchain Center, San Francisco",
          image: "/conference.jpg?height=200&width=300",
          category: "conference",
          description: "Join industry leaders to discuss the future of Web3 and blockchain technology.",
          remaining: 200
      },
      {
          id: 3,
          title: "Sports: Championship Finals",
          date: "December 15, 2025",
          time: "7:30 PM",
          price: "0.15",
          location: "Crypto Stadium, Miami",
          image: "/sports.jpg?height=200&width=300",
          category: "sports",
          description: "Watch the most anticipated championship finals of the year live.",
          remaining: 100
      },
      {
          id: 4,
          title: "Festival: Blockchain Music Fest",
          date: "January 20, 2026",
          time: "12:00 PM",
          price: "0.25",
          location: "Decentralized Park, Austin",
          image: "/musicfest.jpg?height=200&width=300",
          category: "festival",
          description: "A three-day music festival celebrating artists who embrace blockchain technology.",
          remaining: 500
      },
      {
          id: 5,
          title: "Conference: DeFi Innovations",
          date: "February 5, 2026",
          time: "10:00 AM",
          price: "0.18",
          location: "Finance Hub, Chicago",
          image: "/deficonference.jpg?height=200&width=300",
          category: "conference",
          description: "Explore the latest innovations in decentralized finance and cryptocurrency.",
          remaining: 150
      },
      {
          id: 6,
          title: "Concert: Electronic Vibes",
          date: "March 12, 2026",
          time: "9:00 PM",
          price: "0.12",
          location: "Digital Arena, Los Angeles",
          image: "/electronicvibes.jpg?height=200&width=300",
          category: "concert",
          description: "Experience the best electronic music with world-renowned DJs and producers.",
          remaining: 200
      }
  ];
  
  // Initialize the application
  document.addEventListener('DOMContentLoaded', () => {
      initApp();
      logPageView();
  });
  
  // Initialize the application
  function initApp() {
      // Load events
      events = [...sampleEvents];
      renderEvents();
      
      // Check if user is already logged in
      auth.onAuthStateChanged(handleAuthStateChange);
      
      // Check for saved dark mode preference
      if (localStorage.getItem('darkMode') === 'true') {
          document.body.classList.add('dark');
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
      } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
      }
      
      // Check if wallet was previously connected
      checkPreviousWalletConnection();
      
      // Load cart from localStorage
      loadCart();
      
      // Set up event listeners
      setupEventListeners();
  
      // Add this to the initApp function
      startLotteryTimer();
      updateLotteryEntries();
  }
  
  // Set up event listeners
  function setupEventListeners() {
      // Wallet connection
      connectWalletBtn.addEventListener('click', connectWallet);
      
      // Authentication
      loginButton.addEventListener('click', () => showModal(loginModal));
      document.querySelectorAll('.close-modal').forEach(btn => {
          btn.addEventListener('click', (e) => {
              const modal = e.target.closest('.modal');
              hideModal(modal);
          });
      });
      googleLoginBtn.addEventListener('click', handleGoogleLogin);
      emailLoginForm.addEventListener('submit', handleEmailLogin);
      logoutButton?.addEventListener('click', handleLogout);
      userMenuToggle?.addEventListener('click', toggleUserMenu);
      
      // Close modals when clicking outside
      window.addEventListener('click', (event) => {
          if (event.target.classList.contains('modal')) {
              hideModal(event.target);
          }
          if (event.target !== userMenuToggle && event.target !== userMenu) {
              userMenu?.classList.remove('active');
          }
      });
      
      // Mobile menu
      mobileMenuBtn.addEventListener('click', toggleMobileMenu);
      
      // Navigation
      exploreEventsBtn.addEventListener('click', () => {
          document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
          logEvent('explore_events_clicked');
      });
      
      // Event filtering
      filterButton.addEventListener('click', filterEvents);
      searchInput.addEventListener('input', filterEvents);
      categoryFilter.addEventListener('change', filterEvents);
      dateFilter.addEventListener('change', filterEvents);
      
      // Load more events
      loadMoreEventsBtn?.addEventListener('click', loadMoreEvents);
      
      // Ticket tabs
      ticketTabs.forEach(tab => {
          tab.addEventListener('click', () => {
              ticketTabs.forEach(t => t.classList.remove('active'));
              tab.classList.add('active');
              filterTickets(tab.getAttribute('data-tab'));
          });
      });
      
      // Transfer ticket
      transferTicketBtn?.addEventListener('click', () => {
          populateTicketSelect();
          showModal(transferModal);
      });
      
      transferForm?.addEventListener('submit', handleTicketTransfer);
      
      // Sell ticket
      sellTicketBtn?.addEventListener('click', () => {
          populateSellTicketSelect();
          showModal(sellTicketModal);
      });
      
      sellTicketForm?.addEventListener('submit', handleSellTicket);
      
      // Create listing
      createListingBtn?.addEventListener('click', () => {
          showModal(createListingModal);
      });
      
      createListingForm?.addEventListener('submit', handleCreateListing);
      
      // Sell my tickets
      sellMyTicketsBtn?.addEventListener('click', () => {
          if (userTickets.length > 0) {
              populateSellTicketSelect();
              showModal(sellTicketModal);
          } else {
              showNotification('You don\'t have any tickets to sell. Purchase tickets first.', 'warning');
          }
      });
      
      // Cart
      cartBtn.addEventListener('click', toggleCart);
      closeCart.addEventListener('click', toggleCart);
      cartOverlay.addEventListener('click', toggleCart);
      
      // Checkout
      checkoutBtn.addEventListener('click', () => {
          if (cart.length > 0) {
              prepareCheckout();
              showModal(checkoutModal);
          }
      });
      
      confirmPurchaseBtn.addEventListener('click', handleCheckout);
      cancelCheckoutBtn.addEventListener('click', () => hideModal(checkoutModal));
      
      // Chatbot
      openChatbotBtn.addEventListener('click', () => {
          chatbot.style.display = 'flex';
          openChatbotBtn.style.display = 'none';
          logEvent('chatbot_opened');
      });
      
      closeChatbotBtn.addEventListener('click', () => {
          chatbot.style.display = 'none';
          openChatbotBtn.style.display = 'flex';
      });
      
      sendMessageBtn.addEventListener('click', sendChatMessage);
      chatbotInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              sendChatMessage();
          }
      });
      
      // Dark mode toggle
      darkModeToggle.addEventListener('click', toggleDarkMode);
      
      // Newsletter
      newsletterForm?.addEventListener('submit', handleNewsletterSignup);
      
      // Add event listeners to featured event button
      document.querySelector('.featured-btn')?.addEventListener('click', (e) => {
          const eventId = e.target.getAttribute('data-event-id');
          if (eventId) {
              addToCart(eventId);
          }
      });
  
      // Add these to the setupEventListeners function
      groupDiscountBtn?.addEventListener('click', () => {
          populateGroupEventSelect();
          showModal(groupDiscountModal);
      });
  
      decreaseBtn?.addEventListener('click', () => {
          const currentValue = parseInt(ticketQuantity.value);
          if (currentValue > 1) {
              ticketQuantity.value = currentValue - 1;
              updateGroupDiscountSummary();
          }
      });
  
      increaseBtn?.addEventListener('click', () => {
          const currentValue = parseInt(ticketQuantity.value);
          if (currentValue < 20) {
              ticketQuantity.value = currentValue + 1;
              updateGroupDiscountSummary();
          }
      });
  
      ticketQuantity?.addEventListener('change', updateGroupDiscountSummary);
      groupEventSelect?.addEventListener('change', updateGroupDiscountSummary);
      addGroupToCartBtn?.addEventListener('click', handleGroupPurchase);
      enterLotteryBtn?.addEventListener('click', enterLottery);
  
      ticketTypeOptions?.forEach(option => {
          option.addEventListener('click', () => {
              ticketTypeOptions.forEach(opt => opt.classList.remove('selected'));
              option.classList.add('selected');
              selectedTicketType = option.getAttribute('data-type');
              ticketTypeMultiplier = parseFloat(option.getAttribute('data-price-multiplier'));
              updateCheckoutPrices();
          });
      });
  }
  
  // Handle authentication state change
  function handleAuthStateChange(user) {
      if (user) {
          // User is signed in
          loginButton.style.display = 'none';
          userProfile.style.display = 'flex';
          userName.textContent = user.displayName || user.email.split('@')[0];
          userPhoto.src = user.photoURL || '/placeholder.svg?height=32&width=32';
          
          // Enable transfer and sell buttons if user has tickets
          updateTicketButtonsState();
          
          // Log analytics event
          logEvent('login', {
              method: user.providerData[0].providerId
          });
      } else {
          // User is signed out
          loginButton.style.display = 'block';
          userProfile.style.display = 'none';
      }
  }
  
  // Toggle user menu
  function toggleUserMenu() {
      userMenu.classList.toggle('active');
  }
  
  // Toggle mobile menu
  function toggleMobileMenu() {
      nav.classList.toggle('active');
      const spans = mobileMenuBtn.querySelectorAll('span');
      
      if (nav.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
          document.body.style.overflow = 'hidden'; // Prevent scrolling
      } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
          document.body.style.overflow = ''; // Allow scrolling
      }
  }
  
  // Check for previous wallet connection
  function checkPreviousWalletConnection() {
      const savedAddress = localStorage.getItem('walletAddress');
      if (savedAddress && window.ethereum) {
          userAddress = savedAddress;
          updateWalletUI(savedAddress);
          
          // Initialize Web3
          web3 = new Web3(window.ethereum);
          
          // Check if still connected
          window.ethereum.request({ method: 'eth_accounts' })
              .then(accounts => {
                  if (accounts.length === 0) {
                      // Wallet disconnected
                      disconnectWallet();
                  }
              })
              .catch(error => {
                  console.error('Error checking accounts:', error);
                  disconnectWallet();
              });
      }
  }
  
  // Connect wallet
  async function connectWallet() {
      if (window.ethereum) {
          try {
              // Request account access
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              userAddress = accounts[0];
              
              // Save to localStorage
              localStorage.setItem('walletAddress', userAddress);
              
              // Update UI
              updateWalletUI(userAddress);
              
              // Initialize Web3
              web3 = new Web3(window.ethereum);
              
              // Get network ID
              connectedChainId = await web3.eth.getChainId();
              
              // Set up event listeners for wallet
              setupWalletEventListeners();
              
              // Log analytics event
              logEvent('wallet_connected', {
                  chain_id: connectedChainId
              });
          } catch (error) {
              console.error('User denied wallet connection:', error);
              walletStatus.innerText = 'Connection failed. Please try again.';
              walletStatus.style.color = 'var(--error)';
          }
      } else {
          walletStatus.innerText = 'Please install MetaMask to use this feature.';
          walletStatus.style.color = 'var(--warning)';
          
          // Show MetaMask installation modal or redirect
          const installMetaMask = confirm('MetaMask is required to use this feature. Would you like to install it now?');
          if (installMetaMask) {
              window.open('https://metamask.io/download.html', '_blank');
          }
      }
  }
  
  // Set up wallet event listeners
  function setupWalletEventListeners() {
      if (window.ethereum) {
          // Listen for account changes
          window.ethereum.on('accountsChanged', (accounts) => {
              if (accounts.length === 0) {
                  // User disconnected wallet
                  disconnectWallet();
              } else {
                  // User switched account
                  userAddress = accounts[0];
                  localStorage.setItem('walletAddress', userAddress);
                  updateWalletUI(userAddress);
                  
                  // Log analytics event
                  logEvent('wallet_account_changed');
              }
          });
          
          // Listen for chain changes
          window.ethereum.on('chainChanged', (chainId) => {
              connectedChainId = chainId;
              
              // Log analytics event
              logEvent('wallet_chain_changed', {
                  chain_id: chainId
              });
              
              // Reload the page to avoid any issues
              window.location.reload();
          });
      }
  }
  
  // Disconnect wallet
  function disconnectWallet() {
      userAddress = '';
      localStorage.removeItem('walletAddress');
      
      // Update UI
      connectWalletBtn.innerText = 'Connect Wallet';
      connectWalletBtn.disabled = false;
      walletStatus.innerText = '';
      
      // Disable buy buttons
      document.querySelectorAll('.event-card button').forEach(button => {
          button.disabled = true;
      });
      
      // Log analytics event
      logEvent('wallet_disconnected');
  }
  
  // Update wallet UI
  function updateWalletUI(address) {
      const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
      walletStatus.innerText = `Connected: ${shortAddress}`;
      walletStatus.style.color = 'var(--success)';
      connectWalletBtn.innerHTML = `
          <svg class="wallet-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"></rect>
              <line x1="16" y1="12" x2="16" y2="12"></line>
          </svg>
          Wallet Connected
      `;
      connectWalletBtn.classList.add('connected');
      
      // Enable buy buttons
      document.querySelectorAll('.event-card button').forEach(button => {
          button.disabled = false;
      });
  }
  
  // Render events
  function renderEvents(filteredEvents = null) {
      const eventsToRender = filteredEvents || events;
      eventList.innerHTML = '';
      
      if (eventsToRender.length === 0) {
          eventList.innerHTML = '<p class="no-events-message">No events found matching your criteria.</p>';
          return;
      }
      
      eventsToRender.forEach(event => {
          const eventCard = document.createElement('div');
          eventCard.className = 'event-card';
          eventCard.setAttribute('data-event-id', event.id);
          eventCard.setAttribute('data-category', event.category);
          
          eventCard.innerHTML = `
              <div class="event-image">
                  <span class="event-category">${capitalizeFirstLetter(event.category)}</span>
                  <img src="${event.image}" alt="${event.title}">
              </div>
              <div class="event-content">
                  <h3>${event.title}</h3>
                  <p class="event-date">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      ${event.date} at ${event.time}
                  </p>
                  <p class="event-price">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                      ${event.price} ETH
                  </p>
                  <p class="event-location">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      ${event.location}
                  </p>
                  <button class="add-to-cart-btn" ${!userAddress ? 'disabled' : ''} data-event-id="${event.id}">
                      Add to Cart
                  </button>
              </div>
          `;
          
          eventList.appendChild(eventCard);
      });
      
      // Add event listeners to add to cart buttons
      document.querySelectorAll('.add-to-cart-btn').forEach(button => {
          button.addEventListener('click', (e) => {
              const eventId = e.target.getAttribute('data-event-id');
              addToCart(eventId);
          });
      });
  }
  
  // Filter events
  function filterEvents() {
      const searchTerm = searchInput.value.toLowerCase();
      const category = categoryFilter.value;
      const dateFilterValue = document.getElementById('dateFilter').value;
      
      let filteredEvents = events.filter(event => {
          const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                               event.location.toLowerCase().includes(searchTerm);
          const matchesCategory = category === 'all' || event.category === category;
          
          // Date filtering logic
          let matchesDate = true;
          const eventDate = new Date(event.date);
          const today = new Date();
          
          if (dateFilterValue === 'today') {
              matchesDate = eventDate.toDateString() === today.toDateString();
          } else if (dateFilterValue === 'week') {
              const nextWeek = new Date(today);
              nextWeek.setDate(today.getDate() + 7);
              matchesDate = eventDate >= today && eventDate <= nextWeek;
          } else if (dateFilterValue === 'month') {
              const nextMonth = new Date(today);
              nextMonth.setMonth(today.getMonth() + 1);
              matchesDate = eventDate >= today && eventDate <= nextMonth;
          }
          
          return matchesSearch && matchesCategory && matchesDate;
      });
      
      renderEvents(filteredEvents);
      
      // Log analytics event
      logEvent('filter_events', {
          search_term: searchTerm,
          category: category,
          date_filter: dateFilterValue,
          results_count: filteredEvents.length
      });
  }
  
  // Load more events
  function loadMoreEvents() {
      // In a real app, this would fetch more events from the server
      // For this demo, we'll just show a message
      alert('In a production environment, this would load more events from the blockchain.');
      
      // Log analytics event
      logEvent('load_more_events_clicked');
  }
  
  // Add to cart
  function addToCart(eventId) {
      if (!userAddress) {
          alert('Please connect your wallet first.');
          connectWalletBtn.scrollIntoView({ behavior: 'smooth' });
          return;
      }
      
      const eventData = events.find(e => e.id == eventId);
      
      if (!eventData) {
          alert('Event not found.');
          return;
      }
      
      // Check if already in cart
      const existingItem = cart.find(item => item.eventId == eventId);
      if (existingItem) {
          showNotification('This event is already in your cart.', 'info');
          return;
      }
      
      // Add to cart
      const cartItem = {
          id: Date.now(), // Unique ID for the cart item
          eventId: eventId,
          title: eventData.title,
          date: eventData.date,
          time: eventData.time,
          price: eventData.price,
          image: eventData.image,
          location: eventData.location
      };
      
      cart.push(cartItem);
      
      // Update cart UI
      updateCartUI();
      
      // Save cart to localStorage
      saveCart();
      
      // Show notification
      showNotification(`${eventData.title} added to cart!`, 'success');
      
      // Log analytics event
      logEvent('add_to_cart', {
          event_id: eventId,
          event_name: eventData.title,
          price: eventData.price
      });
  }
  
  // Update cart UI
  function updateCartUI() {
      // Update cart count
      const cartCount = document.getElementById('cartCount');
      cartCount.textContent = cart.length;
      
      // Update cart items
      cartItems.innerHTML = '';
      
      if (cart.length === 0) {
          emptyCartMessage.style.display = 'block';
          checkoutBtn.disabled = true;
          cartTotal.textContent = '0.00 ETH';
          return;
      }
      
      emptyCartMessage.style.display = 'none';
      checkoutBtn.disabled = false;
      
      let total = 0;
      
      cart.forEach(item => {
          const cartItemElement = document.createElement('div');
          cartItemElement.className = 'cart-item';
          
          if (item.isGroupPurchase) {
              cartItemElement.innerHTML = `
                  <div class="cart-item-image">
                      <img src="${item.image}" alt="${item.title}">
                  </div>
                  <div class="cart-item-details">
                      <div class="cart-item-title">${item.title}</div>
                      <div class="cart-item-info">${item.date} at ${item.time}</div>
                      <div class="cart-item-info">${item.location}</div>
                      <div class="cart-item-info">Discount: ${(item.groupDiscount * 100).toFixed(0)}%</div>
                      <div class="cart-item-price">${item.totalPrice} ETH (${item.price} ETH each)</div>
                  </div>
                  <button class="cart-item-remove" data-id="${item.id}">&times;</button>
              `;
              
              total += parseFloat(item.totalPrice);
          } else {
              cartItemElement.innerHTML = `
                  <div class="cart-item-image">
                      <img src="${item.image}" alt="${item.title}">
                  </div>
                  <div class="cart-item-details">
                      <div class="cart-item-title">${item.title}</div>
                      <div class="cart-item-info">${item.date} at ${item.time}</div>
                      <div class="cart-item-info">${item.location}</div>
                      <div class="cart-item-price">${item.price} ETH</div>
                  </div>
                  <button class="cart-item-remove" data-id="${item.id}">&times;</button>
              `;
              
              total += parseFloat(item.price);
          }
          
          cartItems.appendChild(cartItemElement);
      });
      
      // Add event listeners to remove buttons
      document.querySelectorAll('.cart-item-remove').forEach(button => {
          button.addEventListener('click', (e) => {
              const itemId = e.target.getAttribute('data-id');
              removeFromCart(itemId);
          });
      });
      
      // Update total
      cartTotal.textContent = `${total.toFixed(2)} ETH`;
  }
  
  // Remove from cart
  function removeFromCart(itemId) {
      const itemIndex = cart.findIndex(item => item.id == itemId);
      
      if (itemIndex !== -1) {
          const removedItem = cart.splice(itemIndex, 1)[0];
          
          // Update cart UI
          updateCartUI();
          
          // Save cart to localStorage
          saveCart();
          
          // Show notification
          showNotification(`${removedItem.title} removed from cart.`, 'info');
          
          // Log analytics event
          logEvent('remove_from_cart', {
              event_id: removedItem.eventId,
              event_name: removedItem.title
          });
      }
  }
  
  // Save cart to localStorage
  function saveCart() {
      localStorage.setItem('tixifyCart', JSON.stringify(cart));
  }
  
  // Load cart from localStorage
  function loadCart() {
      const savedCart = localStorage.getItem('tixifyCart');
      if (savedCart) {
          cart = JSON.parse(savedCart);
          updateCartUI();
      }
  }
  
  // Toggle cart
  function toggleCart() {
      cartSidebar.classList.toggle('active');
      cartOverlay.classList.toggle('active');
      
      if (cartSidebar.classList.contains('active')) {
          document.body.style.overflow = 'hidden'; // Prevent scrolling
      } else {
          document.body.style.overflow = ''; // Allow scrolling
      }
  }
  
  // Prepare checkout
  function prepareCheckout() {
      checkoutItems.innerHTML = '';
      
      let subtotal = 0;
      
      cart.forEach(item => {
          const checkoutItem = document.createElement('div');
          checkoutItem.className = 'checkout-item';
          
          if (item.isGroupPurchase) {
              checkoutItem.innerHTML = `
                  <div class="checkout-item-details">
                      <div class="checkout-item-title">${item.title}</div>
                      <div class="checkout-item-info">${item.date} at ${item.time}</div>
                      <div class="checkout-item-info">Group discount: ${(item.groupDiscount * 100).toFixed(0)}%</div>
                  </div>
                  <div class="checkout-item-price">${item.totalPrice} ETH</div>
              `;
              
              subtotal += parseFloat(item.totalPrice);
          } else {
              const itemPrice = parseFloat(item.price) * ticketTypeMultiplier;
              
              checkoutItem.innerHTML = `
                  <div class="checkout-item-details">
                      <div class="checkout-item-title">${item.title}</div>
                      <div class="checkout-item-info">${item.date} at ${item.time}</div>
                      <div class="checkout-item-info">Ticket type: ${selectedTicketType.charAt(0).toUpperCase() + selectedTicketType.slice(1)}</div>
                  </div>
                  <div class="checkout-item-price">${itemPrice.toFixed(2)} ETH</div>
              `;
              
              subtotal += itemPrice;
          }
          
          checkoutItems.appendChild(checkoutItem);
      });
      
      const fee = subtotal * 0.05; // 5% service fee
      const total = subtotal + fee;
      
      checkoutSubtotal.textContent = `${subtotal.toFixed(2)} ETH`;
      checkoutFee.textContent = `${fee.toFixed(2)} ETH`;
      checkoutTotal.textContent = `${total.toFixed(2)} ETH`;
  }
  
  // Handle checkout
  function handleCheckout() {
      if (!userAddress) {
          alert('Please connect your wallet first.');
          hideModal(checkoutModal);
          return;
      }
      
      try {
          // Show loading state
          confirmPurchaseBtn.innerHTML = 'Processing...';
          confirmPurchaseBtn.disabled = true;
          
          // Calculate total with ticket type multiplier
          let total = 0;
          cart.forEach(item => {
              if (item.isGroupPurchase) {
                  total += parseFloat(item.totalPrice);
              } else {
                  total += parseFloat(item.price) * ticketTypeMultiplier;
              }
          });
          
          // Add service fee
          total += total * 0.05;
          
          // Simulate blockchain transaction
          simulateBlockchainTransaction(total.toString())
              .then(() => {
                  // Process each item in cart
                  for (const item of cart) {
                      // Generate ticket ID
                      const ticketId = `TIX-${item.eventId}-${Math.floor(Math.random() * 10000)}`;
                      
                      // Handle group purchases
                      if (item.isGroupPurchase && item.quantity > 1) {
                          for (let i = 0; i < item.quantity; i++) {
                              const groupTicketId = `${ticketId}-${i+1}`;
                              
                              // Add ticket to user's tickets
                              const newTicket = {
                                  id: groupTicketId,
                                  eventId: item.eventId,
                                  eventName: item.title.replace(` (Group of ${item.quantity})`, ''),
                                  date: item.date,
                                  time: item.time,
                                  location: item.location,
                                  price: item.price,
                                  purchaseDate: new Date().toISOString(),
                                  status: 'active',
                                  ticketType: 'standard', // Group purchases are standard tickets
                                  isGroupTicket: true,
                                  groupSize: item.quantity
                              };
                              
                              userTickets.push(newTicket);
                              
                              // Add ticket to "My Tickets" section
                              addTicketToMyTickets(newTicket);
                          }
                      } else {
                          // Add ticket to user's tickets
                          const newTicket = {
                              id: ticketId,
                              eventId: item.eventId,
                              eventName: item.title,
                              date: item.date,
                              time: item.time,
                              location: item.location,
                              price: (parseFloat(item.price) * ticketTypeMultiplier).toFixed(2),
                              purchaseDate: new Date().toISOString(),
                              status: 'active',
                              ticketType: selectedTicketType
                          };
                          
                          userTickets.push(newTicket);
                          
                          // Add ticket to "My Tickets" section
                          addTicketToMyTickets(newTicket);
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
                      total_amount: total.toFixed(2),
                      items_count: cart.length,
                      ticket_type: selectedTicketType
                  });
              })
              .catch(error => {
                  console.error('Transaction failed:', error);
                  showNotification('Transaction failed. Please try again.', 'error');
              })
              .finally(() => {
                  // Reset button state
                  confirmPurchaseBtn.innerHTML = 'Confirm Purchase';
                  confirmPurchaseBtn.disabled = false;
              });
      } catch (error) {
          console.error('Transaction failed:', error);
          showNotification('Transaction failed. Please try again.', 'error');
          
          // Reset button state
          confirmPurchaseBtn.innerHTML = 'Confirm Purchase';
          confirmPurchaseBtn.disabled = false;
      }
  }
  
  // Simulate blockchain transaction
  function simulateBlockchainTransaction(amount) {
      return new Promise((resolve) => {
          // Simulate network delay
          setTimeout(() => {
              resolve({
                  transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
                  blockNumber: Math.floor(Math.random() * 1000000),
                  timestamp: Date.now()
              });
          }, 2000);
      });
  }
  
  // Add ticket to My Tickets section
  function addTicketToMyTickets(ticket) {
      const ticketContainer = document.getElementById('ticketContainer');
      const noTicketsMessage = document.getElementById('noTicketsMessage');
      
      // Hide "No tickets purchased yet" message
      if (noTicketsMessage) {
          noTicketsMessage.style.display = 'none';
      }
      
      // Create ticket element
      const ticketElement = document.createElement('div');
      ticketElement.className = 'ticket-item';
      ticketElement.setAttribute('data-ticket-id', ticket.id);
      
      ticketElement.innerHTML = `
          <h3>${ticket.eventName}</h3>
          <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <strong>Date:</strong> ${ticket.date} at ${ticket.time}
          </p>
          <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <strong>Location:</strong> ${ticket.location}
          </p>
          <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <strong>Price:</strong> ${ticket.price} ETH
          </p>
          <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <strong>Ticket ID:</strong> ${ticket.id}
          </p>
          <div class="qr-code">
              <img src="/placeholder.svg?height=120&width=120" alt="QR Code for ${ticket.id}">
          </div>
          <div class="ticket-actions">
              <button class="view-btn">View Details</button>
              <button class="transfer-btn" data-ticket-id="${ticket.id}">Transfer</button>
          </div>
      `;
      
      ticketContainer.appendChild(ticketElement);
      
      // Add event listener to transfer button
      const transferBtn = ticketElement.querySelector('.transfer-btn');
      transferBtn.addEventListener('click', () => {
          populateTicketSelect(ticket.id);
          showModal(transferModal);
      });
  }
  
  // Update ticket buttons state
  function updateTicketButtonsState() {
      if (transferTicketBtn) {
          transferTicketBtn.disabled = userTickets.length === 0;
      }
      
      if (sellTicketBtn) {
          sellTicketBtn.disabled = userTickets.length === 0;
      }
  }
  
  // Filter tickets
  function filterTickets(tab) {
      const ticketItems = document.querySelectorAll('.ticket-item');
      const today = new Date();
      
      ticketItems.forEach(item => {
          const ticketId = item.getAttribute('data-ticket-id');
          const ticket = userTickets.find(t => t.id === ticketId);
          
          if (!ticket) return;
          
          const eventDate = new Date(ticket.date);
          const isPast = eventDate < today;
          
          if (tab === 'upcoming' && !isPast) {
              item.style.display = 'block';
          } else if (tab === 'past' && isPast) {
              item.style.display = 'block';
          } else {
              item.style.display = 'none';
          }
      });
  }
  
  // Populate ticket select dropdown
  function populateTicketSelect(selectedTicketId = null) {
      if (!ticketSelect) return;
      
      // Clear existing options except the first one
      while (ticketSelect.options.length > 1) {
          ticketSelect.remove(1);
      }
      
      // Add user tickets as options
      userTickets.forEach(ticket => {
          const option = document.createElement('option');
          option.value = ticket.id;
          option.textContent = `${ticket.eventName} - ${ticket.date}`;
          
          if (selectedTicketId && ticket.id === selectedTicketId) {
              option.selected = true;
          }
          
          ticketSelect.appendChild(option);
      });
  }
  
  // Populate sell ticket select dropdown
  function populateSellTicketSelect(selectedTicketId = null) {
      if (!sellTicketSelect) return;
      
      // Clear existing options except the first one
      while (sellTicketSelect.options.length > 1) {
          sellTicketSelect.remove(1);
      }
      
      // Add user tickets as options
      userTickets.forEach(ticket => {
          // Skip tickets that are already listed
          if (userListings.some(listing => listing.ticketId === ticket.id)) {
              return;
          }
          
          const option = document.createElement('option');
          option.value = ticket.id;
          option.textContent = `${ticket.eventName} - ${ticket.date}`;
          
          if (selectedTicketId && ticket.id === selectedTicketId) {
              option.selected = true;
          }
          
          sellTicketSelect.appendChild(option);
      });
  }
  
  // Handle ticket transfer
  function handleTicketTransfer(e) {
      e.preventDefault();
      
      const ticketId = ticketSelect.value;
      const recipientAddress = document.getElementById('recipientAddress').value;
      const message = document.getElementById('transferMessage').value;
      
      if (!ticketId || !recipientAddress) {
          showNotification('Please select a ticket and enter a recipient address.', 'error');
          return;
      }
      
      // Validate Ethereum address
      if (!isValidEthereumAddress(recipientAddress)) {
          showNotification('Please enter a valid Ethereum address.', 'error');
          return;
      }
      
      // Simulate transfer
      simulateTicketTransfer(ticketId, recipientAddress, message)
          .then(() => {
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
          })
          .catch(error => {
              console.error('Transfer failed:', error);
              showNotification('Transfer failed. Please try again.', 'error');
          });
  }
  
  // Handle sell ticket
  function handleSellTicket(e) {
      e.preventDefault();
      
      const ticketId = sellTicketSelect.value;
      const price = document.getElementById('ticketPrice').value;
      const description = document.getElementById('ticketDescription').value;
      
      if (!ticketId || !price) {
          showNotification('Please select a ticket and enter a price.', 'error');
          return;
      }
      
      // Get ticket details
      const ticket = userTickets.find(t => t.id === ticketId);
      if (!ticket) {
          showNotification('Ticket not found.', 'error');
          return;
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
          description: description,
          createdAt: new Date().toISOString(),
          status: 'active'
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
          price: price
      });
  }
  
  // Add listing to UI
  function addListingToUI(listing) {
      const listingsContainer = document.getElementById('listingsContainer');
      const noListingsMessage = document.getElementById('noListingsMessage');
      
      // Hide "No listings" message
      if (noListingsMessage) {
          noListingsMessage.style.display = 'none';
      }
      
      // Create listing element
      const listingElement = document.createElement('div');
      listingElement.className = 'listing-item';
      listingElement.setAttribute('data-listing-id', listing.id);
      
      listingElement.innerHTML = `
          <div class="listing-header">
              <h4>${listing.eventName}</h4>
              <span class="listing-status">Active</span>
          </div>
          <div class="listing-content">
              <div class="listing-details">
                  <p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <strong>Date:</strong> ${listing.date} at ${listing.time}
                  </p>
                  <p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <strong>Location:</strong> ${listing.location}
                  </p>
                  <p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                      <strong>Price:</strong> ${listing.listingPrice} ETH
                  </p>
                  <p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <strong>Listed:</strong> ${new Date(listing.createdAt).toLocaleDateString()}
                  </p>
              </div>
              <div class="listing-actions">
                  <button class="edit-btn" data-listing-id="${listing.id}">Edit Listing</button>
                  <button class="remove-btn" data-listing-id="${listing.id}">Remove</button>
              </div>
          </div>
      `;
      
      listingsContainer.appendChild(listingElement);
      
      // Add event listeners to buttons
      const editBtn = listingElement.querySelector('.edit-btn');
      const removeBtn = listingElement.querySelector('.remove-btn');
      
      editBtn.addEventListener('click', () => {
          // Implement edit listing functionality
          alert('Edit listing functionality would be implemented here.');
      });
      
      removeBtn.addEventListener('click', () => {
          removeListing(listing.id);
      });
  }
  
  // Remove listing
  function removeListing(listingId) {
      const confirmRemove = confirm('Are you sure you want to remove this listing?');
      if (!confirmRemove) return;
      
      // Find listing
      const listingIndex = userListings.findIndex(l => l.id === listingId);
      if (listingIndex === -1) return;
      
      // Remove from array
      userListings.splice(listingIndex, 1);
      
      // Remove from UI
      const listingElement = document.querySelector(`[data-listing-id="${listingId}"]`);
      if (listingElement) {
          listingElement.remove();
      }
      
      // Check if no listings left
      if (userListings.length === 0) {
          document.getElementById('noListingsMessage').style.display = 'block';
      }
      
      // Show notification
      showNotification('Listing removed successfully.', 'success');
      
      // Log analytics event
      logEvent('listing_removed', {
          listing_id: listingId
      });
  }
  
  // Handle create listing
  function handleCreateListing(e) {
      e.preventDefault();
      
      const eventName = document.getElementById('eventName').value;
      const eventDate = document.getElementById('eventDate').value;
      const eventTime = document.getElementById('eventTime').value;
      const eventLocation = document.getElementById('eventLocation').value;
      const category = document.getElementById('ticketCategory').value;
      const price = document.getElementById('listingPrice').value;
      const ticketProof = document.getElementById('ticketProof').files[0];
      
      if (!eventName || !eventDate || !eventTime || !eventLocation || !category || !price || !ticketProof) {
          showNotification('Please fill in all required fields.', 'error');
          return;
      }
      
      // Simulate verification process
      showNotification("Your listing is being verified.", 'info');
  }
  
  // Add these new functions for the Group Discount feature
  function populateGroupEventSelect() {
      // Clear existing options except the first one
      while (groupEventSelect.options.length > 1) {
          groupEventSelect.remove(1);
      }
      
      // Add events as options
      events.forEach(event => {
          const option = document.createElement('option');
          option.value = event.id;
          option.textContent = `${event.title} - ${event.price} ETH`;
          groupEventSelect.appendChild(option);
      });
      
      // Update summary after populating
      updateGroupDiscountSummary();
  }
  
  function updateGroupDiscountSummary() {
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
      
      // Calculate discount rate based on quantity
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
  
  function handleGroupPurchase() {
      const quantity = parseInt(ticketQuantity.value);
      const eventId = groupEventSelect.value;
      
      if (!eventId) {
          showNotification('Please select an event.', 'error');
          return;
      }
      
      if (!userAddress) {
          showNotification('Please connect your wallet first.', 'error');
          connectWalletBtn.scrollIntoView({ behavior: 'smooth' });
          hideModal(groupDiscountModal);
          return;
      }
      
      const event = events.find(e => e.id == eventId);
      if (!event) {
          showNotification('Event not found.', 'error');
          return;
      }
      
      // Calculate discount
      let discount = 0;
      if (quantity >= 10) {
          discount = 0.25;
      } else if (quantity >= 5) {
          discount = 0.15;
      } else if (quantity >= 3) {
          discount = 0.10;
      }
      
      const singlePrice = parseFloat(event.price);
      const totalWithoutDiscount = singlePrice * quantity;
      const savings = totalWithoutDiscount * discount;
      const totalPrice = totalWithoutDiscount - savings;
      
      // Add to cart as a group purchase
      const cartItem = {
          id: Date.now(),
          eventId: eventId,
          title: `${event.title} (Group of ${quantity})`,
          date: event.date,
          time: event.time,
          price: (totalPrice / quantity).toFixed(2), // Price per ticket with discount
          originalPrice: event.price,
          image: event.image,
          location: event.location,
          quantity: quantity,
          isGroupPurchase: true,
          groupDiscount: discount,
          totalPrice: totalPrice.toFixed(2)
      };
      
      cart.push(cartItem);
      
      // Update cart UI
      updateCartUI();
      
      // Save cart to localStorage
      saveCart();
      
      // Show notification
      showNotification(`Group of ${quantity} tickets for ${event.title} added to cart with ${(discount * 100).toFixed(0)}% discount!`, 'success');
      
      // Hide modal
      hideModal(groupDiscountModal);
      
      // Log analytics event
      logEvent('add_group_to_cart', {
          event_id: eventId,
          event_name: event.title,
          quantity: quantity,
          discount_rate: discount,
          total_price: totalPrice.toFixed(2)
      });
  }
  
  // Add these functions for the Lottery feature
  function startLotteryTimer() {
      function updateTimer() {
          const now = new Date();
          const distance = lotteryEndDate - now;
          
          // Calculate days, hours, minutes, and seconds
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          // Update the timer display
          if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
          if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
          if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
          if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
          
          // If the countdown is over, reset it
          if (distance < 0) {
              lotteryEndDate = new Date();
              lotteryEndDate.setDate(lotteryEndDate.getDate() + 14);
          }
      }
      
      // Update timer immediately and then every second
      updateTimer();
      setInterval(updateTimer, 1000);
  }
  
  function updateLotteryEntries() {
      // Calculate entries based on user's tickets
      lotteryEntries = userTickets.length;
      
      // Update the UI
      if (userEntries) {
          userEntries.textContent = lotteryEntries;
      }
  }
  
  function enterLottery() {
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
      
      // Simulate lottery entry
      showNotification(`You've successfully entered the lottery with ${lotteryEntries} entries!`, 'success');
      
      // Log analytics event
      logEvent('enter_lottery', {
          entries: lotteryEntries
      });
  }
  
  // Utility functions
  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
      document.body.appendChild(notification);
      
      // Remove after 3 seconds
      setTimeout(() => {
          notification.remove();
      }, 3000);
  }
  
  function isValidEthereumAddress(address) {
      return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
  }
  
  // Simulate ticket transfer
  function simulateTicketTransfer(ticketId, recipientAddress, message) {
      return new Promise((resolve, reject) => {
          // Simulate network delay
          setTimeout(() => {
              // Simulate success or failure
              const success = Math.random() > 0.1; // 90% success rate
              
              if (success) {
                  resolve({
                      transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
                      blockNumber: Math.floor(Math.random() * 1000000),
                      timestamp: Date.now()
                  });
              } else {
                  reject(new Error('Simulated transfer failure.'));
              }
          }, 1500);
      });
  }
  
  // Handle logout
  function handleLogout() {
      auth.signOut()
          .then(() => {
              // Sign-out successful.
              console.log('User signed out');
              
              // Log analytics event
              logEvent('logout');
          })
          .catch((error) => {
              // An error happened.
              console.error('Sign out error:', error);
          });
  }
  
  // Handle Google Login
  handleGoogleLogin = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider)
          .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = result.credential;
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              console.log('Google sign in success', user);
              hideModal(loginModal);
              
              // Log analytics event
              logEvent('login', {
                  method: 'google'
              });
          }).catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              const credential = error.credential;
              console.error('Google sign in error', error);
              showNotification('Google sign in error: ' + errorMessage, 'error');
          });
  }
  
  // Handle Email Login
  handleEmailLogin = (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log('Email sign in success', user);
              hideModal(loginModal);
              
              // Log analytics event
              logEvent('login', {
                  method: 'email'
              });
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error('Email sign in error', error);
              showNotification('Email sign in error: ' + errorMessage, 'error');
          });
  }
  
  // Show modal
  showModal = (modal) => {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  // Hide modal
  hideModal = (modal) => {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // Allow scrolling
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
      document.body.classList.toggle('dark');
      document.documentElement.classList.toggle('dark');
      document.documentElement.classList.toggle('light');
      
      const isDarkMode = document.body.classList.contains('dark');
      localStorage.setItem('darkMode', isDarkMode);
      
      // Log analytics event
      logEvent('dark_mode_toggled', {
          dark_mode: isDarkMode
      });
  }
  
  // Handle newsletter signup
  function handleNewsletterSignup(e) {
      e.preventDefault();
      
      const email = document.getElementById('newsletterEmail').value;
      
      if (!email) {
          showNotification('Please enter your email address.', 'error');
          return;
      }
      
      // Simulate signup process
      showNotification('Thank you for subscribing to our newsletter!', 'success');
      
      // Log analytics event
      logEvent('newsletter_signup', {
          email: email
      });
  }
  
  // Send chat message
  function sendChatMessage() {
      const message = chatbotInput.value;
      if (message.trim() === '') return;
      
      // Add user message to chat
      addChatMessage(message, 'user');
      
      // Simulate bot response
      setTimeout(() => {
          const botResponse = getBotResponse(message);
          addChatMessage(botResponse, 'bot');
      }, 1000);
      
      // Clear input
      chatbotInput.value = '';
  }
  
  // Add chat message to UI
  function addChatMessage(message, sender) {
      const messageElement = document.createElement('div');
      messageElement.className = `chatbot-message ${sender}`;
      messageElement.textContent = message;
      chatbotMessages.appendChild(messageElement);
      
      // Scroll to bottom
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  // Get bot response
  function getBotResponse(message) {
      message = message.toLowerCase();
      
      if (message.includes('hello') || message.includes('hi')) {
          return 'Hello! How can I help you today?';
      } else if (message.includes('events') || message.includes('tickets')) {
          return 'You can browse our available events on the Events page. If you have purchased tickets, you can view them in the My Tickets section.';
      } else if (message.includes('wallet') || message.includes('connect')) {
          return 'To connect your wallet, click the Connect Wallet button in the navigation bar. Make sure you have MetaMask installed.';
      } else if (message.includes('purchase') || message.includes('buy')) {
          return 'To purchase tickets, add them to your cart and proceed to checkout. You will need to connect your wallet to complete the purchase.';
      } else if (message.includes('transfer') || message.includes('sell')) {
          return 'You can transfer or sell your tickets in the My Tickets section. Make sure you have connected your wallet.';
      } else {
          return 'I am sorry, I do not understand. Please ask another question.';
      }
  }
  
  // Log page view
  logPageView = () => {
      if (analytics) {
          analytics.logEvent('page_view', {
              page_path: window.location.pathname
          });
      } else {
          console.log('Analytics not available');
      }
  }
  
  // Log event
  function logEvent(eventName, params = {}) {
      if (analytics) {
          analytics.logEvent(eventName, params);
      } else {
          console.log(`Event: ${eventName}`, params);
      }
  }


  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section-content");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                    entry.target.classList.add("visible"); // Add class when 20% visible
                }
            });
        },
        { threshold: [0.2] } // Trigger when 20% of the section is visible
    );

    sections.forEach((section) => {
        observer.observe(section);

        // Immediately show sections already in view (like hero section)
        if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.add("visible");
        }
    });
});

