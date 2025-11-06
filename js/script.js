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


    // ======== ▼ 3. 팝업 기능  ▼ ========
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
            e.preventDefault(); // a 태그의 기본 동작(페이지 이동) 막기

            // 1. 클릭된 버튼의 부모(.item-text)에서 정보 가져오기
            const itemText = e.target.closest('.item-text');
            const title = itemText.querySelector('h2').innerHTML; // <br> 포함
            const description = itemText.querySelector('p').textContent;

            // 2. 클릭된 버튼의 형제(.item-image)에서 이미지 경로 가져오기
            const itemBox = e.target.closest('.tech-item');
            const imageSrc = itemBox.querySelector('.item-image img').src;

            // 3. 팝업창에 가져온 정보 채우기
            modalTitle.innerHTML = title;
            modalDescription.textContent = description + " (여기에 더 자세한 설명을 추가할 수 있습니다.)";
            modalImage.src = imageSrc;

            // 4. 팝업창 보이기
            modalOverlay.classList.add('active');
        });
    });

    // 닫기 버튼 클릭 시 팝업창 숨기기
    modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    // 팝업창 바깥의 어두운 영역 클릭 시 숨기기
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
    // ======== ▲ 추가 끝 ▲ ========
});
