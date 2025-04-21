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
