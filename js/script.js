document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 기존 필터 기능 ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const techItems = document.querySelectorAll('.tech-item');

    const filterItems = (category) => {
        techItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === itemCategory) {
                item.style.display = 'grid';
                setTimeout(() => item.classList.remove('hidden'), 10);
            } else {
                item.classList.add('hidden');
                setTimeout(() => item.style.display = 'none', 400); 
            }
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const selectedCategory = button.getAttribute('data-category');
            filterItems(selectedCategory);
        });
    });

    filterItems('coffee');
    // --- 1. 기존 필터 기능 끝 ---


    // --- 2. 스크롤 리모컨 기능 ---
    const btnScrollTop = document.getElementById('btn-scroll-top');
    const btnScrollBottom = document.getElementById('btn-scroll-bottom');

    btnScrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btnScrollBottom.addEventListener('click', () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnScrollTop.style.display = 'block';
        } else {
            btnScrollTop.style.display = 'none';
        }
    });
    // --- 2. 스크롤 리모컨 기능 끝 ---


    // ======== ▼ 3. 팝업(모달) 기능 (제목 <br> 수정됨) ▼ ========
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCloseBtn = document.querySelector('.modal-close');
    const learnMoreButtons = document.querySelectorAll('.btn-more');

    // 팝업창 내부 요소
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description'); 

    // "더 알아보기" 버튼들에 클릭 이벤트 추가
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 

            const itemText = e.target.closest('.item-text');
            const itemBox = e.target.closest('.tech-item');

            // 1. [수정됨] 제목을 가져올 때 <br>을 공백(' ')으로 바꿈
            const titleHTML = itemText.querySelector('h2').innerHTML; // "AI...<br>완벽한..."
            const titleWithSpace = titleHTML.replace(/<br\s*\/?>/gi, ' '); // "<br>" -> " "
            const title = titleWithSpace.replace(/\s+/g, ' ').trim(); // "AI... 완벽한..."
            
            const imageSrc = itemBox.querySelector('.item-image img').src;
            
            // 2. 숨겨둔 상세 내용(.modal-detail-content)의 HTML을 가져옴
            const detailHTML = itemText.querySelector('.modal-detail-content').innerHTML;

            // 3. 팝업창에 정보 채우기
            modalTitle.textContent = title; // 텍스트로 삽입
            modalImage.src = imageSrc;
            modalDescription.innerHTML = detailHTML; 

            // 4. 팝업창 보이기
            modalOverlay.classList.add('active');
        });
    });

    // 닫기 버튼
    modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    // 바깥 영역 클릭
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
    // ======== ▲ 수정 끝 ▲ ========
});
