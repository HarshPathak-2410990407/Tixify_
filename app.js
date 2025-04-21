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
