import React, { memo } from "react";
import { AppFooterWrapper } from "./style";

const AppFooter = memo(() => {
  // 获取当前年份
  const currentYear = new Date().getFullYear();

  return (
    <AppFooterWrapper>
      <div className="wrapper">
        <div className="footer-content">
          {/* 公司信息区域 */}
          <div className="company-info">
            <h3 className="footer-title">关于我们</h3>
            <p>
              我们致力于提供高质量的产品和服务，
              为用户创造更好的体验。感谢您的支持与信任。
            </p>
            <div className="social-links">
              <a
                href="/social/facebook"
                className="social-icon"
                aria-label="Facebook"
              >
                F
              </a>
              <a
                href="/social/twitter"
                className="social-icon"
                aria-label="Twitter"
              >
                T
              </a>
              <a
                href="/social/instagram"
                className="social-icon"
                aria-label="Instagram"
              >
                I
              </a>
              <a
                href="/social/linkedin"
                className="social-icon"
                aria-label="LinkedIn"
              >
                L
              </a>
            </div>
          </div>

          {/* 快速链接区域 */}
          <div className="quick-links">
            <h3 className="footer-title">快速链接</h3>
            <ul>
              <li>
                <a href="/">首页</a>
              </li>
              <li>
                <a href="/products">产品</a>
              </li>
              <li>
                <a href="/services">服务</a>
              </li>
              <li>
                <a href="/about">关于</a>
              </li>
              <li>
                <a href="/blog">博客</a>
              </li>
              <li>
                <a href="/contact">联系我们</a>
              </li>
            </ul>
          </div>

          {/* 联系信息区域 */}
          <div className="contact-info">
            <h3 className="footer-title">联系我们</h3>
            <ul>
              <li className="contact-item">
                <span className="contact-icon">📍</span>
                <span>北京市朝阳区某某大厦A座1001室</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+86 10 8888 8888</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>contact@example.com</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">⏰</span>
                <span>周一至周五: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息区域 */}
        <div className="copyright">
          <p>© {currentYear} 公司名称. 保留所有权利.</p>
          <div className="legal-links">
            <a href="/privacy-policy">隐私政策</a>
            <a href="/terms-of-service">使用条款</a>
            <a href="/cookie-policy">Cookie政策</a>
          </div>
        </div>
      </div>
    </AppFooterWrapper>
  );
});

export default AppFooter;
