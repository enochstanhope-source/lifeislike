// Function to inject the mobile menu into any page
function injectMobileMenu() {
  const menuHTML = `
    <style>
      @media (max-width: 768px) {
        .main-header {
          position: fixed;
          width: 100vw;
          top: 0;
          left: 0;
          z-index: 10000;
           background: linear-gradient(to bottom, #047680ff, #030000ff);
        }
        
        .nav-links {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
       background: linear-gradient(to bottom, #047680ff, #030000);
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 80px;
          transform: translateY(-100%);
          transition: transform 2s ease-in-out, opacity 2s ease-in-out, visibility 0s 2s;
          opacity: 1;
          visibility: hidden;
          
        }
        .nav-links.active {
          visibility: visible;
          transform: translateY(0);
          opacity: 1;
          transition: transform 2s ease-in-out, opacity 2s ease-in-out, visibility 0s;
        }
        .nav-links.closing {
          visibility: hidden;
          transform: translateX(100%);
          opacity: 0;
          transition: transform 2s ease-in-out, opacity 2s ease-in-out, visibility 0s 2s;
        }
        .nav-dropdown {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .account-btn {
        background: linear-gradient(to bottom, #068e9ac1, #030000);
          border: none;
          color: white;
          cursor: pointer;
          padding: 5px 37px;
          border-radius: 9px;
          line-height: 0.5;
          margin-bottom: 12px;
          box-shadow: 0 2px 12px -2px rgba(0, 0, 0, 0.81);
          
        
        }

        .account-btn1 {
          background: linear-gradient(to bottom, #d3d3d3ff, #000000ff);
          border: none;
          color: white;
          cursor: pointer;
          padding: 5px 15px;
          border-radius: 9px;
          line-height: 0.5;
          padding: 5px 59px;
          
          
        }
        
        .nav-links li > a {
          display: none;
        }
        .nav-links li > button {
          display: block;
        }
        .dropdown {
          all: initial;
          position: static;
          display: block;
          background: none !important;
          margin: 0;
          padding: 0;
          z-index: 10001;
          
        }
        .dropdown li a {
            margin-top: 14px;
            
            color: #fff;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            text-decoration: none;
            border-radius: 22px;
            font-size: 0.75rem;
            letter-spacing: 0.04em;
            font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;
            font-weight: 500;
            margin-bottom: 12px;
            background: linear-gradient(to bottom, #3c4343e8, #030000);
            box-shadow: 0 2px 12px -2px rgba(107, 105, 105, 0.81);
            border: 1px solid rgba(187, 185, 185, 0.66);
            transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
            position: relative;
            overflow: hidden;
          }
          .dropdown li a:hover, .dropdown li a:active {
            background: linear-gradient(120deg, #f8a9a9 0%, #410808 100%);
            color: #fff;
            transform: scale(1.04);
            box-shadow: 0 4px 24px -4px rgba(208, 255, 0, 0.22);
            border: 1px solid rgba(255,255,255,0.18);
        }
        .dropdown li a:active {
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
          color: #ffffff;
          transform: translateX(8px) scale(1.03);
          box-shadow: 0 4px 20px -4px rgba(255, 0, 76, 0.18),
                     inset 0 0 0 1px rgba(255,255,255,0.12);
          letter-spacing: 0.04em;
        }
      }
      @media (min-width: 769px) {
        .main-header {
         background: linear-gradient(to bottom, #047680ff, #030000ff);
        }
        .nav-links li > button {
          display: none !important;
        }
        .nav-links li > a {
          display: block !important;
        }
        .dropdown {
          all: initial;
          position: absolute;
          display: block;
          top: 100%;
          left: 0;
          background: none !important;
          margin: 0;
          padding: 0;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-40px);
          transition: all 0.3s ease;
        }
        .nav-dropdown:hover > .dropdown, .nav-dropdown:focus-within > .dropdown {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .dropdown li a {
          color: #f8f8ff;
          padding: 20px 36px;
          display: flex;
          align-items: center;
          text-decoration: none;
          border-radius: 16px;
          font-size: 1.15rem;
          letter-spacing: 0.03em;
          font-family: inherit;
          font-weight: 450;
          margin-bottom: 12px;
           background: linear-gradient(to bottom, #97c5c9ff, #030000ff);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        .dropdown li a:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
          color: #ffffff;
          transform: translateX(8px) scale(1.03);
          box-shadow: 0 4px 20px -4px rgba(80,15,35,0.18),
                     inset 0 0 0 1px rgba(255,255,255,0.12);
          letter-spacing: 0.04em;
        }
      }
    </style>
    <header class="main-header">
      <nav class="main-nav">
  <div class="nav-logo" style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; font-weight: 800; font-size: 1.35rem; letter-spacing: 1.7px; background: linear-gradient(90deg, #fff 10%, #047680 60%, #ffb347 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 18px #04768055, 0 1px 0 #fff, 0 0px 8px #ffb34744; padding: 0 8px 0 0; border-radius: 12px; display: flex; align-items: center; height: 54px; box-shadow: 0 2px 16px 0 #04768022; margin-left: -16px; transform: translateX(-6px); justify-content: flex-start;">
          <a href="index.html" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 2.1rem; font-weight: 900; margin-right: 8px; letter-spacing:2px; filter: drop-shadow(0 2px 8px #04768088);">❄️</span>
            <span style="display: flex; flex-direction: column; line-height: 1.1;">
              <span style="font-size: 1.25rem; font-weight: 900; letter-spacing:2.2px; background: linear-gradient(90deg, #fff 10%, #047680 60%, #ffb347 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 2px 8px #04768044, 0 1px 0 #fff;">Winter Suites</span>
              <span style="font-size: 0.92rem; font-weight: 600; letter-spacing:1.2px; opacity:0.92; background: linear-gradient(90deg, #ffb347 0%, #047680 80%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 1px 6px #ffb34733;">Hotel Reservation</span>
            </span>
          </a>
        </div>
        <button class="nav-hamburger" id="navHamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links" id="navLinks">
          <li>
            <a href="index.html">Home</a>
            <button class="account-btn"><a href="index.html">Home</a></button>
          </li>
          <li class="nav-dropdown">
            <a href="#">About Us</a>
            <button class="account-btn"><a href="#">About Us</a></button>
            <ul class="dropdown">
              <li><a href="ourstory.html">About Us </a></li>
              <li><a href="ourteam.html">Board</a></li>
            
            </ul>
          </li>
          <li class="nav-dropdown">
            <a href="#">Programs</a>
            <button class="account-btn"><a href="#">Rooms</a></button>
            <ul class="dropdown">
              <li><a href="digital.html"><i class="fas fa-bed"></i> Standard Room</a></li>
              <li><a href="business.html"><i class="fas fa-gem"></i> Deluxe Room</a></li>
              <li><a href="vocational.html"><i class="fas fa-briefcase"></i> Executive Room</a></li>
              <li><a href="soft.html"><i class="fas fa-home"></i> Family Suite</a></li>
            </ul>
          </li>
          <li class="nav-dropdown">
            <a href="#">Contact Us</a>
            <button class="account-btn"><a href="#">Contact Us</a></button>
            <ul class="dropdown">
              <li><a href="support.html">Customer Support</a></li>
              <li><a href="map.html">Store Locations</a></li>
            </ul>
          </li>
          <li class="nav-dropdown">
            <a href="#">Account</a>
            <button class="account-btn1"><a href="#">Account</a></button>
            <ul class="dropdown">
              <li><a href="login.html">Login</a></li>
              <li><a href="signup.html">Sign Up</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
    `;

  // Insert the menu at the beginning of the body
  document.body.insertAdjacentHTML('afterbegin', menuHTML);

  // Add event listeners for mobile menu functionality
  const navHamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  let menuOpen = false;
  navHamburger.addEventListener('click', () => {
    navHamburger.classList.toggle('active');
    if (!menuOpen) {
      navLinks.classList.add('active');
      navLinks.classList.remove('closing');
      menuOpen = true;
    } else {
      navLinks.classList.remove('active');
      navLinks.classList.add('closing');
      setTimeout(() => {
        navLinks.classList.remove('closing');
        menuOpen = false;
      }, 2000); // match transition duration
    }
  });

  // Add click event listeners to dropdown parent links only (mobile only)
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dropdown => {
    const parentLink = dropdown.querySelector('a[href="#"]');
    if (parentLink) {
      parentLink.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) { // Only for mobile view
          const dropdownContent = dropdown.querySelector('.dropdown');
          dropdownContent.style.display =
            dropdownContent.style.display === 'block' ? 'none' : 'block';
          e.preventDefault(); // Only prevent default for parent link
        }
      });
    }
  });
}

// Function to update account menu based on auth state
function updateAccountMenu(user) {
  const accountDropdown = document.querySelector('.nav-dropdown:last-child .dropdown');
  if (!accountDropdown) return;

  if (user) {
    // User is signed in
    accountDropdown.innerHTML = `
      <li><a href="#" id="signOutBtn"><span id="signOutText">Sign Out</span></a></li>
    `;
    // Add sign out functionality
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Create progress bar overlay
        let loaderOverlay = document.createElement('div');
        loaderOverlay.id = 'loaderOverlay';
        loaderOverlay.innerHTML = `
          <div class="progressbar-overlay">
            <div class="progressbar-container">
              <div class="progressbar-label">Signing Out...</div>
              <div class="progressbar-bg">
                <div class="progressbar-fill" id="signOutProgressBar"></div>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(loaderOverlay);
        // Add progress bar styles
        if (!document.getElementById('progressBarStyle')) {
          const style = document.createElement('style');
          style.id = 'progressBarStyle';
          style.innerHTML = `
            .progressbar-overlay {
              position: fixed;
              inset: 0;
              width: 100vw; height: 100vh;
              background: rgba(6, 30, 38, 0.45); /* subtle dark teal */
              z-index: 99999;
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter: blur(6px) saturate(140%);
            }
            .progressbar-container {
              background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
              border-radius: 16px;
              padding: 28px 36px;
              min-width: 300px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 18px;
              border: 1px solid rgba(255,255,255,0.06);
              box-shadow: 0 10px 30px rgba(2,40,50,0.28);
            }
            .progressbar-label {
              font-size: 1.1rem;
              font-weight: 600;
              color: #e6f7f5; /* light teal */
              margin: 0;
              letter-spacing: 0.6px;
            }
            .progressbar-bg {
              width: 100%;
              height: 12px;
              background: rgba(255,255,255,0.04);
              border-radius: 8px;
              overflow: hidden;
            }
            .progressbar-fill {
              height: 100%;
              width: 0%;
              background: linear-gradient(90deg, #06b6a4, #0891b2);
              border-radius: 8px;
              transition: width 0.12s linear;
              box-shadow: 0 4px 12px rgba(3, 102, 102, 0.12) inset;
            }
            .progressbar-success {
              margin-top: 8px;
              display: flex;
              align-items: center;
              gap: 10px;
              color: #cfffe9;
              font-weight: 600;
              opacity: 0;
              transform: translateY(6px);
              transition: opacity 260ms ease, transform 260ms ease;
            }
            .progressbar-success.show {
              opacity: 1;
              transform: translateY(0);
            }
            .progressbar-check {
              width: 44px;
              height: 44px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(180deg, #0ea5a4, #059669);
              border-radius: 50%;
              box-shadow: 0 6px 20px rgba(6, 92, 84, 0.28);
              color: white;
            }
          `;
          document.head.appendChild(style);
        }
        // Animate progress bar for ~3 seconds
        const progressBar = document.getElementById('signOutProgressBar');
        let progress = 0;
        const duration = 3000; // 3 seconds
        const interval = 40;
        const step = 100 / (duration / interval);
        const progressInterval = setInterval(() => {
          progress += step;
          if (progressBar) progressBar.style.width = Math.min(progress, 100) + '%';
          if (progress >= 100) {
            clearInterval(progressInterval);
            // Show success text and icon before redirect
            const container = loaderOverlay.querySelector('.progressbar-container');
            if (container) {
              let successDiv = container.querySelector('.progressbar-success');
              if (!successDiv) {
                successDiv = document.createElement('div');
                successDiv.className = 'progressbar-success';
                successDiv.innerHTML = `<div class="progressbar-check" aria-hidden="true">\n  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path d="M16 6L8.5 13.5L4 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n  </svg>\n</div><span>Signed out</span>`;
                container.appendChild(successDiv);
                // trigger show animation
                requestAnimationFrame(() => successDiv.classList.add('show'));
              }
            }
            setTimeout(() => {
              firebase.auth().signOut().then(() => {
                window.location.href = 'index.html';
              }).catch((error) => {
                console.error('Sign Out Error', error);
                if (loaderOverlay) loaderOverlay.remove();
                const signOutText = document.getElementById('signOutText');
                if (signOutText) signOutText.textContent = 'Sign Out';
              });
            }, 600); // brief pause for success animation
          }
        }, interval);
        // Change button text to progress bar
        const signOutText = document.getElementById('signOutText');
        if (signOutText) {
          signOutText.innerHTML = '<span style="display:inline-block;vertical-align:middle;color:#3f020b;font-weight:600;">Signing Out...</span>';
        }
      });
    }
  } else {
    // User is signed out
    accountDropdown.innerHTML = `
      <li><a href="login.html">Login</a></li>
      <li><a href="signup.html">Sign Up</a></li>
    `;
  }
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  injectMobileMenu();
  
  // Add Firebase auth state observer
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged((user) => {
      updateAccountMenu(user);
    });
  }
});
