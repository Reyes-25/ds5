const image = document.getElementById('profile-image');
const fileInput = document.getElementById('file-input');

const savedImage = localStorage.getItem('profileImage');
if (savedImage) {
    image.src = savedImage;
} else {
    image.src = "images/pfp_default.png";
}

image.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            image.src = e.target.result;

            localStorage.setItem('profileImage', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

