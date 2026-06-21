/* =========================================================
   main.js — 웹 이력서 인터랙션
   - 다크모드 토글 (localStorage 저장)
   - 모바일 햄버거 메뉴
   - 스크롤 시 네비게이션 상태(is-scrolled) 전환 — 외형은 CSS가 소유
   - 스크롤 등장 애니메이션 (IntersectionObserver)
   - 현재 섹션 하이라이트 (scrollspy)
   - Back to Top 버튼 (is-visible)
   ========================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initMobileMenu();
    initNavbarScroll();
    initRevealOnScroll();
    initScrollSpy();
    initBackToTop();
    initFooterYear();
  });

  /* ---------- 다크모드 토글 ---------- */
  // index.html <head>의 인라인 스크립트가 초기 테마(.dark)를 이미 적용함.
  // 여기서는 버튼 클릭으로 토글하고 선택을 localStorage에 저장.
  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* ---------- 모바일 햄버거 메뉴 ---------- */
  function initMobileMenu() {
    const btn = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    function close() {
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', '메뉴 열기');
    }

    btn.addEventListener('click', function () {
      const opened = menu.classList.toggle('hidden') === false;
      btn.setAttribute('aria-expanded', String(opened));
      btn.setAttribute('aria-label', opened ? '메뉴 닫기' : '메뉴 열기');
    });

    // 메뉴 내 링크 클릭 시 닫기
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', close);
    });
  }

  /* ---------- 스크롤 시 네비 상태 전환 ---------- */
  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function onScroll() {
      navbar.classList.toggle('is-scrolled', window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 스크롤 등장 애니메이션 ---------- */
  function initRevealOnScroll() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    // IntersectionObserver 미지원 환경: 모두 즉시 표시
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- scrollspy: 현재 섹션 메뉴 하이라이트 ---------- */
  function initScrollSpy() {
    const links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
    if (!links.length) return;

    // href가 같은 메뉴(데스크톱+모바일)가 함께 하이라이트되도록 id별로 묶음
    const groups = {};
    links.forEach(function (link) {
      const href = link.getAttribute('href') || '';
      if (href.charAt(0) !== '#') return;
      const id = href.slice(1);
      if (!document.getElementById(id)) return;
      (groups[id] = groups[id] || []).push(link);
    });

    const sections = Object.keys(groups).map(function (id) { return document.getElementById(id); });
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          (groups[entry.target.id] || []).forEach(function (l) { l.classList.add('active'); });
        }
      });
    }, {
      // 화면 상단 영역에 들어온 섹션을 활성으로 판단
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0,
    });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Back to Top 버튼 ---------- */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    function onScroll() {
      btn.classList.toggle('is-visible', window.scrollY > 400);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 푸터 연도 자동 갱신 ---------- */
  function initFooterYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }
})();
