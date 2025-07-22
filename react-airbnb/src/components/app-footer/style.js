import styled from 'styled-components';

export const AppFooterWrapper = styled.footer`
  background-color: #1a1a2e;
  color: #ffffff;
  padding: 40px 0 20px;
  margin-top: auto;
  
  .wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .footer-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #e2b13c;
    position: relative;
    padding-bottom: 10px;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 40px;
      height: 2px;
      background-color: #e2b13c;
    }
  }
  
  .company-info p {
    color: #b8b8b8;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .social-links {
    display: flex;
    gap: 15px;
    
    .social-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #e2b13c;
        transform: translateY(-3px);
      }
    }
  }
  
  .quick-links ul,
  .contact-info ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .quick-links li {
    margin-bottom: 10px;
    
    a {
      color: #b8b8b8;
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        color: #e2b13c;
        padding-left: 5px;
      }
    }
  }
  
  .contact-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
    color: #b8b8b8;
    
    .contact-icon {
      margin-right: 10px;
      color: #e2b13c;
      flex-shrink: 0;
    }
  }
  
  .copyright {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 40px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #b8b8b8;
    font-size: 14px;
    
    .legal-links {
      margin-top: 10px;
      
      a {
        color: #b8b8b8;
        text-decoration: none;
        margin: 0 5px;
        
        &:hover {
          color: #e2b13c;
        }
      }
    }
  }
`;
    