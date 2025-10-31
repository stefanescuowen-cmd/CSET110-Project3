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

// Typewriter effect function
function typeWriter(element, text, speed = 50, callback){
    element.textContent = '';
    let i=0;
    const interval = setInterval(() => {
        if (i < text.length){
            element.textContent += text.charAt(i);
            i++;
        }
        else{
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}


// Display welcome message and show buttons
const userDisplay = document.getElementById('userDisplay');
const savedUser = localStorage.getItem('demo_username');
const logoutBtn = document.getElementById('logoutBtn');
const img = document.querySelector('.container img')

if (userDisplay && savedUser){
    const welcomeMsg = `Who's heart are we stealing today, ${savedUser}??`;

typeWriter(userDisplay, welcomeMsg, 50,() =>{

    if (img){
        img.style.transition = 'opacity 1s ease';
        img.style.opacity = '1';
    }

    if (logoutBtn){
        logoutBtn.classList.add('visible')

        setTimeout(() => {
            logoutBtn.style.opacity = '1';
        }, 800);

        logoutBtn.addEventListener('click', () => {
            logoutBtn.disabled = true;

            const overlay = document.createElement('div');
            overlay.classList.add('logout-message');
            document.body.appendChild(overlay);

            typeWriter (overlay, "Time to make like a hedgehog and roll on out of here!", 50, () => {
                setTimeout(() => {
                overlay.textContent = '';
                typeWriter(overlay, "Logging out... Catch you later, Phantom Theif!", 50, () => {
                    localStorage.removeItem('isLoggedIn');
                    window.location.href = 'index.html';
                });
            }, 800);
        });
    })
}
}, Math.max(welcomeMsg.length * 50, 500));
}
            
// Reusable shake animation for errors
function triggerErrorAnimation(msgElement){
    msgElement.classList.remove('error');
    void msgElement.offsetWidth;
    msgElement.classList.add('error');
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
            triggerErrorAnimation(msg);
            return;
        }

        if (password !== confirm){
            msg.textContent = 'Passwords do not match.'
            triggerErrorAnimation(msg);
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
        msg.classList.remove('success', 'error');

        const savedUser = localStorage.getItem('demo_username');
        const savedPass = localStorage.getItem('demo_password');

        if (!username || !password){
            msg.textContent = 'Please fill in both fields.';
            triggerErrorAnimation(msg);
            return;
        }

        if(username === savedUser && password === savedPass){
            msg.textContent = 'Login sucessful!';
            msg.classList.add('success');
            localStorage.setItem('isLoggedIn', 'true');
            setTimeout(() =>{
                window.location.href = 'welcome.html';
            }, 1000);
        } else{
            msg.textContent = 'Incorrect username or password.'
            triggerErrorAnimation(msg);
        }
    });
}