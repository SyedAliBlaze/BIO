// Get the modal
var modal = document.getElementById("image-modal");

// Get the image and insert it inside the modal
var img = document.getElementById("profile-photo");
var modalImg = document.getElementById("expanded-img");

img.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
}

// Get the <span> element that closes the modal
var close = document.getElementById("close-modal");

close.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when clicking outside the image
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
