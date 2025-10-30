// Block direct acsess to welcome page
if (window.location.pathname.includes('welcome.html')){
    
    const savedUser = localStorage.getItem('demo_username');
    const savedPass = localStorage.getItem('demo_password');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if(!savedUser || !savedPass || isLoggedIn !== 'true'){
        window.location.href = 'index.html';
    }
}


// Block direct acsess to login page
if (window.location.pathname.includes('index.html')){
   const isLoggedIn = localStorage.getItem('isLoggedIn');
   if (isLoggedIn === 'true'){
    window.location.href = 'welcome.html';
   }
}

// Dispay username from localStorage
const userDisplay = document.getElementById('userDisplay');
const savedUser = localStorage.getItem('demo_username');
if(userDisplay && savedUser){
    userDisplay.textContent = savedUser;
}


// Signup Handler
const signupForm = document.getElementById('signupForm');
if (signupForm){
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('newUsername').value.trim();
        const password = document.getElementById('newPassword').value;
        const confirm = document.getElementById('confirmPassword').value;
        const msg = document.getElementById('signupMessage');

        msg.textContent = '';
        msg.classList.remove('success', 'error');

        if (!username || !password){
            msg.textContent = 'Please fill in all fields.';
            msg.classList.add('error', 'shake');
            setTimeout(() => msg.classList.remove('shake'), 400);
            return;
        }

        if (password !== confirm){
            msg.textContent = 'Passwords do not match.'
            msg.classList.add('error', 'shake');
            setTimeout(() => msg.classList.remove('shake'), 400);
            return;
        }

        localStorage.setItem('demo_username', username);
        localStorage.setItem('demo_password', password);

        msg.textContent = 'Account Created - You may now log in.'
        msg.classList.add('success');
        signupForm.reset();
    });
};

// Login Handler
const loginForm = document.getElementById('loginForm');
if(loginForm){
    loginForm.addEventListener('submit', (e) =>{
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const msg = document.getElementById('loginMessage');

        msg.textContent = '';
        msg.classList.remove('sucess', 'error');

        const savedUser = localStorage.getItem('demo_username');
        const savedPass = localStorage.getItem('demo_password');

        if (!username || !password){
            msg.textContent = 'Please fill in both fields.';
            msg.classList.add('error', 'shake');
            setTimeout(() => msg.classList.remove('shake'), 400);
            return;
        }

        if(username === savedUser && password === savedPass){
            msg.textContent = 'Login sucessful!';
            msg.classList.add('sucess');
            localStorage.setItem('isLoggedIn', 'true');
            setTimeout(() =>{
                window.location.href = 'welcome.html';
            }, 1000);
        } else{
            msg.textContent = 'Incorrect username or password.'
            msg.classList.add('error', 'shake');
            setTimeout(() => msg.classList.remove('shake'), 400);
        }
    });
}

// Logout Handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn){
    logoutBtn.addEventListener('click', () => {

        const logoutMsg = document.createElement('p');
        logoutMsg.textContent = "Logging out... Catch you later, Phantom Theif!";
        logoutMsg.classList.add('success', 'logout-message');
        document.body.appendChild(logoutMsg);

        logoutMsg.style.opacity = '0';
        logoutMsg.style.transition = 'opacity 0.8s ease';
        setTimeout(() => logoutMsg.style.opacity = '1', 100);
        setTimeout(() => logoutMsg.style.opacity = '0', 1500);

        setTimeout(() => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        }, 1800);
    });
}