// すべてのドキュメントページに追加するスクロールトップボタンのコード

const scrollTopCSS = `
/* スクロールトップボタン - 右下固定 */
.scroll-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.scroll-top.show {
    opacity: 1;
    visibility: visible;
}

.scroll-top:hover {
    background: var(--color-primary-dark, #2563eb);
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.3);
}
`;

const scrollTopHTML = `
<!-- スクロールトップボタン -->
<button class="scroll-top" id="scrollTopBtn" onclick="scrollToTop()" title="トップへ戻る">
    ↑
</button>
`;

const scrollTopJS = `
// スクロールトップボタン
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
`;

console.log('=== CSS ===');
console.log(scrollTopCSS);
console.log('\n=== HTML ===');
console.log(scrollTopHTML);
console.log('\n=== JavaScript ===');
console.log(scrollTopJS);
