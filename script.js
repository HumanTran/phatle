const mainImage = document.getElementById('mainImage');
const imageContainer = document.getElementById('imageContainer');
const letterContent = document.getElementById('letterContent');
const bgMusic = document.getElementById('bgMusic');
let currentState = 'biathu'; // biathu, phongthu, phatle1, phatle2

mainImage.addEventListener('click', function() {
    console.log('Clicked biathu, currentState:', currentState);
    if (currentState === 'biathu') {
        // Đổi sang phongthu
        mainImage.src = 'phongthu.jpg';
        currentState = 'phongthu';
        
        // Sau 0.7 giây ẩn ảnh và hiện thư
        setTimeout(() => {
            // Fade out ảnh
            imageContainer.style.opacity = '0';
            
            setTimeout(() => {
                imageContainer.style.display = 'none';
                imageContainer.style.visibility = 'hidden';
                // Hiện nội dung thư
                letterContent.style.visibility = 'visible';
                letterContent.style.opacity = '1'; // Reset opacity
                letterContent.style.transition = ''; // Reset transition
                letterContent.classList.add('show');
                currentState = 'phatle1';
                
                // Phát nhạc khi phatle1 hiện ra
                bgMusic.play().catch(e => console.log('Audio play failed:', e));
            }, 300);
        }, 700);
    }
});

// Click vào ảnh phatle1 để hiện phatle2
const letterImage = letterContent.querySelector('.letter-image');
const letterText = document.getElementById('letterText');

letterImage.addEventListener('click', function(e) {
    e.stopPropagation();
    
    if (currentState === 'phatle1') {
        // Fade out
        letterImage.classList.add('fade-out');

        setTimeout(() => {
            // Đổi sang phatle2
            letterImage.src = 'phatle2.jpg';
            letterImage.classList.remove('fade-out');
            letterImage.classList.add('fade-in');
            letterContent.style.animation = 'letterAppear 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)';
            currentState = 'phatle2';

            // Sau khi hiệu ứng fade-in xong thì bỏ class để tái sử dụng
            setTimeout(() => {
                letterImage.classList.remove('fade-in');
            }, 400);
        }, 300);
    } else if (currentState === 'phatle2') {
        // Click lần 2 để hiện nội dung thư
        letterImage.classList.add('fade-out');

        const onFadeOutEnd = () => {
            // Gỡ event listener để tránh lặp lại
            letterImage.removeEventListener('transitionend', onFadeOutEnd);

            // Ẩn ảnh và hiện thư
            letterImage.style.display = 'none';
            letterImage.classList.remove('fade-out');
            letterText.style.display = 'block';
            letterText.style.animation = 'fadeInText 0.8s ease';
            currentState = 'phatle3';
        };

        // Lắng nghe khi hiệu ứng kết thúc
        letterImage.addEventListener('transitionend', onFadeOutEnd);
}
});


// Nút close
const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('Close button clicked');
    
    // Fade out thư hoàn toàn
    letterContent.style.transition = 'opacity 0.3s ease';
    letterContent.style.opacity = '0';
    
    setTimeout(() => {
        // Ẩn hoàn toàn thư
        letterContent.classList.remove('show');
        letterContent.style.visibility = 'hidden';
        
        // Hiện lại biathu
        imageContainer.style.display = 'block';
        imageContainer.style.visibility = 'visible';
        imageContainer.style.opacity = '0';
        
        setTimeout(() => {
            imageContainer.style.opacity = '1';
        }, 50);
        
        mainImage.src = 'biathu.jpg';
        currentState = 'biathu';
        console.log('Reset to biathu, currentState:', currentState);
        
        // Reset ảnh về phatle1
        letterImage.src = 'phatle1.jpg';
        letterImage.style.display = 'block';
        letterText.style.display = 'none';
    }, 300);
});
