document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 기존 필터 기능 ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const techItems = document.querySelectorAll('.tech-item');

    const filterItems = (category) => {
        techItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            // 클릭된 카테고리와 아이템의 카테고리가 일치하는지 확인
            if (category === itemCategory) {
                // 일치하면 보여줌 (hidden 클래스 제거)
                item.style.display = 'grid'; // display 속성을 원래대로 복원
                setTimeout(() => item.classList.remove('hidden'), 10); // 약간의 딜레이 후 애니메이션
            } else {
                // 일치하지 않으면 숨김 (hidden 클래스 추가)
                item.classList.add('hidden');
                // 애니메이션이 끝난 후 공간을 차지하지 않도록 display: none 처리
                setTimeout(() => item.style.display = 'none', 400); 
            }
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 모든 버튼에서 'active' 클래스를 제거
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에만 'active' 클래스를 추가
            button.classList.add('active');

            // 클릭된 버튼의 data-category 값을 가져옴
            const selectedCategory = button.getAttribute('data-category');
            
            // 필터링 함수 실행
            filterItems(selectedCategory);
        });
    });

    // 페이지가 처음 로드될 때 '커피' 카테고리를 기본으로 보여줍니다.
    filterItems('coffee');
    // --- 1. 기존 필터 기능 끝 ---


    // --- 2. 스크롤 리모컨 기능 ---
    const btnScrollTop = document.getElementById('btn-scroll-top');
    const btnScrollBottom = document.getElementById('btn-scroll-bottom');

    // '맨 위로' 버튼 클릭 이벤트
    btnScrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드럽게 스크롤
        });
    });

    // '맨 아래로' 버튼 클릭 이벤트
    btnScrollBottom.addEventListener('click', () => {
        window.scrollTo({
            top: document.body.scrollHeight, // 페이지의 맨 끝으로
            behavior: 'smooth'
        });
    });

    // 스크롤을 감지하는 이벤트 추가
    window.addEventListener('scroll', () => {
        // 사용자가 300px 이상 스크롤을 내렸을 때
        if (window.scrollY > 300) {
            btnScrollTop.style.display = 'block'; // '맨 위로' 버튼 보이기
        } else {
            btnScrollTop.style.display = 'none'; // '맨 위로' 버튼 숨기기
        }
    });
    // --- 2. 스크롤 리모컨 기능 끝 ---

});