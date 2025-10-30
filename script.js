// Signup Handler

const signupForm = document.getElementById('signupForm');
if (signupForm){
    signupForm.addEventListener('submit', (e) => {
        const username = document.getElementById('newUsername').value.trim();
        const password = document.getElementById('newPassword').value;
        const confirm = document.getElementById('confirmPassword').value;
        const msg = document.getElementById('signupMessage');

        msg.textContent = '';

        if (!username || !password){
            msg.textContent = 'Please fill in all fields.';
            return;
        }
        if (password !== confirm){
            msg.textContent = 'Passwords do not match.'
            return;
        }

        localStorage.setItem('demo_username', username);
        localStorage.setItem('demo_password', password);

        msg.textContent = 'Account Created - You may now log in.'
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

        const savedUser = localStorage.getItem('demo_username');
        const savedPass = localStorage.getItem('demo_password');

        if (!username || !password){
            msg.textContent = 'Please fill in both fields.';
            return;
        }

        if (username === savedUser && password === savedPass){
            msg.textContent = 'Login successful!';
        }

        else{
            msg.textContent = 'Incorrect username or password.';
        }
    });
}